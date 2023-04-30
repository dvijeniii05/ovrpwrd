import {StackNavigationProp} from '@react-navigation/stack';

export type StackParamList = {
  Landing: undefined;
  SteamModal: undefined;
  Home: undefined;
};

export type StackProps = StackNavigationProp<StackParamList>;
