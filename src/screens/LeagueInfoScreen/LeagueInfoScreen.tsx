import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Gradient from '../../components/Gradient/Gradient';
import { SkeletonLoader } from '../../components/Loaders/SkeletonLoader';
import { Rect } from 'react-content-loader/native';
import { styles } from './LeagueInfoScreen.styles';
import UserGreenIcon from '../../assets/icons/userGreen.svg';
import CardWrapper from '../../components/CardWrapper/CardWrapper';
import {
  useGetCurentLeaguesQuery,
  useGetUserCountOnLeaguesQuery,
} from '../../redux/query/apiSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import PreviousWinnerCard from '../../components/PreviousWinnerCard/PreviousWinnerCard';
import { leaugeNames } from '../../constans/interfaces';
import { Loader } from '../../components/Loaders/Loader';
import GeneralErrorComponent from '../../components/GeneralErrorComponent/GeneralErrorComponent';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import GeneralLeagueProgress from '../../components/GeneralLeagueProgress/GeneralLeaguesProgress';
import { leagueDaysCountdown } from '../../utils/leagueHelpers/leagueHelpers';

type NavProps = StackScreenProps<StackParamList, StackScreenName.leagueInfo>;

const LeagueInfoScreen = ({ route }: NavProps) => {
  const { leagueName, userPerks } = route.params;
  const [participantsMarginTop, setParticipantsMargintop] = useState<number>(0);

  const {
    relevantLeague,
    isLeagueFetching,
    isLeagueSuccess,
    isLeagueError,
    refetch: leagueRefetch,
  } = useGetCurentLeaguesQuery(undefined, {
    selectFromResult: ({ data, isSuccess, isFetching, isError }) => ({
      relevantLeague: data?.find(league => league.leagueName === leagueName),
      isLeagueSuccess: isSuccess,
      isLeagueFetching: isFetching,
      isLeagueError: isError,
    }),
  });

  const {
    data: userCount,
    isSuccess: isUserCountSuccess,
    isFetching: isUserCountFetching,
    isError: isUserCountError,
    refetch: refetchUserCount,
  } = useGetUserCountOnLeaguesQuery();

  const gradientPicker = () => {
    switch (leagueName) {
      case leaugeNames.legendaryLeague:
        return <Gradient type="legendary" style={{ width: '100%' }} />;
      case leaugeNames.mythicalLeague:
        return <Gradient type="mythical" style={{ width: '100%' }} />;
      case leaugeNames.immortalLeague:
        return <Gradient type="immortal" style={{ width: '100%' }} />;
    }
  };

  const userCountLoader = (
    <SkeletonLoader viewBox="0,0,360,280">
      <Rect x="150" y="240" rx="15" width="60" height="30" />
    </SkeletonLoader>
  );

  const prizesAndWinnerLoader = (
    <SkeletonLoader viewBox="0,0,360,200">
      <Rect x="0" y="0" rx="15" width="360" height="200" />
    </SkeletonLoader>
  );

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View
          style={styles.gradientWrapper(useSafeAreaInsets().top)}
          onLayout={event => {
            const height = event.nativeEvent.layout.height;
            setParticipantsMargintop(Number(height.toFixed(3)) * 0.7);
          }}>
          {gradientPicker()}
        </View>
        <Loader
          isFetching={isUserCountFetching}
          fetchFallback={userCountLoader}>
          <View style={styles.participantsContainer(participantsMarginTop)}>
            {isUserCountSuccess ? (
              <>
                <UserGreenIcon width={20} height={20} />
                <Text style={styles.participantsText}>
                  {userCount?.legendary}
                </Text>
              </>
            ) : null}
            {isUserCountError ? (
              <GeneralErrorComponent
                refetchFunction={refetchUserCount}
                isSmallComponent
              />
            ) : null}
          </View>
        </Loader>
        {relevantLeague ? (
          <GeneralLeagueProgress
            leagueName={relevantLeague.leagueName}
            daysLeft={leagueDaysCountdown(relevantLeague.endDate)}
            leagueRequiredPerks={relevantLeague.pointsMax}
            currentPerks={userPerks}
            style={{ width: '100%', marginTop: 16 }}
          />
        ) : null}

        <View style={styles.prizesContainer}>
          <CardWrapper style={{ width: '100%' }}>
            <Text style={styles.prizesHeaderText}>Prizes</Text>
            <View style={styles.prizeDescriptionContainer}>
              <Loader
                isFetching={isLeagueFetching}
                fetchFallback={prizesAndWinnerLoader}>
                {relevantLeague?.prizes.map(prize => (
                  <ProductCard
                    key={prize.imageUrl}
                    product={prize}
                    isPurchasable={false}
                  />
                ))}
                {isLeagueError ? (
                  <GeneralErrorComponent refetchFunction={leagueRefetch} />
                ) : null}
              </Loader>
            </View>
          </CardWrapper>
          <CardWrapper style={{ width: '100%', marginTop: 8 }}>
            <Text style={styles.winnerHeaderText}>Previous Winner</Text>
            <Loader
              isFetching={isLeagueFetching}
              fetchFallback={prizesAndWinnerLoader}>
              {isLeagueSuccess && relevantLeague && (
                <PreviousWinnerCard
                  prizeImageUrl={relevantLeague.lastTimeWinner?.prizeImageUrl}
                  prizeName={relevantLeague?.lastTimeWinner?.prizeName}
                  prizeValue={relevantLeague?.lastTimeWinner?.prizeValue}
                  winnerName={relevantLeague?.lastTimeWinner?.winnerName}
                  season={relevantLeague?.lastTimeWinner?.season}
                  style={{ marginTop: 64 }}
                />
              )}
              {isLeagueError ? (
                <GeneralErrorComponent refetchFunction={leagueRefetch} />
              ) : null}
            </Loader>
          </CardWrapper>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeagueInfoScreen;
