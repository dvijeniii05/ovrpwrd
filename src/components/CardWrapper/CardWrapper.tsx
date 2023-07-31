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
  return (
    <View style={[styles.container, props.style]}>
      {props.headingText ? (
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>{props.headingText}</Text>
          <TouchableOpacity style={{ justifyContent: 'center' }}>
            <ArrowRight width={16} height={16} />
          </TouchableOpacity>
        </View>
      ) : null}
      {props.leagueEndsIn ? (
        <View style={styles.leagueEndsContainer}>
          <Text style={styles.leagueEndsText}>{props.leagueEndsIn}</Text>
        </View>
      ) : null}
      {props.children}
    </View>
  );
};

export default CardWrapper;
