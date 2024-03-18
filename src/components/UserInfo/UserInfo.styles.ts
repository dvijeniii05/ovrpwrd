import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  marginTop: 80,
  alignItems: 'center',
};

const nameText = (isLongNickname: boolean): TextStyle => ({
  fontFamily: 'Jost-Regular',
  fontSize: isLongNickname ? 18 : 25,
  color: COLORS.white,
  marginTop: 4,
  paddingHorizontal: 20,
});

const currencyContainer: ViewStyle = {
  flexDirection: 'row',
  marginTop: 8,
  alignItems: 'center',
  gap: 8,
};

export const styles = {
  parentContainer,
  nameText,
  currencyContainer,
};
