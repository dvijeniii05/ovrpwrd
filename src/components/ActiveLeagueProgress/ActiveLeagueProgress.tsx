import React, { useMemo, useState } from 'react';
import CardWrapper from '../CardWrapper/CardWrapper';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './ActiveLeagueProgress.style';
import {
  Canvas,
  LinearGradient,
  Rect,
  vec,
  rrect,
  rect,
  Box,
  BoxShadow,
} from '@shopify/react-native-skia';
import { COLORS, SPECIFIC_COLORS } from '../../constans/COLORS';
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
  const updatedOuterBarWidth = outerBarWidth * 0.95;
  const barLength = leagueProgress * updatedOuterBarWidth;

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
                      <Box
                        box={rrect(
                          rect(
                            Math.round(
                              (outerBarWidth - updatedOuterBarWidth) / 2,
                            ),
                            10,
                            updatedOuterBarWidth,
                            30,
                          ),
                          30,
                          30,
                        )}
                        color={SPECIFIC_COLORS.leagueBarBackground}>
                        <BoxShadow
                          dx={0}
                          dy={4}
                          blur={6}
                          color={'rgba(0, 102, 255, 0.40)'}
                        />
                        <BoxShadow
                          dx={0}
                          dy={-2}
                          blur={0}
                          color={'rgba(0, 17, 104, 0.70)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={-3}
                          blur={0}
                          color={'rgba(0, 209, 255, 0.60)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={2}
                          blur={0}
                          color={'rgba(24, 24, 228, 0.50)'}
                        />
                        <BoxShadow
                          dx={0}
                          dy={4}
                          blur={0}
                          color={'rgba(16, 16, 165, 0.30)'}
                        />
                        <BoxShadow
                          dx={0}
                          dy={6}
                          blur={0}
                          color={'rgba(11, 11, 105, 0.20)'}
                        />
                        <BoxShadow
                          dx={0}
                          dy={8}
                          blur={0}
                          color={'rgba(6, 6, 54, 0.10)'}
                        />
                        <BoxShadow
                          dx={0}
                          dy={3}
                          blur={2}
                          color={'rgba(0, 56, 255, 0.20)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={1}
                          blur={1}
                          color={'rgba(0, 163, 255, 0.50)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={-1}
                          blur={0}
                          color={'rgba(0, 133, 255, 1)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={0}
                          blur={8}
                          color={'rgba(204, 0, 255, 0.70)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={-14}
                          blur={1}
                          color={'rgba(0, 18, 177, 0.15)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={6}
                          blur={2}
                          color={'rgba(0, 56, 255, 0.10)'}
                          inner
                        />
                      </Box>
                      <Box
                        box={rrect(
                          rect(
                            Math.round(
                              (outerBarWidth - updatedOuterBarWidth) / 2,
                            ),
                            10,
                            barLength,
                            30,
                          ),
                          30,
                          30,
                        )}>
                        <LinearGradient
                          start={vec(0, 15)}
                          end={vec(barLength, 0)}
                          colors={leagueBarColor(league?.leagueName)}
                        />
                        <BoxShadow
                          dx={0}
                          dy={-14}
                          blur={1}
                          color={'rgba(0, 18, 177, 0.15)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={-2}
                          blur={0}
                          color={'rgba(0, 17, 104, 0.70)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={-3}
                          blur={0}
                          color={'rgba(0, 209, 255, 0.60)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={2}
                          blur={0}
                          color={'rgba(24, 24, 228, 0.50)'}
                        />
                        <BoxShadow
                          dx={0}
                          dy={4}
                          blur={0}
                          color={'rgba(16, 16, 165, 0.30)'}
                        />
                        <BoxShadow
                          dx={0}
                          dy={6}
                          blur={0}
                          color={'rgba(11, 11, 105, 0.20)'}
                        />
                        <BoxShadow
                          dx={0}
                          dy={8}
                          blur={0}
                          color={'rgba(6, 6, 54, 0.10)'}
                        />
                        <BoxShadow
                          dx={0}
                          dy={3}
                          blur={2}
                          color={'rgba(0, 56, 255, 0.20)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={1}
                          blur={1}
                          color={'rgba(0, 163, 255, 0.50)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={-1}
                          blur={0}
                          color={'rgba(0, 133, 255, 1)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={0}
                          blur={8}
                          color={'rgba(204, 0, 255, 0.70)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={-14}
                          blur={1}
                          color={'rgba(0, 18, 177, 0.15)'}
                          inner
                        />
                        <BoxShadow
                          dx={0}
                          dy={6}
                          blur={2}
                          color={'rgba(0, 56, 255, 0.10)'}
                          inner
                        />
                      </Box>
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
