import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { styles } from './CardWrapper.styles';
import ArrowRight from '../../assets/dummyAssets/arrow-right.svg';
import { BlurView } from '@react-native-community/blur';

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
