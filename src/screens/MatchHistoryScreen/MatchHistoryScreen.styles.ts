import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { HEIGHT } from '../../utils/dimension';
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

const scroll: ViewStyle = {
  width: '100%',
};

const flatlistStyle: ViewStyle = {
  width: '100%',
  marginTop: 16,
};

const flatlistContainerStyle: ViewStyle = {
  gap: 8,
};

const errorContainer: ViewStyle = {
  justifyContent: 'center',
  height: HEIGHT,
};

const scrollContent: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 60,
};

const headerContainer = (marginTop: number): ViewStyle => ({
  marginTop,
  width: '100%',
});

const currencyTopContainer: ViewStyle = {
  flexDirection: 'row',
  backgroundColor: COLORS.darkNeutral,
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 16,
  borderTopRightRadius: 8,
  borderTopLeftRadius: 8,
};

const currencyBottomContainer: ViewStyle = {
  ...currencyTopContainer,
  borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8,
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
};

const currencyIconContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const currencyText: TextStyle = {
  fontSize: 20,
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
  marginLeft: 12,
  opacity: 0.4,
};

const currencyValueText: TextStyle = {
  ...currencyText,
  opacity: 1,
  marginLeft: 0,
};

const divider: ViewStyle = {
  height: 2,
  width: '100%',
  backgroundColor: 'transparent',
};

const infoHeading: TextStyle = {
  width: '100%',
  marginTop: 16,
  color: COLORS.white,
  fontSize: 24,
  fontFamily: 'Jost-Regular',
};

const singleMatchContainer: ViewStyle = {
  width: '100%',
  paddingVertical: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const heroImage: ImageStyle = {
  width: 24,
  aspectRatio: 1,
};

const kdaContainer: ViewStyle = {
  flexDirection: 'row',
  gap: 8,
};

const matchOutcomeContainer: ViewStyle = {
  flexDirection: 'row',
  minWidth: 52,
  gap: 4,
};

const gradientContainer: ViewStyle = {
  borderRadius: 6,
  overflow: 'hidden',
};

const gradient: ViewStyle = {
  alignItems: 'center',
};

const multiplierText: TextStyle = {
  color: COLORS.black,
  opacity: 1,
  paddingHorizontal: 6,
  fontFamily: 'Jost-Regular',
};

const kText: TextStyle = {
  color: COLORS.green,
  fontFamily: 'Jost-SemiBold',
  minWidth: 52,
  textAlign: 'center',
};

const dText: TextStyle = {
  ...kText,
  color: COLORS.red,
};

const aText: TextStyle = {
  ...kText,
  color: COLORS.white,
  opacity: 0.4,
};

const singleMatchPointsText: TextStyle = {
  color: COLORS.white,
  opacity: 0.4,
  fontFamily: 'Jost-Regular',
};

const winWrapper: ViewStyle = {
  minWidth: 40,
  alignItems: 'flex-end',
};

const winContainer: ViewStyle = {
  paddingHorizontal: 6,
  paddingVertical: 2,
  backgroundColor: COLORS.green,
  borderRadius: 6,
};

const lossContainer: ViewStyle = {
  paddingHorizontal: 6,
  paddingVertical: 2,
  backgroundColor: COLORS.red,
  borderRadius: 6,
};

const infoText: TextStyle = {
  fontFamily: 'Jost-Regular',
  color: 'black',
  fontSize: 12,
};

const separator: ViewStyle = {
  height: 1,
  backgroundColor: COLORS.darkNeutral,
};

export const styles = {
  parentContainer,
  shadedGradient,
  noiseGradient,
  headerContainer,
  scrollContent,
  scroll,
  flatlistStyle,
  flatlistContainerStyle,
  errorContainer,
  currencyTopContainer,
  currencyBottomContainer,
  currencyIconContainer,
  currencyText,
  currencyValueText,
  divider,
  infoHeading,
  singleMatchContainer,
  heroImage,
  kdaContainer,
  matchOutcomeContainer,
  gradient,
  gradientContainer,
  multiplierText,
  kText,
  dText,
  aText,
  singleMatchPointsText,
  winWrapper,
  winContainer,
  lossContainer,
  infoText,
  separator,
};
