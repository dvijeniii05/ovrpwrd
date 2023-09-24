import React from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './CardWrapper.styles';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardWrapper = (props: Props) => {
  return (
    // <BlurView
    //   style={[styles.container, props.style]}
    //   blurAmount={20}
    //   blurType="dark">
    //   {props.children}
    // </BlurView>
    <View style={[styles.container, props.style]}>{props.children}</View>
  );
};

export default CardWrapper;
