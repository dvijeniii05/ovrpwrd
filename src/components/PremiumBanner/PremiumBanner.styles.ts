import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  width: '100%',
  marginTop: 16,
  alignItems: 'center',
  justifyContent: 'center',
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
  height: '100%',
  justifyContent: 'flex-end',
};

const headingText: TextStyle = {
  color: 'white',
  fontSize: 32,
  fontFamily: 'Jost-Regular',
};

const withPremiumHeadingText: TextStyle = {
  color: 'white',
  fontSize: 26,
  fontFamily: 'Jost-Regular',
  textAlign: 'center',
};

const descriptionText: TextStyle = {
  ...headingText,
  fontSize: 14,
};

const withPremiumDescriptionText: TextStyle = {
  ...withPremiumHeadingText,
  fontSize: 16,
};

const button: ViewStyle = {
  maxWidth: 160,
  paddingVertical: 8,
  marginTop: 16,
};

const withPremiumButton: ViewStyle = {
  width: '100%',
  paddingVertical: 8,
  marginTop: 16,
  backgroundColor: COLORS.green,
};

export const styles = {
  parentContainer,
  canvas,
  contentContainer,
  headingText,
  withPremiumHeadingText,
  withPremiumDescriptionText,
  descriptionText,
  button,
  withPremiumButton,
};
