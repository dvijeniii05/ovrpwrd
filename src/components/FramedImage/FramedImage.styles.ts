import { ImageStyle, ViewStyle } from 'react-native';

const parentContainer = (isOverflowHidden?: boolean): ViewStyle => ({
  justifyContent: 'center',
  alignItems: 'center',
  overflow: isOverflowHidden ? 'hidden' : 'visible',
});

const image = (isFrameBlue: boolean): ImageStyle => ({
  position: 'absolute',
  height: isFrameBlue ? '90%' : '85%',
});

export const styles = {
  parentContainer,
  image,
};
