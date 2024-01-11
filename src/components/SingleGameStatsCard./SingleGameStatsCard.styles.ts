import { ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { WIDTH } from '../../utils/dimension';

const gapBetweenListItems = 8;

const itemWrapper: ViewStyle = {
  width: '100%',
  flex: 1,
  alignItems: 'center',
  marginTop: 16,
  paddingVertical: 8,
  paddingHorizontal: gapBetweenListItems * 0.5,
};

const itemContainer: ViewStyle = {
  width: WIDTH * 0.85,
  backgroundColor: COLORS.darkNeutral,
  padding: 16,
  borderRadius: 16,
  marginTop: 16,
};

const currencyContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const infoContainer: ViewStyle = {
  alignItems: 'center',
  marginTop: 8,
};

const infoText: TextStyle = {
  fontFamily: 'Jost-Regular',
  color: 'black',
  fontSize: 10,
};

const kdaContainer: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  backgroundColor: COLORS.darkGrey,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'space-evenly',
  paddingVertical: 16,
  marginTop: 16,
};

const kdaSeparator: ViewStyle = {
  width: 2,
  height: 40,
  backgroundColor: COLORS.neutral,
};

const individualKdaBox: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '30%',
};

const kdaNumberText: TextStyle = {
  color: COLORS.white,
  fontSize: 24,
  fontFamily: 'Jost-Regular',
};

const kdaText: TextStyle = {
  ...kdaNumberText,
  color: COLORS.neutral,
  fontSize: 14,
};

const outcomeContainer = (isWin: boolean): ViewStyle => ({
  paddingHorizontal: 6,
  paddingVertical: 2,
  backgroundColor: isWin ? COLORS.green : COLORS.red,
  borderRadius: 6,
});

const imageContainer: ViewStyle = {
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -20,
  borderRadius: 45,
  width: 100,
  height: 100,
};

const canvas: ViewStyle = {
  position: 'absolute',
  zIndex: 6,
  width: '100%',
  height: '100%',
};

export const styles = {
  itemWrapper,
  itemContainer,
  currencyContainer,
  infoContainer,
  infoText,
  individualKdaBox,
  kdaContainer,
  kdaSeparator,
  kdaNumberText,
  kdaText,
  outcomeContainer,
  imageContainer,
  canvas,
};
