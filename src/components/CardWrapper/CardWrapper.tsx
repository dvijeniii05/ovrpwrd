import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {styles} from './CardWrapper.styles';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardWrapper = (props: Props) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

export default CardWrapper;
