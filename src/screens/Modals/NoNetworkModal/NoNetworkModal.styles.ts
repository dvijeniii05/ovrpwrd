import { TextStyle, ViewStyle } from 'react-native';
import { HEIGHT, WIDTH } from '../../../utils/dimension';
import { COLORS } from '../../../constans/COLORS';

const modalBackgroundContainer: ViewStyle = {
  backgroundColor: 'rgba(0,0,0,0.4)',
  height: HEIGHT,
  width: WIDTH,
};

const modalContentContainer = (bottomPadding: number): ViewStyle => ({
  backgroundColor: COLORS.darkGrey,
  width: WIDTH,
  flex: 1,
  position: 'absolute',
  bottom: 0,
  paddingBottom: bottomPadding + 20,
  padding: 16,
  alignItems: 'center',
  justifyContent: 'space-between',
});

const headerText: TextStyle = {
  fontSize: 28,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
};

const descriptionText: TextStyle = {
  fontSize: 16,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
  marginTop: 20,
  textAlign: 'center',
};

export const styles = {
  modalBackgroundContainer,
  modalContentContainer,
  headerText,
  descriptionText,
};
