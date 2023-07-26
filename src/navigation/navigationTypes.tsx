import {StackNavigationProp} from '@react-navigation/stack';

export type StackParamList = {
  // SplashScreen: undefined;
  Landing: undefined;
  SteamLogin: {
    email: string;
    displayName: string;
  };
  SteamModal: undefined;
  SteamLink: {
    steamID32: string;
  };
  Home: undefined;
};

export type StackProps = StackNavigationProp<StackParamList>;
