import { TextStyle, ViewStyle } from 'react-native';
import { COLORS, SPECIFIC_COLORS } from '../../constans/COLORS';

const tabsContainer = (isDisabled?: boolean): ViewStyle => ({
  backgroundColor: isDisabled
    ? COLORS.neutral
    : SPECIFIC_COLORS.tabButtonInactive,
  flexDirection: 'row',
  borderRadius: 6,
});

const tabsButtonText: TextStyle = {
  fontSize: 14,
  fontFamily: 'Jost-SemiBold',
  color: COLORS.white,
};

const tabsButton = (isActive: boolean, isDisabled?: boolean): ViewStyle => ({
  width: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  borderRadius: 6,
  paddingVertical: 6,
  backgroundColor: !isDisabled
    ? isActive
      ? COLORS.mainBlue
      : SPECIFIC_COLORS.tabButtonInactive
    : COLORS.neutral,
});

export const styles = {
  tabsButton,
  tabsContainer,
  tabsButtonText,
};
