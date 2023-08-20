import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StackParamList } from './navigationTypes';
import { StackScreenName } from '../../ScreenNames';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import SteamModal from '../screens/Modals/SteamModal/SteamModal';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/mainStore';
import SteamLoginScreen from '../screens/SteamLoginScreen/SteamLoginScreen';
import Home from '../screens/Home/Home';
import SteamLinkScreen from '../screens/SteamLinkScreen/SteamLinkScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';
import { Pressable, Text, View } from 'react-native';
import ArrowLeft from '../assets/icons/arrow-left.svg';

const Stack = createStackNavigator<StackParamList>();

const AppDrawer = () => {
  const isAuthed = useSelector(
    (state: RootState) => state.userData.data.isAuthed,
  );

  // const isAuthed = false;

  // if (isFetching) return <SplashScreen />;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthed ? (
        <Stack.Screen name={StackScreenName.home} component={Home} />
      ) : (
        <>
          {/* <Stack.Screen
            name={StackScreenName.landing}
            component={LandingScreen}
          /> */}
          <Stack.Screen
            name={StackScreenName.registration}
            component={RegistrationScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTransparent: true,
              headerTitle: '',
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                  <ArrowLeft style={{ left: 16 }} />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name={StackScreenName.steamLogin}
            component={SteamLoginScreen}
          />
          <Stack.Screen
            name={StackScreenName.steamModal}
            component={SteamModal}
          />
          <Stack.Screen
            name={StackScreenName.steamLink}
            component={SteamLinkScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppDrawer;
