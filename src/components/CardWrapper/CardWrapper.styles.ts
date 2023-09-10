import { TextStyle, ViewStyle } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';

const container: ViewStyle = {
  width: WIDTH,
  borderRadius: 24,
  borderWidth: 2,
  borderColor: COLORS.semiDarkBlue,
  padding: 8,
};

export const styles = {
  container,
};
