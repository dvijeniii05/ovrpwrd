import {useNavigation} from '@react-navigation/native';
import React from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {StackProps} from '../../navigation/navigationTypes';
import {StackScreenName} from '../../../ScreenNames';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store/mainStore';
import {setSteamID} from '../../redux/slices/steamAuthSlice';

const SteamModal = () => {
  const navigation = useNavigation<StackProps>();
  const dispatch = useDispatch<AppDispatch>();

  const stateChanged = (navState: WebViewNavigation) => {
    console.log('STATE_CHANGED', navState);
    if (navState.url === 'http://localhost:3000/steamid/?id=367396390') {
      const steamID32 = navState.url.split('id=')[1];
      console.log('steamID32', steamID32);
      dispatch(setSteamID(steamID32));
      navigation.navigate(StackScreenName.home);
    }
  };

  return (
    <WebView
      source={{uri: 'http://localhost:3000/auth/steam'}}
      onNavigationStateChange={stateChanged}
    />
  );
};

export default SteamModal;
