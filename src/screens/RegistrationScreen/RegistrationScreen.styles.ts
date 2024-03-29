import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const scroll: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.darkBlue,
  height: '100%',
};

const scrollContentContainer: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 16,
  alignItems: 'center',
};

const headingContainer = (headerHeight: number): ViewStyle => ({
  marginTop: headerHeight,
  flexDirection: 'row',
  gap: 8,
  width: '100%',
});

const headingText = (color: string): TextStyle => ({
  color: color,
  fontSize: 28,
  fontFamily: 'Jost-Regular',
});

export const styles = {
  scroll,
  scrollContentContainer,
  headingContainer,
  headingText,
};
