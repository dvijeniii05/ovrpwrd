import { ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { WIDTH } from '../../utils/dimension';

const gapBetweenListItems = 8;

const itemWrapper: ViewStyle = {
  width: '100%',
  flex: 1,
  alignItems: 'center',
  marginTop: 16,
  paddingHorizontal: gapBetweenListItems * 0.5,
};

const itemContainer: ViewStyle = {
  width: WIDTH * 0.85,
  backgroundColor: COLORS.darkNeutral,
  padding: 16,
  borderRadius: 16,
};

const currencyContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const noGameContainer: ViewStyle = {
  padding: 8,
  alignItems: 'center',
  marginTop: 16,
};

const noGameText: TextStyle = {
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
  fontSize: 16,
  textAlign: 'center',
};

export const styles = {
  itemWrapper,
  itemContainer,
  currencyContainer,
  noGameContainer,
  noGameText,
};
