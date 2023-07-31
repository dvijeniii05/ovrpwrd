import { TextStyle, ViewStyle } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';

const container: ViewStyle = {
  width: WIDTH,
  backgroundColor: COLORS.blackPrimary,
  borderRadius: 24,
  borderWidth: 2,
  borderColor: COLORS.blackTertiary,
  padding: 8,
};

const headingContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: 8,
  marginTop: 8,
};

const headingText: TextStyle = {
  color: COLORS.white,
  fontSize: 20,
  fontFamily: 'Jost-SemiBold',
};

const leagueEndsContainer: ViewStyle = {
  width: '100%',
  paddingHorizontal: 8,
};

const leagueEndsText: TextStyle = {
  color: COLORS.transparentWhite,
  fontSize: 12,
};
export const styles = {
  container,
  headingContainer,
  headingText,
  leagueEndsContainer,
  leagueEndsText,
};
