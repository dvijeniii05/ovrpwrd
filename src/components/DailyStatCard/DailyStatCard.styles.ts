import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { WIDTH } from '../../utils/dimension';

const gapBetweenListItems = 8;

const wrapperContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const titleContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: 8,
  marginTop: 8,
};

const titleText: TextStyle = {
  color: COLORS.white,
  fontSize: 20,
  fontFamily: 'Jost-SemiBold',
};

const statsParentContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  backgroundColor: COLORS.blackTertiary,
  borderRadius: 16,
  marginVertical: 16,
  paddingBottom: 16,
  paddingHorizontal: 16,
};

const listViewPort: ViewStyle = {
  width: WIDTH * 0.9 + gapBetweenListItems,
  marginTop: 4,
};

const itemWrapper: ViewStyle = {
  width: '100%',
  flex: 1,
  alignItems: 'center',
  paddingVertical: 8,
  paddingHorizontal: gapBetweenListItems * 0.5,
};

const itemContainer: ViewStyle = {
  width: WIDTH * 0.9,
  backgroundColor: COLORS.blackTertiary,
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
};

const kdaContainer: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  backgroundColor: COLORS.blackPrimary,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingHorizontal: 32,
  paddingVertical: 8,
  marginTop: 16,
};

const kdaSeparator: ViewStyle = {
  width: 2,
  height: 40,
  backgroundColor: COLORS.transparentWhite,
};

const individualKdaBox: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const kdaNumberText: TextStyle = {
  color: 'white',
  fontSize: 24,
  fontFamily: 'Jost-Regular',
};

const kdaText: TextStyle = {
  ...kdaNumberText,
  color: COLORS.transparentWhite,
  fontSize: 14,
};

const imageContainer: ViewStyle = {
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: -2,
  borderRadius: 16,
  borderWidth: 8,
  backgroundColor: COLORS.blackPrimary,
};

export const styles = {
  wrapperContainer,
  titleContainer,
  titleText,
  statsParentContainer,
  listViewPort,
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
  imageContainer,
};
