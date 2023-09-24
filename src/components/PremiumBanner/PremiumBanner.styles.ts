import { TextStyle, ViewStyle } from 'react-native';

const parentContainer: ViewStyle = {
  width: '100%',
  marginTop: 16,
  justifyContent: 'flex-end',
};

const canvas: ViewStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 2,
};

const contentContainer: ViewStyle = {
  zIndex: 3,
  position: 'absolute',
  paddingHorizontal: 16,
  paddingBottom: 24,
};

const headingText: TextStyle = {
  color: 'white',
  fontSize: 32,
  fontFamily: 'Jost-Regular',
};

const descriptionText: TextStyle = {
  ...headingText,
  fontSize: 14,
};

const button: ViewStyle = {
  maxWidth: 160,
  paddingVertical: 8,
  marginTop: 16,
};

export const styles = {
  parentContainer,
  canvas,
  contentContainer,
  headingText,
  descriptionText,
  button,
};
