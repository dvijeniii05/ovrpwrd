import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './UserInfo.styles';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import FramedImage from '../FramedImage/FramedImage';

interface Props {
  currentPerks?: number;
  currentRelics?: number;
  userName?: string;
  nickName?: string;
  avatar?: string;
  onAvatarPress?: () => void;
}

const UserInfo = (props: Props) => {
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
        <CurrencyWrapper
          value={Number(props.currentPerks).toFixed(0) ?? 0}
          isPerks
        />
        <CurrencyWrapper
          value={Number(props.currentRelics).toFixed(2) ?? '0'}
          isPerks={false}
        />
      </View>
    </View>
  );
};

export default UserInfo;
