import { TextStyle, ViewStyle } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import { COLORS, SPECIFIC_COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

const wrapperContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 8,
  width: '100%',
};

const headerContainer: ViewStyle = {
  paddingBottom: 8,
};

const headerText: TextStyle = {
  fontSize: 20,
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
};

const durationtext: TextStyle = {
  fontSize: 12,
  color: COLORS.neutral,
  fontFamily: 'Jost-Regular',
  textAlign: 'center',
};

const progressContainer: ViewStyle = {
  width: 0.9 * WIDTH,
  backgroundColor: COLORS.darkNeutral,
  padding: 12,
  borderRadius: 16,
  overflow: 'hidden',
  marginTop: 16,
};

const leagueNamesContainer: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
};

const leagueGoalContainer: ViewStyle = {
  flex: 1,
};

const leagueNameText: TextStyle = {
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
};

const currentPointsContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
};

const currentPointsText: TextStyle = {
  color: COLORS.white,
  fontFamily: 'Jost-SemiBold',
  fontSize: 20,
};

const barContainer: ViewStyle = {
  backgroundColor: COLORS.darkNeutral,
  height: 50,
  marginTop: 12,
};

const barCanvas = (outerBarWidth: number): ViewStyle => ({
  width: outerBarWidth,
  height: 50,
});

const perkContainer: ViewStyle = {
  position: 'absolute',
  zIndex: 3,
  alignItems: 'center',
};

const perkShadeCanvas: ViewStyle = {
  width: '100%',
  height: '100%',
  transform: [{ rotate: '45deg' }],
  position: 'absolute',
  zIndex: 4,
};

const allLeaguesButton: ViewStyle = {
  paddingVertical: 8,
  width: '100%',
  marginTop: 16,
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: COLORS.mainBlue,
};

export const styles = {
  parentContainer,
  wrapperContainer,
  headerContainer,
  headerText,
  durationtext,
  progressContainer,
  leagueNamesContainer,
  leagueGoalContainer,
  leagueNameText,
  currentPointsContainer,
  currentPointsText,
  barContainer,
  barCanvas,
  perkContainer,
  perkShadeCanvas,
  allLeaguesButton,
};
