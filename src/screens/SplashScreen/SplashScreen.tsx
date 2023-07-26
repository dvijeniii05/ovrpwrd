import React from 'react';
import {Image, View} from 'react-native';
import {COLORS} from '../../constans/COLORS';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.blackPrimary,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/dummyAssets/logo.png')}
        style={{height: '30%'}}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
