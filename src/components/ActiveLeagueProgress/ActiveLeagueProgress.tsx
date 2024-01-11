import React, { useMemo } from 'react';
import CardWrapper from '../CardWrapper/CardWrapper';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './ActiveLeagueProgress.style';
import { Canvas, Rect } from '@shopify/react-native-skia';
import { COLORS } from '../../constans/COLORS';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import Perk from '../../assets/Perks.svg';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import {
  LeagueData,
  useGetCurentLeaguesQuery,
} from '../../redux/query/apiSlice';
import { Loader } from '../Loaders/Loader';
import {
  activeLeague,
  leagueDaysCountdown,
  prevAndNextLeagueNames,
} from '../../utils/leagueHelpers/leagueHelpers';
import { SkeletonLoader } from '../Loaders/SkeletonLoader';
import { Rect as LoaderRect } from 'react-content-loader/native';
import { StackProps } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import GeneralErrorComponent from '../GeneralErrorComponent/GeneralErrorComponent';
import NeonBar from '../NeonBar/NeonBar';
import DrawIcon from '../../assets/icons/crossedFingers.svg';

interface Props {
  navigation?: StackProps;
  hideAllLeaguesButton?: boolean;
  style?: ViewStyle;
  isUserFetching: boolean;
  isUserSuccess: boolean;
  currentPerks: number | undefined;
}

const ActiveLeagueProgress = (props: Props) => {
  const {
    league,
    isLeagueFetching,
    isLeagueSuccess,
    isLeagueError,
    refetch: refetchLeague,
  } = useGetCurentLeaguesQuery(undefined, {
    selectFromResult: ({ data, isSuccess, isFetching, isError }) => {
      return {
        league: activeLeague(data, props.currentPerks),
        isLeagueSuccess: isSuccess,
        isLeagueFetching: isFetching,
        isLeagueError: isError,
      };
    },
    skip: !props.isUserSuccess,
  });

  const leagueProgress = useMemo(() => {
    if (props.currentPerks && league !== undefined) {
      if (props.currentPerks >= league.pointsMax) {
        return 1;
      } else {
        return (
          (props.currentPerks - league?.pointsMin) /
          (league?.pointsMax - league?.pointsMin)
        );
      }
    }
    return 0;
  }, [league, props.currentPerks]);

  const loader = (
    <SkeletonLoader viewBox="0,-20,350,130">
      <LoaderRect x="0" y="10" rx="20" ry="20" width="350" height="100" />
      <LoaderRect x="20" y="60" rx="15" width="310" height="35" />
    </SkeletonLoader>
  );

  const content = (league: LeagueData) => {
    const isLeagueActive = leagueDaysCountdown(league.endDate);

    if (!isLeagueActive) {
      // render mesage about finished leagues + user stsatus
      return (
        <View style={styles.leagueEndedContainer}>
          <View style={styles.leagueEndedHeading}>
            <Text style={styles.headingText}>Draw in progress</Text>
            <DrawIcon width={18} height={18} />
          </View>
          <Text style={styles.descriptionText}>
            We are currently processing the winners' draw, and your points will
            start accumulating once the new league is started.
          </Text>
          <Text style={styles.descriptionGreenText}>
            {`You are participating in ${league.leagueName}`}
          </Text>
        </View>
      );
    } else {
      return (
        <>
          <Text style={styles.durationtext}>
            {leagueDaysCountdown(league?.endDate)}
          </Text>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.progressContainer}>
              <View style={styles.leagueNamesContainer}>
                <View style={styles.leagueGoalContainer}>
                  <Text style={styles.leagueNameText}>
                    {prevAndNextLeagueNames(league?.leagueName)?.prevLeagueName}
                  </Text>
                  <CurrencyWrapper
                    currencyType="perks"
                    value={league.pointsMin}
                    forLeagueProgression
                    style={{ marginTop: 4 }}
                  />
                </View>
                <View style={styles.currentPointsContainer}>
                  <Text style={styles.currentPointsText}>
                    {props.currentPerks}
                  </Text>
                </View>
                <View
                  style={[
                    styles.leagueGoalContainer,
                    { alignItems: 'flex-end' },
                  ]}>
                  <Text style={styles.leagueNameText}>
                    {prevAndNextLeagueNames(league?.leagueName)?.nextLeagueName}
                  </Text>
                  <CurrencyWrapper
                    currencyType="perks"
                    value={league.pointsMax}
                    forLeagueProgression
                    style={{ marginTop: 4 }}
                  />
                </View>
              </View>
              <NeonBar
                leagueProgress={leagueProgress}
                leagueName={league.leagueName}
              />
            </View>
            <View style={styles.perkContainer}>
              <Perk width={32} height={32} style={{ zIndex: 5 }} />
              <Canvas style={styles.perkShadeCanvas}>
                <Rect width={36} height={36} color={COLORS.darkBlue}></Rect>
              </Canvas>
            </View>
          </View>
          {props.hideAllLeaguesButton ? null : (
            <StandardButton
              buttonText="All leagues"
              buttonTextStyle={{ fontSize: 16 }}
              iconName="round-chevron-right"
              onPress={() =>
                props.navigation?.navigate(StackScreenName.allLeagues)
              }
              style={styles.allLeaguesButton}
            />
          )}
        </>
      );
    }
  };

  return (
    <View style={[styles.parentContainer, props.style]}>
      <CardWrapper style={styles.wrapperContainer}>
        {leagueDaysCountdown(league?.endDate) ? (
          <Text style={styles.headerText}>{league?.leagueName}</Text>
        ) : null}

        <Loader
          isFetching={props.isUserFetching || isLeagueFetching}
          fetchFallback={loader}>
          {isLeagueSuccess && league ? content(league) : null}
          {isLeagueError ? (
            <GeneralErrorComponent
              refetchFunction={() => {
                refetchLeague();
              }}
              style={{ marginTop: 8 }}
              customErrorMessage="Error loading leagues"
            />
          ) : null}
        </Loader>
      </CardWrapper>
    </View>
  );
};

export default ActiveLeagueProgress;
