import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  backgroundColor: COLORS.blackTertiary,
  alignItems: 'center',
  paddingBottom: 16,
  paddingTop: 16,
  paddingHorizontal: 16,
  borderRadius: 16,
};

const buttonContainer: ViewStyle = {
  backgroundColor: COLORS.blue,
  borderRadius: 8,
  paddingVertical: 4,
  paddingHorizontal: 8,
  marginTop: 16,
};

const buttonText: TextStyle = {
  color: COLORS.white,
  fontSize: 12,
  fontFamily: 'Jost-Regular',
};

export const styles = {
  parentContainer,
  buttonContainer,
  buttonText,
};
