import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './UserInfo.styles';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import FramedImage from '../FramedImage/FramedImage';

interface Props {
  totalPoints: {
    currentPerks: number;
    currentRelics: number;
  };
  userName: string;
  nickName: string;
}

const UserInfo = (props: Props) => {
  return (
    <View style={styles.parentContainer}>
      <FramedImage avatar={'1'} frameColor="white" />
      <Text style={styles.nameText}>{props.userName}</Text>
      <Text style={styles.nickNameText}>{`@${props.nickName}`}</Text>
      <View style={styles.currencyContainer}>
        <CurrencyWrapper value={'213'} isPerks />
        <CurrencyWrapper value={'2.13'} isPerks={false} />
      </View>
    </View>
  );
};

export default UserInfo;
