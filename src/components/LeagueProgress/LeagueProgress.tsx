import React, { useMemo, useState } from 'react';
import CardWrapper from '../CardWrapper/CardWrapper';
import { View, Text } from 'react-native';
import { styles } from './LeagueProgress.style';
import {
  BlurMask,
  Canvas,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';
import { COLORS, SPECIFIC_COLORS } from '../../constans/COLORS';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import Perk from '../../assets/Perks.svg';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { useGetCurentLeaguesQuery } from '../../redux/query/apiSlice';
import { Loader } from '../Loaders/Loader';
import {
  activeLeague,
  leagueDaysCountdown,
  prevAndNextLeagueNames,
} from '../../utils/leagueHelpers/leagueHelpers';
import { SkeletonLoader } from '../Loaders/SkeletonLoader';
import { Rect as LoaderRect } from 'react-content-loader/native';

interface Props {
  currentPerks?: number;
}

const LeagueProgress = (props: Props) => {
  const { data, isSuccess, isFetching } = useGetCurentLeaguesQuery(undefined, {
    selectFromResult: ({ data, isSuccess, isFetching }) => {
      return {
        data: activeLeague(data, props.currentPerks),
        isSuccess,
        isFetching,
      };
    },
    skip: props.currentPerks === undefined,
  });

  const leagueProgress = useMemo(() => {
    if (props.currentPerks && data !== undefined) {
      return (
        (props.currentPerks - data?.pointsMin) /
        (data?.pointsMax - data?.pointsMin)
      );
    }
    return 0;
  }, [data, props.currentPerks]);

  const [outerBarWidth, setOuterBarWidth] = useState<number>(0);
  const barLength = leagueProgress * outerBarWidth;

  const dailyStatsLoader = (
    <SkeletonLoader viewBox="0,-20,370,220">
      <LoaderRect x="10" y="0" rx="20" ry="20" width="350" height="200" />
      <LoaderRect x="30" y="100" rx="20" width="310" height="80" />
      <LoaderRect x="45" y="130" rx="10" width="280" height="30" />
    </SkeletonLoader>
  );

  return (
    <Loader
      isFetching={isFetching || props.currentPerks === undefined}
      fetchFallback={dailyStatsLoader}
      isSuccess={isSuccess}>
      {data ? (
        <CardWrapper style={styles.wrapperContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{data?.leagueName}</Text>
            <Text style={styles.durationtext}>
              {leagueDaysCountdown(data?.endDate)}
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.progressContainer}>
              <View style={styles.leagueNamesContainer}>
                <View style={styles.leagueGoalContainer}>
                  <Text style={styles.leagueNameText}>
                    {prevAndNextLeagueNames(data?.leagueName)?.prevLeagueName}
                  </Text>
                  <CurrencyWrapper
                    isPerks
                    value={data.pointsMin}
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
                    {prevAndNextLeagueNames(data?.leagueName)?.nextLeagueName}
                  </Text>
                  <CurrencyWrapper
                    isPerks
                    value={data.pointsMax}
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
                      colors={[
                        SPECIFIC_COLORS.leagueBarDarkBlue,
                        SPECIFIC_COLORS.leagueBarPurple,
                      ]}
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
          <StandardButton
            buttonText="All leagues"
            buttonTextStyle={{ fontSize: 14 }}
            iconName="round-chevron-right"
            onPress={() => {}}
            style={styles.allLeaguesButton}
          />
        </CardWrapper>
      ) : null}
    </Loader>
  );
};

export default LeagueProgress;
