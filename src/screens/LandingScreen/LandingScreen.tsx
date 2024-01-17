import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { StackScreenProps } from '@react-navigation/stack';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { styles } from './LandingScreen.styles';
import Logo from '../../assets/Logo.svg';
import { useTranslation } from 'react-i18next';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import Gradient from '../../components/Gradient/Gradient';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';

type ScreenProps = StackScreenProps<StackParamList>;

const LandingScreen = ({ navigation }: ScreenProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '',
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
    isSignedIn();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const { email, name } = userInfo.user;
      //TODO: add query to check userExistance with login/User endpoint and navigate to correct stack OR automate navigation in AppDrawer
      // loginUser({ email });
      navigation.navigate(StackScreenName.welcome, { email });
    } catch (error: any) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
  };
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('SILENT_SIGNING');
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        // alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };
  return (
    <CustomSafeAreaView style={styles.parentContainer} edges={['bottom']}>
      <Gradient type="conical" />
      <Logo style={styles.logo} />
      <Text style={styles.heading}>{t('singUp.text')}</Text>
      <View style={styles.buttonsContainer}>
        <StandardButton
          logoName="apple"
          buttonText="Apple"
          isDisabled
          onPress={() => {}}
        />
        <StandardButton
          logoName="google"
          buttonText="Google"
          onPress={signIn}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default LandingScreen;
