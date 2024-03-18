import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  marginTop: 32,
};

const contentContainer: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
};

const textContainer: ViewStyle = {
  width: '70%',
};

const headingText: TextStyle = {
  color: 'white',
  fontSize: 36,
  fontFamily: 'Jost-Regular',
  lineHeight: 40,
};

const descriptionText: TextStyle = {
  ...headingText,
  fontSize: 18,
  lineHeight: 20,
  marginTop: 8,
  color: COLORS.green,
};

const button: ViewStyle = {
  maxWidth: 160,
  paddingVertical: 8,
  marginTop: 24,
};

export const styles = {
  parentContainer,
  contentContainer,
  textContainer,
  headingText,
  descriptionText,
  button,
};
