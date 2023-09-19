import { TextStyle, ViewStyle } from 'react-native';
import { COLORS, SPECIFIC_COLORS } from '../../constans/COLORS';
import { WIDTH } from '../../utils/dimension';

const gapBetweenListItems = 8;

const wrapperContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 24,
  backgroundColor: COLORS.darkBlue,
  width: '97%',
};

const tabsContainer: ViewStyle = {
  backgroundColor: SPECIFIC_COLORS.tabButtonInactive,
  flexDirection: 'row',
  borderRadius: 6,
};

const tabsButton = (isActive: boolean): ViewStyle => ({
  width: '50%',
  alignItems: 'center',
  borderRadius: 6,
  paddingVertical: 6,
  backgroundColor: isActive
    ? COLORS.mainBlue
    : SPECIFIC_COLORS.tabButtonInactive,
});

const tabsButtonText: TextStyle = {
  fontSize: 12,
  fontFamily: 'Jost-SemiBold',
  color: COLORS.white,
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

const listViewPort: ViewStyle = {
  width: WIDTH * 0.85 + gapBetweenListItems,
  marginTop: 4,
};

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

const imageContainer: ViewStyle = {
  position: 'absolute',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: -4,
  borderRadius: 16,
  borderWidth: 10,
  backgroundColor: COLORS.darkBlue,
  borderColor: COLORS.darkBlue,
  width: 90,
  height: 70,
};

export const styles = {
  wrapperContainer,
  tabsContainer,
  tabsButton,
  tabsButtonText,
  titleContainer,
  titleText,
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
