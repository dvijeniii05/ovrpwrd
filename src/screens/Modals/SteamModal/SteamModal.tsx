import {useNavigation} from '@react-navigation/native';
import React from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {StackProps} from '../../../navigation/navigationTypes';

import {StackScreenName} from '../../../../ScreenNames';

const SteamModal = () => {
  const navigation = useNavigation<StackProps>();

  const stateChanged = (navState: WebViewNavigation) => {
    console.log('STATE_CHANGED', navState);
    navState.url.includes('steamid/?id=');
    if (navState.url.includes('steamid/?id=')) {
      const steamID32 = navState.url.split('id=')[1];
      console.log('steamID32', steamID32);
      navigation.navigate(StackScreenName.steamLink, {steamID32});
    }
  };

  return (
    <WebView
      source={{uri: 'https://ovrpwrd-backend.herokuapp.com/auth/steam'}}
      onNavigationStateChange={stateChanged}
    />
  );
};

export default SteamModal;
