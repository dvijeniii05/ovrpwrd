import { TextStyle, ViewStyle } from 'react-native';
import { COLORS, SPECIFIC_COLORS } from '../../constans/COLORS';
import { WIDTH } from '../../utils/dimension';

const gapBetweenListItems = 8;

const wrapperContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 24,
  backgroundColor: COLORS.darkBlue,
  width: '100%',
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
  fontSize: 14,
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

const matchHistoryButton: ViewStyle = {
  paddingVertical: 8,
  width: '100%',
  marginTop: 16,
};

const giftsContainer: ViewStyle = {
  flexDirection: 'row',
  gap: 4,
  justifyContent: 'space-evenly',
  marginTop: 16,
};

export const styles = {
  wrapperContainer,
  tabsContainer,
  tabsButton,
  tabsButtonText,
  titleContainer,
  titleText,
  listViewPort,
  matchHistoryButton,
  giftsContainer,
};
