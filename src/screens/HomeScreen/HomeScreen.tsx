import React, { useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatsAndRewardsCard from '../../components/StatsAndRewardsCard/StatsAndRewardsCard';
import ActiveLeagueProgress from '../../components/ActiveLeagueProgress/ActiveLeagueProgress';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Gradient from '../../components/Gradient/Gradient';
import { styles } from './HomeScreen.styles';
import PremiumBanner from '../../components/PremiumBanner/PremiumBanner';
import {
  useGetUserCurrencyQuery,
  useGetUserDetailsQuery,
  useGetUserStatsQuery,
  userApi,
} from '../../redux/query/endpoints/userApi';
import { Loader } from '../../components/Loaders/Loader';
import { SkeletonLoader } from '../../components/Loaders/SkeletonLoader';
import { Circle, Rect } from 'react-content-loader/native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import GeneralErrorComponent from '../../components/GeneralErrorComponent/GeneralErrorComponent';
import { HEIGHT } from '../../utils/dimension';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { useSharedValue } from 'react-native-reanimated';
import AnimatedUserInfo from '../../components/UserInfo/AnimatedUserInfo';

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.home>;

const Home = ({ navigation }: ScreenProps) => {
  const dispatch = useDispatch();

  const {
    data: userStats,
    isSuccess,
    isFetching,
    isError,
    refetch, // should be used in 'pull to refresh' logic
  } = useGetUserStatsQuery();

  const {
    data: userDetails,
    isFetching: isUserDetailsFetching,
    isError: isUserDetailsError,
    refetch: refetchUserDetails,
  } = useGetUserDetailsQuery();

  const {
    data: userCurrency,
    isFetching: isUserCurrencyFetching,
    isSuccess: isUserCurrencySuccess,
  } = useGetUserCurrencyQuery();

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

  const rawPerks = useSharedValue(userStats?.currentPoints.currentPerks ?? 0);
  const rawRelics = useSharedValue(userStats?.currentPoints.currentRelics ?? 0);

  useEffect(() => {
    if (userStats?.currentPoints.currentPerks) {
      rawPerks.value = userStats?.currentPoints.currentPerks;
      rawRelics.value = userStats?.currentPoints.currentRelics;
    }
  }, [userStats]);

  const refreshing = false; // static value for RefreshControl as there is no need for the loader logic apart from actual Pull-to-Refresh;
  const debounceRefetch = useDebouncedCallback(() => refetch(), 60000, {
    leading: true,
    maxWait: 60000,
    trailing: false,
  });
  const onRefresh = useCallback(() => {
    dispatch(userApi.util.invalidateTags(['leaderboard', 'userDetails']));
    debounceRefetch();
  }, []);

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Gradient type="conical" style={{ position: 'absolute' }} />
        {isError || isUserDetailsError ? (
          <View
            style={{
              justifyContent: 'center',
              height: HEIGHT,
            }}>
            <GeneralErrorComponent
              refetchFunction={() => {
                refetch();
                refetchUserDetails();
              }}
              isExtraLargeComponent
              customErrorMessage="Something went wrong"
            />
          </View>
        ) : (
          <>
            <Loader
              isFetching={isUserDetailsFetching || isFetching}
              fetchFallback={userDetailsLoader}>
              <AnimatedUserInfo
                rawPerks={rawPerks}
                rawRelics={rawRelics}
                userName={userDetails?.fullName}
                nickName={userDetails?.nickname}
                onAvatarPress={() =>
                  navigation.navigate(StackScreenName.account)
                }
                avatar={userDetails?.avatar}
                isAnimatedCurrencies={true}
              />
            </Loader>
            <Loader
              isFetching={isFetching || isUserDetailsFetching}
              fetchFallback={dailyStatsLoader}>
              <StatsAndRewardsCard
                rawPerks={rawPerks}
                rawRelics={rawRelics}
                lastTenMatches={userStats?.significantMatches}
                firstGameId={userDetails?.dota.latestGameId}
              />
            </Loader>
            <ActiveLeagueProgress
              navigation={navigation}
              isUserFetching={isUserCurrencyFetching}
              isUserSuccess={isUserCurrencySuccess}
              currentPerks={userCurrency?.perks}
            />
            <PremiumBanner />
            <Leaderboard
              isUserFetching={isUserDetailsFetching}
              isUserStatsSuccess={isSuccess}
              nickname={userDetails?.nickname}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
