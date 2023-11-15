import { useNavigation } from '@react-navigation/native';
import React from 'react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { StackProps } from '../../../navigation/navigationTypes';
import { StackScreenName } from '../../../../ScreenNames';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './SteamModal.styles';
import { devBaseUrl, prodBaseUrl } from '../../../constans/urls';

const SteamModal = () => {
  const navigation = useNavigation<StackProps>();

  const stateChanged = (navState: WebViewNavigation) => {
    console.log('STATE_CHANGED', navState);
    navState.url.includes('steamid/?id=');
    if (navState.url.includes('steamid/?id=')) {
      const steamID32 = navState.url.split('id=')[1];
      console.log('steamID32', steamID32);
      navigation.navigate(StackScreenName.steamLink, { steamID32 });
    }
  };

  return (
    <WebView
      source={{ uri: `${devBaseUrl}/auth/steam` }}
      onNavigationStateChange={stateChanged}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={styles.loaderWrapper}>
          <LottieView
            source={require('../../../assets/lottie/greenLoader.json')}
            style={{ width: 50, height: 50 }}
            autoPlay
            loop
          />
        </View>
      )}
    />
  );
};

export default SteamModal;
