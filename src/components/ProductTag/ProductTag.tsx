import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './ProductTag.styles';

interface Props {
  isPremium: boolean;
  style?: ViewStyle;
}

const ProductTag = (props: Props) => {
  const tagText = props.isPremium ? 'PREMIUM' : 'FREE';
  if (props.isPremium) {
    return (
      <View style={[styles.prizeTag(props.isPremium), props.style]}>
        <Text style={styles.prizeTagText}>{tagText}</Text>
      </View>
    );
  }
  return null;
};

export default ProductTag;
