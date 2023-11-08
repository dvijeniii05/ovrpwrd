import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const pressable: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
};

const text: TextStyle = {
  color: COLORS.white,
  fontSize: 16,
  fontFamily: 'Jost-Regular',
};

const copiedText: TextStyle = {
  ...text,
  color: COLORS.green,
};

export const styles = {
  parentContainer,
  pressable,
  text,
  copiedText,
};
