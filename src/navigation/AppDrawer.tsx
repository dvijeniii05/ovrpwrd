import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StackParamList} from './navigationTypes';
import {StackScreenName} from '../../ScreenNames';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SteamModal from '../screens/Modals/SteamModal/SteamModal';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/mainStore';
import SteamLoginScreen from '../screens/SteamLoginScreen/SteamLoginScreen';
import GoogleModal from '../screens/Modals/GoogleModal/GoogleModal';

const Stack = createStackNavigator<StackParamList>();

const AppDrawer = () => {
  const steamData = useSelector((state: RootState) => state.steamAuth);
  const email = useSelector((state: RootState) => state.userData.data.email);

  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  useEffect(() => {
    setIsAuthed(steamData.steamID.length > 1 && email != '');
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
            name={StackScreenName.googleModal}
            component={GoogleModal}
          />
          <Stack.Screen
            name={StackScreenName.steamLogin}
            component={SteamLoginScreen}
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
