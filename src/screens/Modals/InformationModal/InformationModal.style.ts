import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../../constans/COLORS';
import { WIDTH, HEIGHT } from '../../../utils/dimension';

const parentContainer: ViewStyle = {
  width: WIDTH,
  height: HEIGHT,
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,.5)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 5,
};
const modalcontainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,.5)',
};

const wrapper: ViewStyle = {
  backgroundColor: COLORS.darkNeutral,
  padding: 24,
  marginHorizontal: 16,
  borderRadius: 16,
};

const header: TextStyle = {
  fontSize: 28,
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
};

const information: TextStyle = {
  fontSize: 18,
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
};

export const styles = {
  parentContainer,
  modalcontainer,
  wrapper,
  header,
  information,
};
