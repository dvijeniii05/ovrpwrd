import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  alignItems: 'center',
};

const titleText = (isSmallComponent: boolean): TextStyle => ({
  fontSize: isSmallComponent ? 10 : 14,
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
});

const extraLargeText: TextStyle = {
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
  fontSize: 18,
};

const button = (isSmallComponent: boolean): ViewStyle => ({
  padding: isSmallComponent ? 4 : 8,
  backgroundColor: COLORS.red,
  borderRadius: isSmallComponent ? 4 : 8,
  marginTop: isSmallComponent ? 4 : 8,
});

const largeButton: ViewStyle = {
  backgroundColor: COLORS.red,
  paddingVertical: 16,
  borderRadius: 16,
  marginTop: 16,
  paddingHorizontal: 32,
};

const buttonText = (isSmallComponent: boolean): TextStyle => ({
  textAlign: 'center',
  color: 'white',
  fontWeight: '500',
  fontFamily: 'Jost-Regular',
  fontSize: isSmallComponent ? 10 : 14,
});

const largeButtonText: TextStyle = {
  textAlign: 'center',
  color: 'white',
  fontWeight: '500',
  fontFamily: 'Jost-Regular',
  fontSize: 14,
};

export const styles = {
  parentContainer,
  titleText,
  extraLargeText,
  button,
  largeButton,
  buttonText,
  largeButtonText,
};
