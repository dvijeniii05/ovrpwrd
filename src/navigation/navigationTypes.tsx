import {StackNavigationProp} from '@react-navigation/stack';

export type StackParamList = {
  Landing: undefined;
  SteamLogin: {
    email: string;
    displayName: string;
  };
  SteamModal: undefined;
  Home: undefined;
};

export type StackProps = StackNavigationProp<StackParamList>;
