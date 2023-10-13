import { StackNavigationProp } from '@react-navigation/stack';
import { leaugeNames } from '../constans/interfaces';

export type StackParamList = {
  // SplashScreen: undefined;
  Landing: undefined;
  Welcome: { email: string };
  Registration: {
    email: string;
  };
  Avatar: undefined;
  LinkGame: undefined;
  SteamLogin: undefined;
  SteamModal: undefined;
  SteamLink: {
    steamID32: string;
  };
  Home: undefined;
  AllLeagues: undefined;
  LeagueInfo: {
    leagueName: leaugeNames;
    userPerks: number;
  };
};

export type StackProps = StackNavigationProp<StackParamList>;
