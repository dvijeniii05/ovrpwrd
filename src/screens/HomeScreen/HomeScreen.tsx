import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInfo from '../../components/UserInfo/UserInfo';
import DailyStatCard from '../../components/DailyStatCard/DailyStatCard';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT } from '../../utils/dimension';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useGetUserStatsQuery } from '../../redux/query/endpoints/userApi';
import DailyRewards from '../../components/DailyRewards/DailyRewards';
import LeagueProgress from '../../components/LeagueProgress/LeagueProgress';
import CardWrapper from '../../components/CardWrapper/CardWrapper';
import LeaderboardCard from '../../components/LeaderboardCard/LeaderboardCard';
import Gradient from '../../components/Gradient/Gradient';
import { styles } from './HomeScreen.styles';
import DetailInput from '../../components/DetailsInput/DetailsInput';

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
        contentContainerStyle={styles.scrollContentContainer}>
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
        {/* <DailyRewards /> */}
        {/* <LeagueProgress />
          <CardWrapper style={{ paddingTop: 0 }}>
            <Image source={require('../../assets/dummyAssets/Elf.png')} />
          </CardWrapper> */}
        {/* <LeaderboardCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
