import { ImageBackground, StatusBar, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './AllLeaguesScreen.styles';
import { useState } from 'react';
import GeneralLeagueProgress from '../../components/GeneralLeagueProgress/GeneralLeaguesProgress';
import {
  useGetCurentLeaguesQuery,
  useGetUserCountOnLeaguesQuery,
} from '../../redux/query/apiSlice';
import {
  activeLeague,
  leagueDaysCountdown,
} from '../../utils/leagueHelpers/leagueHelpers';
import { useGetUserCurrencyQuery } from '../../redux/query/endpoints/userApi';
import { Loader } from '../../components/Loaders/Loader';
import { SkeletonLoader } from '../../components/Loaders/SkeletonLoader';
import { Rect } from 'react-content-loader/native';
import GeneralErrorComponent from '../../components/GeneralErrorComponent/GeneralErrorComponent';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { ScrollView } from 'react-native-gesture-handler';

type NavProps = StackScreenProps<StackParamList, StackScreenName.allLeagues>;

const AllLeaguesScreen = ({ navigation }: NavProps) => {
  const {
    data: leaguesData,
    isFetching: isLeaguesFetching,
    isSuccess: isLeaguesSuccess,
    isError: isLeaguesError,
    refetch: refetchLeagues,
  } = useGetCurentLeaguesQuery();

  const {
    userPerks,
    isPerksError,
    isPerksFetching,
    refetch: refetchPerks,
  } = useGetUserCurrencyQuery(undefined, {
    selectFromResult: ({ data, isFetching, isError }) => ({
      userPerks: data?.perks,
      isPerksFetching: isFetching,
      isPerksError: isError,
    }),
  });

  const { data: userCount, refetch: refetchUserCount } =
    useGetUserCountOnLeaguesQuery();

  const [headerMarginTop, setHeaderMargintop] = useState<number>(0);

  const loader = (
    <SkeletonLoader viewBox="0, 0,350,600">
      <Rect x="10" y="0" rx="20" ry="20" width="330" height="140" />
      <Rect x="30" y="20" rx="10" ry="20" width="50" height="20" />
      <Rect x="135" y="20" rx="10" ry="20" width="80" height="20" />
      <Rect x="270" y="20" rx="10" ry="20" width="50" height="20" />
      <Rect x="20" y="80" rx="15" width="310" height="35" />

      <Rect x="10" y="160" rx="20" ry="20" width="330" height="140" />
      <Rect x="30" y="180" rx="10" ry="20" width="50" height="20" />
      <Rect x="135" y="180" rx="10" ry="20" width="80" height="20" />
      <Rect x="270" y="180" rx="10" ry="20" width="50" height="20" />
      <Rect x="20" y="240" rx="15" width="310" height="35" />

      <Rect x="10" y="320" rx="20" ry="20" width="330" height="140" />
      <Rect x="30" y="340" rx="10" ry="20" width="50" height="20" />
      <Rect x="135" y="340" rx="10" ry="20" width="80" height="20" />
      <Rect x="270" y="340" rx="10" ry="20" width="50" height="20" />
      <Rect x="20" y="400" rx="15" width="310" height="35" />
    </SkeletonLoader>
  );

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/AllLeagues.png')}
          resizeMode="contain"
          onLayout={event => {
            const height = event.nativeEvent.layout.height;
            setHeaderMargintop(Number(height.toFixed(3)) * 0.7);
          }}
          style={styles.bgImageContainer}
          imageStyle={styles.bgImage}
        />
        <View style={styles.mainContentContainer}>
          <Text style={styles.headerText(headerMarginTop)}>Leagues</Text>
          <View style={styles.leaguesContainer}>
            <Loader
              isFetching={isPerksFetching || isLeaguesFetching}
              fetchFallback={loader}>
              {isLeaguesSuccess && userPerks !== undefined
                ? leaguesData.map(singleLeague => {
                    const parsedLeagueName = singleLeague.leagueName
                      .split(' ')[0]
                      .toLowerCase() as keyof typeof userCount;

                    //logic below needs a rework to calculate the active league for user
                    const isUserInThisLeague =
                      singleLeague.leagueName ==
                      activeLeague(leaguesData, userPerks)?.leagueName;

                    return (
                      <GeneralLeagueProgress
                        leagueName={singleLeague.leagueName}
                        daysLeft={leagueDaysCountdown(singleLeague.endDate)}
                        leagueRequiredPerks={singleLeague.pointsMax}
                        currentPerks={userPerks}
                        userCount={userCount ? userCount[parsedLeagueName] : 0}
                        key={singleLeague.leagueName}
                        onPress={() =>
                          navigation.navigate(StackScreenName.leagueInfo, {
                            leagueName: singleLeague.leagueName,
                            userPerks,
                          })
                        }
                      />
                    );
                  })
                : null}
              {isLeaguesError || isPerksError ? (
                <GeneralErrorComponent
                  refetchFunction={() => {
                    refetchLeagues();
                    refetchUserCount();
                    refetchPerks;
                  }}
                  style={styles.errorContainer}
                  isExtraLargeComponent
                />
              ) : null}
            </Loader>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllLeaguesScreen;
