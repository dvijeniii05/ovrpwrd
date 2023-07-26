import {TextStyle, ViewStyle} from 'react-native';
import {COLORS} from '../../constans/COLORS';

const currencyContainer = (staticWidth: boolean): ViewStyle => {
  return {
    backgroundColor: COLORS.transparentGrey,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: staticWidth ? 88 : 'auto',
    borderRadius: 20,
  };
};

const textContainer = (staticWidth: boolean): TextStyle => {
  return {
    color: 'white',
    marginLeft: staticWidth ? 0 : 8,
  };
};

export const styles = {
  currencyContainer,
  textContainer,
};
