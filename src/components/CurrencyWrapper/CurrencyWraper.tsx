import React from 'react';
import {StyleProp, View, Image, Text, ViewStyle} from 'react-native';
import {styles} from './CurrencyWrapper.styles';

interface Props {
  style?: ViewStyle;
  isPerks: boolean;
  value: string;
  staticWidth?: boolean;
}

const CurrencyWrapper = ({staticWidth = false, ...props}: Props) => {
  return (
    <View style={[styles.currencyContainer(staticWidth), props.style]}>
      {props.isPerks ? (
        <>
          <Image
            source={require('../../assets/dummyAssets/perk.png')}
            style={{width: 24, height: 24}}
            resizeMode="cover"
          />

          <Text style={styles.textContainer(staticWidth)}>{props.value}</Text>
        </>
      ) : (
        <>
          <Image
            source={require('../../assets/dummyAssets/relic.png')}
            style={{width: 24, height: 24}}
            resizeMode="cover"
          />
          <Text style={styles.textContainer(staticWidth)}>{props.value}</Text>
        </>
      )}
    </View>
  );
};

export default CurrencyWrapper;
