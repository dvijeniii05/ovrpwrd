import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './UserInfo.styles';
import FramedImage from '../FramedImage/FramedImage';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import AnimatedCurrencyWrapper from '../CurrencyWrapper/AnimatedCurrencyWrapper';
import { PremiumStatusResponseProps } from '../../redux/query/endpoints/premiumApi';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import ProductTag from '../ProductTag/ProductTag';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';

interface Props {
  rawPerks: SharedValue<number>;
  rawRelics: SharedValue<number>;
  userName?: string;
  nickName?: string;
  avatar?: string;
  onAvatarPress?: () => void;
  isAnimatedCurrencies?: boolean;
  premiumStatus?: PremiumStatusResponseProps;
}

const AnimatedUserInfo = (props: Props) => {
  const { hasPremium } = useSelector((state: RootState) => state.userData.data);

  if (props.premiumStatus) {
    const { premiumGamesLeft } = props.premiumStatus.premium;
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
          <FramedImage
            avatar={props.avatar ?? '1'}
            frameColor={hasPremium ? 'premium' : 'white'}
          />
        </TouchableOpacity>
        {hasPremium ? (
          <ProductTag isPremium style={{ marginTop: 8, paddingVertical: 4 }} />
        ) : null}
        <Text style={styles.nameText}>{props.userName}</Text>
        <Text style={styles.nickNameText}>{`@${props.nickName}`}</Text>
        <View style={styles.currencyContainer}>
          <AnimatedCurrencyWrapper
            isPerks
            animatedValue={perksConvertedToText}
          />
          <AnimatedCurrencyWrapper
            isPerks={false}
            animatedValue={relicsConvertedToText}
          />
          {hasPremium ? (
            <CurrencyWrapper currencyType="premiums" value={premiumGamesLeft} />
          ) : null}
        </View>
      </View>
    );
  }
  return null;
};

export default AnimatedUserInfo;
