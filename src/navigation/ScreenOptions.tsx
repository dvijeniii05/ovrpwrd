import { StackNavigationOptions } from '@react-navigation/stack';
import { Pressable } from 'react-native';
import ArrowLeft from '../assets/icons/arrow-left.svg';
import Home from '../assets/icons/home.svg';
import Basket from '../assets/icons/basket.svg';
import Cup from '../assets/icons/cup.svg';
import { StackScreenName } from '../../ScreenNames';

export const withBackButton = (props: {
  route: any;
  navigation: any;
}): StackNavigationOptions => ({
  headerShown: true,
  headerTransparent: true,
  headerTitle: '',
  headerLeft: () => (
    <Pressable onPress={() => props.navigation.goBack()}>
      <ArrowLeft style={{ marginLeft: 16 }} width={28} height={28} />
    </Pressable>
  ),
});

export const withHiddenBackButtonAndDisabledSwipe = (props: {
  route: any;
  navigation: any;
}): StackNavigationOptions => ({
  headerLeft: () => <></>,
  gestureEnabled: false,
});

export const withHomeButton = (props: {
  route: any;
  navigation: any;
}): StackNavigationOptions => ({
  headerShown: true,
  headerTransparent: true,
  headerTitle: '',
  headerLeft: () => (
    <Pressable onPress={() => props.navigation.navigate(StackScreenName.home)}>
      <Home style={{ marginLeft: 16 }} width={28} height={28} />
    </Pressable>
  ),
});

export const withSpecialHeaderButtons = (props: {
  route: any;
  navigation: any;
}): StackNavigationOptions => ({
  headerShown: true,
  headerTransparent: true,
  headerTitle: '',
  headerLeft: () => (
    <Pressable
      onPress={() => props.navigation.navigate(StackScreenName.marketplace)}>
      <Basket style={{ marginLeft: 16 }} width={28} height={28} />
    </Pressable>
  ),
  headerRight: () => (
    <Pressable
      onPress={() => props.navigation.navigate(StackScreenName.allLeagues)}>
      <Cup style={{ marginRight: 16 }} width={28} height={28} />
    </Pressable>
  ),
});
