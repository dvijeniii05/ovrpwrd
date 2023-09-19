import React, { useState } from 'react';
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

const LeagueProgress = () => {
  const [outerBarWidth, setOuterBarWidth] = useState<number>(0);
  const actualProgress = 0.8 * outerBarWidth; // Should be dynamic and driven by perks progress of user per league

  return (
    <CardWrapper style={styles.wrapperContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>League Progress</Text>
        <Text style={styles.durationtext}>Ends in 12 days</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.progressContainer}>
          <View style={styles.leagueNamesContainer}>
            <View style={styles.leagueGoalContainer}>
              <Text style={styles.leagueNameText}>Legendary</Text>
              <CurrencyWrapper
                isPerks
                value="3000"
                forLeagueProgression
                style={{ marginTop: 4 }}
              />
            </View>
            <View style={styles.currentPointsContainer}>
              <Text style={styles.currentPointsText}>5000</Text>
            </View>
            <View
              style={[styles.leagueGoalContainer, { alignItems: 'flex-end' }]}>
              <Text style={styles.leagueNameText}>Immortal</Text>
              <CurrencyWrapper
                isPerks
                value="9000"
                forLeagueProgression
                style={{ marginTop: 4 }}
              />
            </View>
          </View>
          <View
            style={styles.barContainer}
            onLayout={event => {
              const width = event.nativeEvent.layout.width;
              console.log('onLayout', event.nativeEvent.layout.width);
              setOuterBarWidth(Number(width.toFixed(5)));
            }}>
            <Canvas style={styles.barCanvas(Math.round(outerBarWidth))}>
              <Rect height={30} width={actualProgress} color={'black'}>
                <BlurMask blur={4} respectCTM />
                <LinearGradient
                  start={vec(0, 15)}
                  end={vec(actualProgress, 0)}
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
  );
};

export default LeagueProgress;
