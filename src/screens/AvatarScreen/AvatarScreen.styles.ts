import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.darkBlue,
  alignItems: 'center',
  paddingHorizontal: 16,
};

const headingContainer = (headerHeight: number): ViewStyle => ({
  flexDirection: 'row',
  gap: 8,
  width: '100%',
  marginTop: headerHeight,
});

const headingText = (color: string): TextStyle => ({
  color: color,
  fontSize: 28,
  fontFamily: 'Jost-Regular',
});

export const styles = {
  parentContainer,
  headingContainer,
  headingText,
};
