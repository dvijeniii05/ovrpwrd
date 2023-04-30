import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StackParamList} from './navigationTypes';
import {StackScreenName} from '../../ScreenNames';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SteamModal from '../screens/SteamModal/SteamModal';

const Stack = createStackNavigator<StackParamList>();

const AppDrawer = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={StackScreenName.landing} component={LandingScreen} />
      <Stack.Screen name={StackScreenName.steamModal} component={SteamModal} />
      <Stack.Screen name={StackScreenName.home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppDrawer;
