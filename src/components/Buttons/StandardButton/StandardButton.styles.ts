import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../../constans/COLORS';

const buttonContainer = (isDisabled?: boolean): ViewStyle => ({
  backgroundColor: isDisabled ? COLORS.neutral : COLORS.mainBlue,
  flexDirection: 'row',
  paddingVertical: 16,
  paddingHorizontal: 24,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  borderRadius: 12,
  width: '100%',
});

const buttonText: TextStyle = {
  fontSize: 20,
  fontFamily: 'Jost-SemiBold',
  color: COLORS.white,
  textAlignVertical: 'center',
  alignSelf: 'center',
};

export const styles = {
  buttonContainer,
  buttonText,
};
