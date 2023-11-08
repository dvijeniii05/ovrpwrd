import { ViewStyle } from 'react-native';
import { COLORS } from '../../../constans/COLORS';
import { WIDTH, HEIGHT } from '../../../utils/dimension';

const loaderWrapper: ViewStyle = {
  width: WIDTH,
  height: HEIGHT,
  position: 'absolute',
  backgroundColor: COLORS.darkBlue,
  opacity: 0.9,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 5,
};

export const styles = {
  loaderWrapper,
};
