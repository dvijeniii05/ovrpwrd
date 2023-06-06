import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackParamList} from '../../navigation/navigationTypes';
import {StackScreenName} from '../../../ScreenNames';
import {StackScreenProps} from '@react-navigation/stack';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store/mainStore';
import {updateUserInfo} from '../../redux/slices/userDataSlice';

type ScreenProps = StackScreenProps<StackParamList>;

const LandingScreen = ({navigation}: ScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();

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
      const {email, name} = userInfo.user;
      dispatch(updateUserInfo({email, displayName: name}));
      navigation.navigate(StackScreenName.steamLogin, {
        email,
        displayName: name ?? 'noName',
      });
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{height: 500, justifyContent: 'space-around'}}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          Register/Login
        </Text>
        <TouchableOpacity onPress={signIn}>
          <Image
            source={require('../../assets/google/googleButton.png')}
            resizeMode="contain"
            style={{width: 200, height: 50}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
