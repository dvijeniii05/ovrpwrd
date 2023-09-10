import { StackNavigationOptions } from '@react-navigation/stack';
import { Pressable } from 'react-native';
import ArrowLeft from '../assets/icons/arrow-left.svg';

export const withBackButton = (props: {
  route: any;
  navigation: any;
}): StackNavigationOptions => ({
  headerShown: true,
  headerTransparent: true,
  headerTitle: '',
  headerLeft: () => (
    <Pressable onPress={() => props.navigation.goBack()}>
      <ArrowLeft style={{ left: 16 }} />
    </Pressable>
  ),
});
