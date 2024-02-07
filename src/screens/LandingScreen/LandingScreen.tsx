import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { StackScreenProps } from '@react-navigation/stack';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { styles } from './LandingScreen.styles';
import Logo from '../../assets/Logo.svg';
import { useTranslation } from 'react-i18next';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import Gradient from '../../components/Gradient/Gradient';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../../redux/slices/userDataSlice';

type ScreenProps = StackScreenProps<StackParamList>;

const LandingScreen = ({ navigation }: ScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '',
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
    googleIsSignedIn();
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const { email } = userInfo.user;
      dispatch(updateUserDetails({ email }));
      navigation.navigate(StackScreenName.welcome);
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
  const googleIsSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!isSignedIn) {
      getGoogleCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
  };
  const getGoogleCurrentUserInfo = async () => {
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

  const appleSignIn = async () => {
    console.warn('Beginning Apple Authentication');

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const { user: newUser, email } = appleAuthRequestResponse;

      const user = newUser;
      if (email !== null) {
        dispatch(updateUserDetails({ email }));
      }
      dispatch(updateUserDetails({ appleUserId: user }));
      navigation.navigate(StackScreenName.welcome);
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn(' Apple Sign in is cancelled');
      } else {
        console.error(error);
      }
    }
  };
  return (
    <CustomSafeAreaView style={styles.parentContainer} edges={['bottom']}>
      <Gradient type="conical" />
      <Logo style={styles.logo} />
      <Text style={styles.heading}>{t('singUp.text')}</Text>
      <View style={styles.buttonsContainer}>
        {Platform.OS === 'ios' ? (
          <StandardButton
            logoName="apple"
            buttonText="Apple"
            onPress={appleSignIn}
          />
        ) : null}
        <StandardButton
          logoName="google"
          buttonText="Google"
          onPress={googleSignIn}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default LandingScreen;
