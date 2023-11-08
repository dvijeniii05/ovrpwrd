import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../../constans/COLORS';

const buttonContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 20,
};

const text = (isSelected: boolean): TextStyle => ({
  fontSize: 20,
  color: isSelected ? COLORS.green : COLORS.white,
  fontFamily: 'Jost-Regular',
});

export const styles = {
  buttonContainer,
  text,
};
