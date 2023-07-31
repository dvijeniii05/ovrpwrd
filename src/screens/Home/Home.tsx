import React from 'react';
import { RefreshControl, ScrollView, StatusBar } from 'react-native';
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

const Home = () => {
  const { email, steamID } = useSelector(
    (state: RootState) => state.userData.data,
  );
  const {
    data: userStats,
    isSuccess,
    isFetching,
    refetch,
  } = useGetUserStatsQuery({
    email,
  });
  // const { refetch } = useGetRecentMatchesQuery({
  //   steamID32: steamID,
  //   fromThisGame: 'asdad',
  // });
  console.log(userStats);

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <LoadingComponent loadingText="Fetching Data" isLoading={isFetching} />
      <ScrollView
        style={{ backgroundColor: COLORS.blackPrimary, height: HEIGHT }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }>
        {isSuccess ? (
          <>
            <UserInfo totalPoints={userStats.currentPoints} />
            <DailyStatCard lastTenMatches={userStats.lastTenMatches} />
            <DailyRewards />
            <LeagueProgress />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
