import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../../constans/COLORS';

const buttonContainer = (
  isDisabled?: boolean,
  hasIcon?: string,
): ViewStyle => ({
  backgroundColor: isDisabled ? COLORS.neutral : COLORS.mainBlue,
  flexDirection: hasIcon ? 'row' : 'column',
  paddingVertical: 12,
  paddingHorizontal: 22,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  borderRadius: 12,
  maxWidth: '100%',
});

const buttonText: TextStyle = {
  fontSize: 18,
  fontFamily: 'Jost-SemiBold',
  color: COLORS.white,
  textAlignVertical: 'center',
  alignSelf: 'center',
};

export const styles = {
  buttonContainer,
  buttonText,
};
