import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './UserInfo.styles';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import FramedImage from '../FramedImage/FramedImage';
import { PremiumStatusResponseProps } from '../../redux/query/endpoints/premiumApi';
import ProductTag from '../ProductTag/ProductTag';
import PremiumWrapper from '../PremiumWrapper/PremiumWrapper';

interface Props {
  currentPerks?: number;
  currentRelics?: number;
  userName?: string;
  nickName?: string;
  avatar?: string;
  onAvatarPress?: () => void;
  premiumStatus?: PremiumStatusResponseProps;
}

const UserInfo = (props: Props) => {
  if (props.premiumStatus) {
    const { premiumGamesLeft, hasPremium } = props.premiumStatus.premium;
    const isLongNickname = props.nickName?.length! > 24;

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
        <Text style={styles.nameText(isLongNickname)}>{props.nickName}</Text>
        <View style={styles.currencyContainer}>
          <CurrencyWrapper
            value={Number(props.currentPerks).toFixed(0) ?? 0}
            currencyType="perks"
          />
          <CurrencyWrapper
            value={Number(props.currentRelics).toFixed(2) ?? '0'}
            currencyType="relics"
          />
          {hasPremium ? <PremiumWrapper value={premiumGamesLeft} /> : null}
        </View>
      </View>
    );
  }
  return null;
};

export default UserInfo;
