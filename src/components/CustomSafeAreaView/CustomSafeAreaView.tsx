import React from 'react';
import { StyleProp, ViewStyle, Platform } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { styles } from './CustomSafeAreaView.styles';

interface Props extends Omit<SafeAreaViewProps, 'style'> {
  style?: StyleProp<ViewStyle>;
}

const CustomSafeAreaView = (props: Props) => {
  const { style, children, ...rest } = props;
  const { bottom } = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';
  return (
    <SafeAreaView
      style={[style, styles.parentContainer(isAndroid, bottom)]}
      {...rest}>
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeAreaView;
