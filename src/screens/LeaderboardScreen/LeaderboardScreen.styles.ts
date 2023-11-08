import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { HEIGHT, WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  height: HEIGHT,
  backgroundColor: COLORS.darkGrey,
  alignItems: 'center',
  paddingHorizontal: 16,
};

const shadedGradient: ImageStyle = {
  position: 'absolute',
  tintColor: COLORS.neutral,
};

const noiseGradient: ImageStyle = {
  position: 'absolute',
  opacity: 0.5,
  tintColor: COLORS.darkGrey,
};

const scrollContent: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 60,
};

const headerContainer = (marginTop: number): ViewStyle => ({
  marginTop,
  width: '100%',
});

const infoHeading: TextStyle = {
  width: '100%',
  marginTop: 40,
  color: COLORS.white,
  fontSize: 24,
  fontFamily: 'Jost-Regular',
};

const separator: ViewStyle = {
  height: 1,
  backgroundColor: COLORS.darkNeutral,
};

const cardContainer = (isTopFive: boolean): ViewStyle => ({
  backgroundColor: isTopFive ? COLORS.darkNeutral : COLORS.darkGrey,
  padding: 16,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 8,
  borderWidth: isTopFive ? 1 : 0,
  borderColor: COLORS.green,
});

const leftSideContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const text: TextStyle = {
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
  maxWidth: WIDTH * 0.4,
};

export const styles = {
  parentContainer,
  shadedGradient,
  noiseGradient,
  scrollContent,
  headerContainer,
  infoHeading,
  separator,
  cardContainer,
  leftSideContainer,
  text,
};
