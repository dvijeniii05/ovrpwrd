import React, { useState } from 'react';
import CardWrapper from '../CardWrapper/CardWrapper';
import { View, Text } from 'react-native';
import { styles } from './LeagueProgress.style';
import {
  Canvas,
  Circle,
  LinearGradient,
  RadialGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';
import { COLORS } from '../../constans/COLORS';

const LeagueProgress = () => {
  const [outerBarWidth, setOuterBarWidth] = useState<number>(0);
  const progressLineTotalWidth = outerBarWidth - 48 - 6;
  const actualProgress = 0.5 * progressLineTotalWidth; // Should be dynamic and driven by perks progress of user per league
  return (
    <CardWrapper
      headingText="League progress"
      style={styles.wrapperContainer}
      leagueEndsIn="Ends in 12 days">
      <View style={styles.progressContainer}>
        <View style={styles.leagueNamesContainer}>
          <Text style={{ color: 'white' }}>Legendary</Text>
          <Text style={{ color: COLORS.transparentWhite }}>Immortal</Text>
        </View>
        <View
          style={styles.barContainer}
          onLayout={event => {
            const width = event.nativeEvent.layout.width;
            console.log(event.nativeEvent.layout.width);
            setOuterBarWidth(Number(width.toFixed(3)));
          }}>
          <Canvas style={styles.circlesCanvas(outerBarWidth)}>
            <Circle cx={15} cy={12} r={12}>
              <RadialGradient
                c={vec(15, 12)}
                r={12}
                colors={[COLORS.blackPrimary, COLORS.blue]}
              />
            </Circle>
            <Circle cx={outerBarWidth - 15} cy={12} r={12}>
              <RadialGradient
                c={vec(outerBarWidth - 15, 12)}
                r={12}
                colors={[COLORS.blackPrimary, COLORS.purple]}
              />
            </Circle>
          </Canvas>
          <Canvas style={styles.barCanvas(outerBarWidth)}>
            <Rect height={6} width={actualProgress} y={9}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(actualProgress, 24)}
                colors={[COLORS.blue, COLORS.purple]}
              />
            </Rect>
          </Canvas>
        </View>
        <View style={styles.leagueGoalsContainer}>
          <Text style={{ color: 'white' }}>2000</Text>
          <Text style={{ color: COLORS.transparentWhite }}>4000</Text>
        </View>
      </View>
    </CardWrapper>
  );
};

export default LeagueProgress;
