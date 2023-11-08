import React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import CopyIcon from '../../assets/icons/copy.svg';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import ClipboardFunction from '@react-native-clipboard/clipboard';
import { styles } from './Clipboard.styles';
import { COLORS } from '../../constans/COLORS';

interface Props {
  promoCode: string;
  style?: ViewStyle;
}

const Clipboard = (props: Props) => {
  const opacity = useSharedValue(1);

  const onPress = () => {
    ClipboardFunction.setString(props.promoCode);
    opacity.value = withSequence(
      withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      withDelay(
        3000,
        withTiming(1, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      ),
    );
  };

  const animatedOpacity = useAnimatedStyle(() => {
    const interpolatedOpacity = interpolate(opacity.value, [1, 0], [0, 1]);
    return {
      opacity: interpolatedOpacity,
    };
  });

  return (
    <View style={[styles.parentContainer, props.style]}>
      <Animated.View style={{ zIndex: 2, opacity }}>
        <Pressable onPress={onPress} style={styles.pressable}>
          <Text style={styles.text}>{props.promoCode}</Text>
          <CopyIcon width={24} height={24} />
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 1,
          },
          animatedOpacity,
        ]}>
        <Text style={styles.copiedText}>Copied to Clipboard</Text>
      </Animated.View>
    </View>
  );
};

export default Clipboard;
