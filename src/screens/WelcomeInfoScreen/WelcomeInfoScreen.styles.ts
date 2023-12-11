import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { WIDTH } from '../../utils/dimension';

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.darkBlue,
  alignItems: 'center',
  justifyContent: 'space-between',
};

const imageStyle = {
  marginTop: 16,
  width: WIDTH,
  aspectRatio: 1,
  height: undefined,
};

const textWrapper: ViewStyle = {
  alignItems: 'center',
  paddingHorizontal: 16,
};

const titleText: TextStyle = {
  color: 'white',
  fontSize: 28,
  fontFamily: 'Jost-SemiBold',
};

const descriptionText: TextStyle = {
  color: 'white',
  fontSize: 18,
  textAlign: 'center',
  marginTop: 24,
  fontFamily: 'Jost-Regular',
};

const buttonsWrapper: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: 16,
  gap: 16,
  width: '100%',
  justifyContent: 'center',
};

export const styles = {
  parentContainer,
  imageStyle,
  textWrapper,
  titleText,
  descriptionText,
  buttonsWrapper,
};
