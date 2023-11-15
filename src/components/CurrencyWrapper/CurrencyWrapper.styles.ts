import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const currencyContainer = (staticWidth: boolean): ViewStyle => {
  return {
    backgroundColor: COLORS.semiDarkBlue,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    width: staticWidth ? 96 : 'auto',
    borderRadius: 20,
  };
};

const currencyContainerForLeagues: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const text = (staticWidth: boolean): TextStyle => {
  return {
    color: 'white',
    marginLeft: staticWidth ? 0 : 8,
    fontFamily: 'Jost-SemiBold',
  };
};
const textForLeagues: TextStyle = {
  color: COLORS.white,
  fontSize: 12,
  fontFamily: 'Jost-SemiBold',
  marginLeft: 4,
};

export const styles = {
  currencyContainer,
  currencyContainerForLeagues,
  text,
  textForLeagues,
};
