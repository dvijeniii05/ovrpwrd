import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Canvas,
  Box,
  rrect,
  rect,
  BoxShadow,
  LinearGradient,
  vec,
  RoundedRect,
  SweepGradient,
} from '@shopify/react-native-skia';
import PremiumBoltIcon from '../../../assets/icons/premiumBolt.svg';
import PremiumTickIcon from '../../../assets/icons/premiumTick.svg';
import { styles } from './PremiumButton.styles';
import { COLORS } from '../../../constans/COLORS';

interface Props {
  isPremiumActive: boolean;
  onPress: () => void;
}

const PremiumButton = (props: Props) => {
  const dynamicContent = useMemo(() => {
    if (props.isPremiumActive) {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Boost Active</Text>
          <PremiumTickIcon width={12} height={12} />
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.contentContainer} onPress={props.onPress}>
        <Text style={styles.text}>Activate Boost</Text>
        <PremiumBoltIcon width={16} height={16} />
      </TouchableOpacity>
    );
  }, [props.isPremiumActive]);
  return (
    <View style={styles.parentContainer}>
      {dynamicContent}
      <Canvas style={styles.canvas}>
        <Box box={rrect(rect(20, 20, 180, 50), 10, 10)}>
          <LinearGradient
            start={{ x: 20, y: 25 }}
            end={{ x: 200, y: 25 }}
            colors={[
              'rgba(27, 253, 156, 0.10)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(27, 253, 156, 0.10)',
            ]}
            positions={[0, 0.35, 0.65, 1]}
          />
        </Box>
        <Box
          box={rrect(rect(20, 20, 180, 50), 10, 10)}
          color={COLORS.neonGreen}
          strokeWidth={2}
          style={'stroke'}>
          <BoxShadow
            dx={0}
            dy={0}
            blur={6}
            spread={1}
            color={'rgba(27, 253, 156, 0.40)'}
            inner
          />
          <BoxShadow
            dx={0}
            dy={0}
            blur={9}
            spread={2}
            color={'rgba(27, 253, 156, 0.10)'}
          />
        </Box>
      </Canvas>
    </View>
  );
};

export default PremiumButton;
