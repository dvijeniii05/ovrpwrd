import {TextStyle, ViewStyle} from 'react-native';
import {HEIGHT, WIDTH} from '../../utils/dimension';

const parentContainer: ViewStyle = {
  position: 'absolute',
  backgroundColor: 'black',
  width: WIDTH,
  height: HEIGHT,
  zIndex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0.95,
};

const indicatorContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const textContainer: TextStyle = {
  marginTop: 10,
  fontSize: 16,
  color: 'green',
};

export const styles = {
  parentContainer,
  indicatorContainer,
  textContainer,
};
