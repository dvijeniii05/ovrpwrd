import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './UserInfo.styles';
import FramedImage from '../FramedImage/FramedImage';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import AnimatedCurrencyWrapper from '../CurrencyWrapper/AnimatedCurrencyWrapper';

interface Props {
  rawPerks: SharedValue<number>;
  rawRelics: SharedValue<number>;
  userName?: string;
  nickName?: string;
  avatar?: string;
  onAvatarPress?: () => void;
  isAnimatedCurrencies?: boolean;
}

const AnimatedUserInfo = (props: Props) => {
  const perksConvertedToText = useDerivedValue(() => {
    return `${Number(props.rawPerks.value).toFixed(0)}`;
  });

  const relicsConvertedToText = useDerivedValue(() => {
    return `${Number(props.rawRelics.value).toFixed(2)}`;
  });

  return (
    <View style={styles.parentContainer}>
      <TouchableOpacity
        disabled={props.onAvatarPress === undefined}
        onPress={() =>
          props.onAvatarPress ? props.onAvatarPress() : undefined
        }>
        <FramedImage avatar={props.avatar ?? '1'} frameColor="white" />
      </TouchableOpacity>
      <Text style={styles.nameText}>{props.userName}</Text>
      <Text style={styles.nickNameText}>{`@${props.nickName}`}</Text>
      <View style={styles.currencyContainer}>
        <AnimatedCurrencyWrapper isPerks animatedValue={perksConvertedToText} />
        <AnimatedCurrencyWrapper
          isPerks={false}
          animatedValue={relicsConvertedToText}
        />
      </View>
    </View>
  );
};

export default AnimatedUserInfo;
