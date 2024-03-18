import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT, WIDTH } from '../../utils/dimension';

const scroll: ViewStyle = {
  backgroundColor: COLORS.darkBlue,
  paddingHorizontal: 16,
  height: HEIGHT,
};

const scrollContent: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 40,
};

const descriptionContainer: ViewStyle = {
  marginTop: 48,
  alignItems: 'center',
  height: '100%',
  width: '100%',
  gap: 40,
};

const descriptionWrapper: ViewStyle = {
  alignItems: 'center',
  gap: 16,
};

const descriptionHeading: TextStyle = {
  color: COLORS.white,
  fontSize: 28,
  fontFamily: 'Jost-SemiBold',
  textAlign: 'center',
  padding: 16,
  width: WIDTH * 0.7,
};

const descriptionText: TextStyle = {
  fontFamily: 'Jost-Regular',
  marginTop: 16,
  fontSize: 18,
  color: COLORS.white,
  textAlign: 'center',
};

const buttonsContainer: ViewStyle = {
  gap: 24,
};

const button: ViewStyle = {
  bottom: 0,
};

const transparentButton: ViewStyle = {
  backgroundColor: 'transparent',
};
const imageStyle = {
  marginTop: 16,
  width: WIDTH,
  aspectRatio: 1,
  height: undefined,
};

export const styles = {
  scroll,
  scrollContent,
  descriptionContainer,
  descriptionWrapper,
  descriptionHeading,
  descriptionText,
  button,
  transparentButton,
  buttonsContainer,
  imageStyle,
};
