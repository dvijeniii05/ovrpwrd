import { createStackNavigator } from '@react-navigation/stack';
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
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';
import AvatarScreen from '../screens/AvatarScreen/AvatarScreen';
import LinkGame from '../screens/LinkGameScreen/LinkGameScreen';
import {
  withBackButton,
  withHomeButton,
  withSpecialHeaderButtons,
} from './ScreenOptions';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LeagueScreen from '../screens/LeagueInfoScreen/LeagueInfoScreen';
import AllLeaguesScreen from '../screens/AllLeaguesScreen/AllLeaguesScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen/MarketplaceScreen';
import AllProductsScreen from '../screens/AllProductsScreen/AllProductsScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen/ProductInfoScreen';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import MatchHistoryScreen from '../screens/MatchHistoryScreen/MatchHistoryScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen/LeaderboardScreen';
import { getToken } from '../redux/store/getTokenHelper';

const Stack = createStackNavigator<StackParamList>();

const AppDrawer = () => {
  const userLocalData = useSelector((state: RootState) => state.userData.data);
  const isUserFullyOnboarded = getToken() && userLocalData.isGameLinked;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isUserFullyOnboarded ? (
        <>
          <Stack.Screen
            name={StackScreenName.landing}
            component={LandingScreen}
          />
          <Stack.Screen
            name={StackScreenName.welcome}
            component={WelcomeScreen}
          />
          <Stack.Group screenOptions={withBackButton}>
            <Stack.Screen
              name={StackScreenName.registration}
              component={RegistrationScreen}
            />
            <Stack.Screen
              name={StackScreenName.avatar}
              component={AvatarScreen}
            />
            <Stack.Screen
              name={StackScreenName.linkGame}
              component={LinkGame}
            />
          </Stack.Group>
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
      ) : (
        <>
          <Stack.Screen
            name={StackScreenName.home}
            component={Home}
            options={withSpecialHeaderButtons}
          />
          <Stack.Screen
            name={StackScreenName.allLeagues}
            component={AllLeaguesScreen}
            options={withBackButton}
          />
          <Stack.Screen
            name={StackScreenName.leagueInfo}
            component={LeagueScreen}
            options={withBackButton}
          />
          <Stack.Screen
            name={StackScreenName.marketplace}
            component={MarketplaceScreen}
            options={withBackButton}
          />
          <Stack.Screen
            name={StackScreenName.allProducts}
            component={AllProductsScreen}
            options={withBackButton}
          />
          <Stack.Screen
            name={StackScreenName.prodcutInfo}
            component={ProductInfoScreen}
            options={withBackButton}
          />
          <Stack.Screen
            name={StackScreenName.account}
            component={AccountScreen}
            options={withHomeButton}
          />
          <Stack.Screen
            name={StackScreenName.matchHistory}
            component={MatchHistoryScreen}
            options={withBackButton}
          />
          <Stack.Screen
            name={StackScreenName.leaderboardScreen}
            component={LeaderboardScreen}
            options={withBackButton}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppDrawer;
