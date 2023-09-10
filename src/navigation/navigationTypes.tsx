import { StackNavigationProp } from '@react-navigation/stack';

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
};

export type StackProps = StackNavigationProp<StackParamList>;
