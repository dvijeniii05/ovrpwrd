import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './UserInfo.styles';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import FramedImage from '../FramedImage/FramedImage';
import { PremiumStatusResponseProps } from '../../redux/query/endpoints/premiumApi';
import ProductTag from '../ProductTag/ProductTag';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';

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
  const { hasPremium } = useSelector((state: RootState) => state.userData.data);

  if (props.premiumStatus) {
    const { premiumGamesLeft } = props.premiumStatus.premium;

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
          <CurrencyWrapper
            value={Number(props.currentPerks).toFixed(0) ?? 0}
            currencyType="perks"
          />
          <CurrencyWrapper
            value={Number(props.currentRelics).toFixed(2) ?? '0'}
            currencyType="relics"
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

export default UserInfo;
