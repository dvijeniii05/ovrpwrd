import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform} from 'react-native';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux/store/mainStore';
import {StackProps} from '../../../navigation/navigationTypes';
import {updateUserInfo} from '../../../redux/slices/userDataSlice';

const GoogleModal = () => {
  const navigation = useNavigation<StackProps>();
  const dispatch = useDispatch<AppDispatch>();

  //Listen to state changes ato handle authentication failures from google side

  // const stateChanged = (navState: WebViewNavigation) => {
  //   console.log('STATE_CHANGED', navState);
  //   // navState.url.includes('steamid/?id=');
  //   // if (navState.url.includes('steamid/?id=')) {
  //   //   const steamID32 = navState.url.split('id=')[1];
  //   //   console.log('steamID32', steamID32);
  //   //   // dispatch(setSteamID(steamID32));
  //   //   // dispatch(fetchStartingPointData(steamID32));
  //   //   // navigation.navigate(StackScreenName.home);
  //   // }
  // };

  const onMessage = (message: WebViewMessageEvent) => {
    const data = message.nativeEvent.data;
    const userdata = data.split('$$$$$');
    if (data == 'Email in use') {
      console.log('Email in use');
      //navigate to Auth screen with disaplyed error message
    } else if (userdata.length > 1) {
      console.log(userdata);
      const email = userdata[0];
      const displayName = userdata[1];
      //  SAVE userData to redux or asyncstorage && navigate to SteamAuth screen
      dispatch(updateUserInfo({email, displayName}));
      navigation.navigate('SteamLogin', {email, displayName});
    }
  };

  return (
    <WebView
      source={{uri: 'https://ovrpwrd-backend.herokuapp.com/api/auth/google'}}
      userAgent={
        Platform.OS === 'android'
          ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
          : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
      }
      onMessage={onMessage}
    />
  );
};

export default GoogleModal;
