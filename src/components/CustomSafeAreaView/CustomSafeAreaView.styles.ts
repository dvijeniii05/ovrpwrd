import { ViewStyle } from 'react-native';

const parentContainer = (
  isAndroid: boolean,
  iosBottomInset: number,
): ViewStyle => ({
  paddingBottom: isAndroid ? 32 : 0,
});

export const styles = {
  parentContainer,
};
