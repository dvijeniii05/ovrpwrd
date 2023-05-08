import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StackParamList} from './navigationTypes';
import {StackScreenName} from '../../ScreenNames';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SteamModal from '../screens/SteamModal/SteamModal';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/mainStore';

const Stack = createStackNavigator<StackParamList>();

const AppDrawer = () => {
  const steamData = useSelector((state: RootState) => state.steamAuth);

  const [isAuthed, setIsAuthed] = useState(steamData.steamID.length);
  useEffect(() => {
    setIsAuthed(steamData.steamID.length);
  }, [steamData.steamID]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthed ? (
        <Stack.Screen name={StackScreenName.home} component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen
            name={StackScreenName.landing}
            component={LandingScreen}
          />
          <Stack.Screen
            name={StackScreenName.steamModal}
            component={SteamModal}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppDrawer;
