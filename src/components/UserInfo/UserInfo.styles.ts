import {ViewStyle} from 'react-native';
import {WIDTH} from '../../utils/dimension';
import {COLORS} from '../../constans/COLORS';

const userInfoContainer = (topInset: number): ViewStyle => {
  return {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    backgroundColor: 'black',
    paddingTop: topInset + 10,
    paddingBottom: 30,
  };
};

const avatarFrame: ViewStyle = {
  width: 94,
  height: 94,
  borderRadius: 46,
  borderWidth: 3,
  borderColor: 'white',
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
};

const currencyContainer: ViewStyle = {
  flexDirection: 'row',
  marginTop: 8,
  alignItems: 'center',
};

const currency: ViewStyle = {
  backgroundColor: COLORS.transparentGrey,
  padding: 8,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: 40,
  width: 96,
  borderRadius: 20,
};

const divider: ViewStyle = {
  height: 16,
  width: 12,
  backgroundColor: COLORS.transparentGrey,
  marginHorizontal: -2,
};

export const styles = {
  userInfoContainer,
  avatarFrame,
  currencyContainer,
  currency,
  divider,
};
