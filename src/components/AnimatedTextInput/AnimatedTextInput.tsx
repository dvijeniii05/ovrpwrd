import React from 'react';
import { TextInput } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  AnimatedProps,
} from 'react-native-reanimated';
import type { TextInputProps, TextProps as RNTextProps } from 'react-native';
import { COLORS } from '../../constans/COLORS';

Animated.addWhitelistedNativeProps({ text: true });

interface TextProps extends Omit<TextInputProps, 'value' | 'style'> {
  text: SharedValue<string>;
  style?: AnimatedProps<RNTextProps>['style'];
}

const AnimatedTextInputComponent = Animated.createAnimatedComponent(TextInput);

export const AnimatedTextInput = (props: TextProps) => {
  const { style, text, ...rest } = props;
  const animatedProps = useAnimatedProps(
    () =>
      ({
        text: text.value,
      } as any),
  );

  return (
    <AnimatedTextInputComponent
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      style={[{ color: COLORS.black }, style || undefined]}
      {...rest}
      {...{ animatedProps }}
    />
  );
};
