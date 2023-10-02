import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './UserInfo.styles';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import FramedImage from '../FramedImage/FramedImage';

interface Props {
  currentPerks?: number;
  currentRelics?: number;
  userName?: string;
  nickName?: string;
}

const UserInfo = (props: Props) => {
  return (
    <View style={styles.parentContainer}>
      <FramedImage avatar={'1'} frameColor="white" />
      <Text style={styles.nameText}>{props.userName}</Text>
      <Text style={styles.nickNameText}>{`@${props.nickName}`}</Text>
      <View style={styles.currencyContainer}>
        <CurrencyWrapper value={props.currentPerks ?? 0} isPerks />
        <CurrencyWrapper value={props.currentRelics ?? 0} isPerks={false} />
      </View>
    </View>
  );
};

export default UserInfo;
