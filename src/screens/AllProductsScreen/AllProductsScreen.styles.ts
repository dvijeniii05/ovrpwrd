import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT } from '../../utils/dimension';

const parentContainer: ViewStyle = {
  height: HEIGHT,
  backgroundColor: COLORS.darkBlue,
  alignItems: 'center',
};

const headerContainer = (marginTop: number): ViewStyle => ({
  marginTop,
  width: '100%',
  marginBottom: 20,
});

const headerText: TextStyle = {
  fontSize: 36,
  fontFamily: 'Jost-Light',
  color: COLORS.white,
};

export const styles = {
  parentContainer,
  headerContainer,
  headerText,
};
