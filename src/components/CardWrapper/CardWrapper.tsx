import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { styles } from './CardWrapper.styles';
import ArrowRight from '../../assets/dummyAssets/arrow-right.svg';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  headingText?: string;
  leagueEndsIn?: string;
}

const CardWrapper = (props: Props) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

export default CardWrapper;
