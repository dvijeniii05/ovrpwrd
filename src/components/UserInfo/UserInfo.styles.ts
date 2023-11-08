import { TextStyle, ViewStyle } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  marginTop: 80,
  alignItems: 'center',
};

const nameText: TextStyle = {
  fontFamily: 'Jost-Regular',
  fontSize: 25,
  color: COLORS.white,
  marginTop: 4,
};

const nickNameText: TextStyle = {
  ...nameText,
  fontSize: 12,
  marginTop: 0,
};

const currencyContainer: ViewStyle = {
  flexDirection: 'row',
  marginTop: 8,
  alignItems: 'center',
  gap: 8,
};

export const styles = {
  parentContainer,
  nameText,
  nickNameText,
  currencyContainer,
};
