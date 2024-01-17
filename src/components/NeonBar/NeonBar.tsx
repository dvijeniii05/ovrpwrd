import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Canvas,
  LinearGradient,
  vec,
  rrect,
  rect,
  Box,
  BoxShadow,
} from '@shopify/react-native-skia';
import { SPECIFIC_COLORS } from '../../constans/COLORS';
import { leagueBarColor } from '../../utils/leagueHelpers/leagueHelpers';
import { styles } from './NeonBar.styles';
import { leaugeNames } from '../../constans/interfaces';

interface Props {
  leagueProgress: number;
  leagueName: leaugeNames;
  generalLeague?: boolean;
}

const NeonBar = (props: Props) => {
  const [outerBarWidth, setOuterBarWidth] = useState<number>(0);
  const updatedOuterBarWidth = outerBarWidth * (props.generalLeague ? 1 : 0.95);
  const barLength = props.leagueProgress * updatedOuterBarWidth;
  return (
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
              Math.round((outerBarWidth - updatedOuterBarWidth) / 2),
              10,
              updatedOuterBarWidth,
              30,
            ),
            30,
            30,
          )}
          color={SPECIFIC_COLORS.leagueBarBackground}>
          <BoxShadow dx={0} dy={4} blur={6} color={'rgba(0, 102, 255, 0.40)'} />
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
          <BoxShadow dx={0} dy={2} blur={0} color={'rgba(24, 24, 228, 0.50)'} />
          <BoxShadow dx={0} dy={4} blur={0} color={'rgba(16, 16, 165, 0.30)'} />
          <BoxShadow dx={0} dy={6} blur={0} color={'rgba(11, 11, 105, 0.20)'} />
          <BoxShadow dx={0} dy={8} blur={0} color={'rgba(6, 6, 54, 0.10)'} />
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
              Math.round((outerBarWidth - updatedOuterBarWidth) / 2),
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
            colors={leagueBarColor(props.leagueName)}
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
          <BoxShadow dx={0} dy={2} blur={0} color={'rgba(24, 24, 228, 0.50)'} />
          <BoxShadow dx={0} dy={4} blur={0} color={'rgba(16, 16, 165, 0.30)'} />
          <BoxShadow dx={0} dy={6} blur={0} color={'rgba(11, 11, 105, 0.20)'} />
          <BoxShadow dx={0} dy={8} blur={0} color={'rgba(6, 6, 54, 0.10)'} />
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
  );
};

export default NeonBar;
