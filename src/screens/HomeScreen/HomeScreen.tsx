import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInfo from '../../components/UserInfo/UserInfo';
import DailyStatCard from '../../components/DailyStatCard/DailyStatCard';
import LeagueProgress from '../../components/ActiveLeagueProgress/ActiveLeagueProgress';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Gradient from '../../components/Gradient/Gradient';
import { styles } from './HomeScreen.styles';
import PremiumBanner from '../../components/PremiumBanner/PremiumBanner';
import {
  useGetUserDetailsQuery,
  useGetUserStatsQuery,
} from '../../redux/query/endpoints/userApi';
import { Loader } from '../../components/Loaders/Loader';
import { SkeletonLoader } from '../../components/Loaders/SkeletonLoader';
import { Circle, Rect } from 'react-content-loader/native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.home>;

const Home = ({ navigation }: ScreenProps) => {
  const {
    data: userStats,
    isSuccess,
    isFetching,
    isError,
    refetch, // should be used in 'pull to refresh' logic
  } = useGetUserStatsQuery();

  const {
    data: userDetails,
    isSuccess: isUserDetailsSuccess,
    isFetching: isUserDetailsFetching,
    isError: isUserDetailsError,
  } = useGetUserDetailsQuery();

  const userDetailsLoader = (
    <SkeletonLoader viewBox="0,0,300,200">
      <Circle x="150" y="85" r={30} />
      <Rect x="100" y="120" width="100" height="25" />
      <Rect x="110" y="150" width="80" height="10" />
      <Rect x="95" y="170" rx="12" width="50" height="25" />
      <Rect x="155" y="170" rx="12" width="50" height="25" />
    </SkeletonLoader>
  );

  const dailyStatsLoader = (
    <SkeletonLoader viewBox="0,0,370,380">
      <Rect x="10" y="20" rx="20" width="350" height="350" />
    </SkeletonLoader>
  );

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <Gradient type="conical" style={{ position: 'absolute' }} />
        <Loader
          isFetching={isUserDetailsFetching || isFetching}
          fetchFallback={userDetailsLoader}>
          <UserInfo
            currentPerks={userStats?.currentPoints.currentPerks}
            currentRelics={userStats?.currentPoints.currentRelics}
            userName={userDetails?.fullName}
            nickName={userDetails?.nickname}
          />
        </Loader>
        <Loader isFetching={isFetching} fetchFallback={dailyStatsLoader}>
          <DailyStatCard
            lastTenMatches={userStats?.significantMatches}
            firstGameId={userDetails?.latestGameId}
          />
        </Loader>
        <LeagueProgress navigation={navigation} />
        <PremiumBanner />
        <Leaderboard nickname={userDetails?.nickname} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
