import { ViewStyle } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';

const wrapperContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const progressContainer: ViewStyle = {
  width: 0.9 * WIDTH,
  backgroundColor: COLORS.blackTertiary,
  padding: 16,
  borderRadius: 16,
  overflow: 'hidden',
  marginTop: 8,
};

const leagueNamesContainer: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
};

const leagueGoalsContainer: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  marginTop: 4,
};

const barContainer: ViewStyle = {
  backgroundColor: COLORS.blackPrimary,
  height: 30,
  marginTop: 12,
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
};

const circlesCanvas = (outerBarWidth: number): ViewStyle => ({
  width: outerBarWidth,
  height: 24,
  zIndex: 2,
});

const barCanvas = (outerBarWidth: number): ViewStyle => ({
  width: outerBarWidth,
  height: 24,
  position: 'absolute',
  zIndex: 1,
  left: 26,
});
export const styles = {
  wrapperContainer,
  progressContainer,
  leagueNamesContainer,
  leagueGoalsContainer,
  barContainer,
  circlesCanvas,
  barCanvas,
};
