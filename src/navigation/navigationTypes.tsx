import { StackNavigationProp } from '@react-navigation/stack';
import { leaugeNames } from '../constans/interfaces';
import { Product } from '../redux/query/endpoints/productsApi';

export type StackParamList = {
  Landing: undefined;
  WelcomeInfo: undefined;
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
  Marketplace: undefined;
  AllProducts: {
    products: Product[];
    productType: string;
  };
  ProductInfo: {
    product: Product;
  };
  Account: undefined;
  MatchHistory: undefined;
  LeaderboardScreen: {
    userNickname: string;
  };
};

export type StackProps = StackNavigationProp<StackParamList>;
