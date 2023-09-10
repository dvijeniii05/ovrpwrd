import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { StackParamList } from './navigationTypes';
import { StackScreenName } from '../../ScreenNames';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import SteamModal from '../screens/Modals/SteamModal/SteamModal';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/mainStore';
import SteamLoginScreen from '../screens/SteamLoginScreen/SteamLoginScreen';
import Home from '../screens/HomeScreen/HomeScreen';
import SteamLinkScreen from '../screens/SteamLinkScreen/SteamLinkScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';
import { Pressable, Text, View } from 'react-native';
import ArrowLeft from '../assets/icons/arrow-left.svg';
import AvatarScreen from '../screens/AvatarScreen/AvatarScreen';
import LinkGame from '../screens/LinkGameScreen/LinkGameScreen';
import { withBackButton } from './ScreenOptions';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';

const Stack = createStackNavigator<StackParamList>();

const AppDrawer = () => {
  // const isAuthed = false;

  // const isAnonymousUser = useSelector(
  //   (state: RootState) => state.userData.data.isAnonymousUser,
  // );

  // const isNewUser = useSelector(
  //   (state: RootState) => state.userData.data.isNewUser,
  // );

  // const isAnonymousUser = true; // Prior Google / Apple auth
  // const isNewUser = true; // After Google / Apple auth && new user
  const isAuthed = true; // fully registered user with linked Steam
  const notFullyOnboarded = true; // Registred but not picked avatart and not linked Steam

  // if (isFetching) return <SplashScreen />;
  // console.log('isAnonymous:', isAnonymousUser, 'isNewUSer:', isNewUser);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name={StackScreenName.landing} component={LandingScreen} />
      <Stack.Screen name={StackScreenName.welcome} component={WelcomeScreen} />
      <Stack.Group screenOptions={withBackButton}>
        <Stack.Screen
          name={StackScreenName.registration}
          component={RegistrationScreen}
        />
        <Stack.Screen name={StackScreenName.avatar} component={AvatarScreen} />
        <Stack.Screen name={StackScreenName.linkGame} component={LinkGame} />
      </Stack.Group>

      <Stack.Screen name={StackScreenName.steamModal} component={SteamModal} />
      <Stack.Screen
        name={StackScreenName.steamLink}
        component={SteamLinkScreen}
      />
      <Stack.Screen
        name={StackScreenName.steamLogin}
        component={SteamLoginScreen}
      /> */}
      {/* {isAuthed && ( */}
      <Stack.Screen name={StackScreenName.home} component={Home} />
      {/* )} */}
    </Stack.Navigator>
  );
};

export default AppDrawer;
