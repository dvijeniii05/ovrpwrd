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
    width: staticWidth ? 88 : 'auto',
    borderRadius: 20,
  };
};

const textContainer = (staticWidth: boolean): TextStyle => {
  return {
    color: 'white',
    marginLeft: staticWidth ? 0 : 8,
    fontFamily: 'Jost-SemiBold',
  };
};

export const styles = {
  currencyContainer,
  textContainer,
};
