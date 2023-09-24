import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInfo from '../../components/UserInfo/UserInfo';
import DailyStatCard from '../../components/DailyStatCard/DailyStatCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';
import LeagueProgress from '../../components/LeagueProgress/LeagueProgress';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Gradient from '../../components/Gradient/Gradient';
import { styles } from './HomeScreen.styles';
import PremiumBanner from '../../components/PremiumBanner/PremiumBanner';

const Home = () => {
  const { email, steamID } = useSelector(
    (state: RootState) => state.userData.data,
  );

  // const {
  //   data: userStats,
  //   isSuccess,
  //   isFetching,
  //   refetch,
  // } = useGetUserStatsQuery({
  //   email: 'adikbsw@gmail.com',
  // });
  // const { refetch } = useGetRecentMatchesQuery({
  //   steamID32: steamID,
  //   fromThisGame: 'asdad',
  // });

  const dummyData = {
    userName: 'Morskoy Turok',
    email: 'morskoy@gmail.com',
    perks: 7290,
    relics: 7.29,
    dailyP: '238',
    dailyR: '0.24',
    time: '12:48',
    game: 'DOTA',
    result: 'WIN',
    k: '5',
    d: '6',
    a: '5',
    nickName: 'Shtex',
  };

  const lastTenMatches = [
    {
      isWin: true,
      hero: 67,
      time: 1694274541,
      points: 232,
      heroUrl:
        'https://cdn.dota2.com/apps/dota2/images/heroes/spectre_full.png',
      kills: 13,
      deaths: 6,
      assists: 27,
    },
    {
      isWin: false,
      hero: 123,
      time: 1694216426,
      points: 95,
      heroUrl:
        'https://cdn.dota2.com/apps/dota2/images/heroes/hoodwink_full.png',
      kills: 5,
      deaths: 9,
      assists: 21,
    },
    {
      isWin: true,
      hero: 35,
      time: 1694214144,
      points: 221,
      heroUrl: 'https://cdn.dota2.com/apps/dota2/images/heroes/sniper_full.png',
      kills: 11,
      deaths: 8,
      assists: 20,
    },
    {
      isWin: true,
      hero: 120,
      time: 1694212814,
      points: 126,
      heroUrl:
        'https://cdn.dota2.com/apps/dota2/images/heroes/pangolier_full.png',
      kills: 4,
      deaths: 4,
      assists: 11,
    },
  ];

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <Gradient type="conical" style={{ position: 'absolute' }} />

        <UserInfo
          totalPoints={{
            currentPerks: dummyData.perks,
            currentRelics: dummyData.relics,
          }}
          userName={dummyData.userName}
          nickName={dummyData.nickName}
        />
        <DailyStatCard lastTenMatches={lastTenMatches} />
        <LeagueProgress />
        <PremiumBanner />
        <Leaderboard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
