import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../../constans/COLORS';

const headerText: TextStyle = {
  fontSize: 28,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
};

const yearsContainer: ViewStyle = {
  marginTop: 40,
};

const yearsContentContainer: ViewStyle = {
  gap: 40,
  paddingRight: 16,
};

const yearsOrMonthsButton: ViewStyle = {
  paddingVertical: 16,
};

const yearsText = (isSelected: boolean): TextStyle => ({
  ...headerText,
  color: isSelected ? COLORS.white : COLORS.neutral,
});

const monthsContainer: ViewStyle = {};

const monthsContentContainer: ViewStyle = {
  ...yearsContentContainer,
  gap: 24,
};

const monthsText = (isSelected: boolean): TextStyle => ({
  ...headerText,
  color: isSelected ? COLORS.white : COLORS.neutral,
  fontSize: 20,
});

const daysContainer: ViewStyle = {
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: 40,
};

const dayButton = (isSelected: boolean): ViewStyle => ({
  height: 48,
  width: 48,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: isSelected ? COLORS.mainBlue : 'transparent',
  borderRadius: 8,
});

const dayText: TextStyle = {
  fontSize: 18,
  fontFamily: 'Jost-Medium',
  color: COLORS.white,
};

export const styles = {
  headerText,
  yearsContainer,
  yearsContentContainer,
  yearsOrMonthsButton,
  yearsText,
  monthsContainer,
  monthsContentContainer,
  monthsText,
  daysContainer,
  dayButton,
  dayText,
};
