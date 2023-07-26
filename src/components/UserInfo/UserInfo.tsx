import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { dummyData } from '../../constans/dummyData';
import { styles } from './UserInfo.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';

interface Props {
  totalPoints: {
    currentPerks: number;
    currentRelics: number;
  };
}

const UserInfo = (props: Props) => {
  const topInset = useSafeAreaInsets().top;
  const { displayName, email } = useSelector(
    (state: RootState) => state.userData.data,
  );
  console.log(
    props.totalPoints,
    props.totalPoints.currentPerks,
    props.totalPoints.currentRelics,
  );
  return (
    <ImageBackground
      style={styles.userInfoContainer(topInset)}
      source={require('../../assets/dummyAssets/bg.png')}>
      <View style={styles.avatarFrame}>
        <Image source={require('../../assets/dummyAssets/avatar.png')} />
      </View>
      <Text style={{ fontSize: 24, color: 'white', marginTop: 10 }}>
        {displayName}
      </Text>
      <Text style={{ fontSize: 16, color: 'white', marginTop: 5 }}>
        {email}
      </Text>
      <View style={styles.currencyContainer}>
        {/* <CurrencyWrapper
          value={props.totalPoints.currentPerks.toString()}
          isPerks
        />
        <View style={styles.divider} />
        <CurrencyWrapper
          value={props.totalPoints.currentRelics.toString()}
          isPerks={false}
        /> */}
        <CurrencyWrapper value={'213'} isPerks />
        <View style={styles.divider} />
        <CurrencyWrapper value={'2.13'} isPerks={false} />
      </View>
    </ImageBackground>
  );
};

export default UserInfo;
