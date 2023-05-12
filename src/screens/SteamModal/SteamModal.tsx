import {useNavigation} from '@react-navigation/native';
import React from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {StackProps} from '../../navigation/navigationTypes';
import {StackScreenName} from '../../../ScreenNames';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store/mainStore';
import {setSteamID} from '../../redux/slices/steamAuthSlice';
import {fetchStartingPointData} from '../../redux/slices/userDataSlice';

const SteamModal = () => {
  const navigation = useNavigation<StackProps>();
  const dispatch = useDispatch<AppDispatch>();

  const stateChanged = (navState: WebViewNavigation) => {
    console.log('STATE_CHANGED', navState);
    navState.url.includes('steamid/?id=');
    if (navState.url.includes('steamid/?id=')) {
      const steamID32 = navState.url.split('id=')[1];
      console.log('steamID32', steamID32);
      dispatch(setSteamID(steamID32));
      dispatch(fetchStartingPointData(steamID32));
      // navigation.navigate(StackScreenName.home);
    }
  };

  return (
    <WebView
      source={{uri: 'https://sleepy-badlands-00627.herokuapp.com/auth/steam'}}
      onNavigationStateChange={stateChanged}
    />
  );
};

export default SteamModal;
