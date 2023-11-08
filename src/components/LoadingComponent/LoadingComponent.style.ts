import { ViewStyle } from 'react-native';
import { HEIGHT, WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
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
  parentContainer,
};
