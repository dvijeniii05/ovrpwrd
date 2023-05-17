import {ImageStyle, TextStyle, ViewStyle} from 'react-native/types';
import {WIDTH} from '../../utils/dimension';

const parentContainer: ViewStyle = {
  width: WIDTH * 0.8,
  height: WIDTH * 0.6,
  borderRadius: 20,
  borderColor: 'green',
  borderWidth: 3,
};

const innerWrapper: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 10,
};

const eligibleDot = (enoughPoints: boolean): ViewStyle => {
  return {
    backgroundColor: enoughPoints ? 'green' : 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    right: 15,
    top: 15,
  };
};

const imageStyle: ImageStyle = {
  width: 100,
  height: 100,
};

const generalText: TextStyle = {
  textAlign: 'center',
  color: 'white',
};

export const styles = {
  parentContainer,
  innerWrapper,
  eligibleDot,
  imageStyle,
  generalText,
};
