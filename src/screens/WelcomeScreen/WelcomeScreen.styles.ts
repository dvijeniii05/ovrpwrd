import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { WIDTH } from '../../utils/dimension';

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.darkBlue,
  justifyContent: 'space-between',
  paddingHorizontal: 16,
};

const descriptionContainer: ViewStyle = {
  marginTop: 80,
  alignItems: 'center',
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
};

const descriptionText: TextStyle = {
  fontFamily: 'Jost-Regular',
  marginTop: 8,
  fontSize: 18,
  color: COLORS.white,
  textAlign: 'center',
};

const button: ViewStyle = {
  bottom: 0,
};

const imageStyle = {
  marginTop: 16,
  width: WIDTH,
  aspectRatio: 1,
  height: undefined,
};

export const styles = {
  parentContainer,
  descriptionContainer,
  descriptionWrapper,
  descriptionHeading,
  descriptionText,
  button,
  imageStyle,
};
