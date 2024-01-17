import { ViewStyle } from 'react-native';

const parentContainer = (isAndroid: boolean): ViewStyle => ({
  paddingBottom: isAndroid ? 24 : 0,
});

export const styles = {
  parentContainer,
};
