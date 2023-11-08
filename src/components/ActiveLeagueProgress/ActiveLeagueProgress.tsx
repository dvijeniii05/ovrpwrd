import React, { useMemo, useState } from 'react';
import CardWrapper from '../CardWrapper/CardWrapper';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './ActiveLeagueProgress.style';
import {
  BlurMask,
  Canvas,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';
import { COLORS } from '../../constans/COLORS';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import Perk from '../../assets/Perks.svg';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { useGetCurentLeaguesQuery } from '../../redux/query/apiSlice';
import { Loader } from '../Loaders/Loader';
import {
  activeLeague,
  leagueBarColor,
  leagueDaysCountdown,
  prevAndNextLeagueNames,
} from '../../utils/leagueHelpers/leagueHelpers';
import { SkeletonLoader } from '../Loaders/SkeletonLoader';
import { Rect as LoaderRect } from 'react-content-loader/native';
import { StackProps } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import GeneralErrorComponent from '../GeneralErrorComponent/GeneralErrorComponent';

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
      return (
        (props.currentPerks - league?.pointsMin) /
        (league?.pointsMax - league?.pointsMin)
      );
    }
    return 0;
  }, [league, props.currentPerks]);

  const [outerBarWidth, setOuterBarWidth] = useState<number>(0);
  const barLength = leagueProgress * outerBarWidth;

  const loader = (
    <SkeletonLoader viewBox="0,-20,350,130">
      <LoaderRect x="0" y="10" rx="20" ry="20" width="350" height="100" />
      <LoaderRect x="20" y="60" rx="15" width="310" height="35" />
    </SkeletonLoader>
  );

  return (
    <View style={[styles.parentContainer, props.style]}>
      <CardWrapper style={styles.wrapperContainer}>
        <Text style={styles.headerText}>{league?.leagueName}</Text>
        <Loader
          isFetching={props.isUserFetching || isLeagueFetching}
          fetchFallback={loader}>
          {isLeagueSuccess && league ? (
            <>
              <Text style={styles.durationtext}>
                {leagueDaysCountdown(league?.endDate)}
              </Text>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.progressContainer}>
                  <View style={styles.leagueNamesContainer}>
                    <View style={styles.leagueGoalContainer}>
                      <Text style={styles.leagueNameText}>
                        {
                          prevAndNextLeagueNames(league?.leagueName)
                            ?.prevLeagueName
                        }
                      </Text>
                      <CurrencyWrapper
                        isPerks
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
                        {
                          prevAndNextLeagueNames(league?.leagueName)
                            ?.nextLeagueName
                        }
                      </Text>
                      <CurrencyWrapper
                        isPerks
                        value={league.pointsMax}
                        forLeagueProgression
                        style={{ marginTop: 4 }}
                      />
                    </View>
                  </View>
                  <View
                    style={styles.barContainer}
                    onLayout={event => {
                      const width = event.nativeEvent.layout.width;
                      setOuterBarWidth(Number(width.toFixed(5)));
                    }}>
                    <Canvas style={styles.barCanvas(Math.round(outerBarWidth))}>
                      <Rect height={30} width={barLength} color={'black'}>
                        <BlurMask blur={4} respectCTM />
                        <LinearGradient
                          start={vec(0, 15)}
                          end={vec(barLength, 0)}
                          colors={leagueBarColor(league?.leagueName)}
                        />
                      </Rect>
                    </Canvas>
                  </View>
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
                  buttonTextStyle={{ fontSize: 14 }}
                  iconName="round-chevron-right"
                  onPress={() =>
                    props.navigation?.navigate(StackScreenName.allLeagues)
                  }
                  style={styles.allLeaguesButton}
                />
              )}
            </>
          ) : null}
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
