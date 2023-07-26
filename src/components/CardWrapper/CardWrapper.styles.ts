import { ViewStyle } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';

const container: ViewStyle = {
  width: WIDTH,
  backgroundColor: COLORS.blackPrimary,
  borderRadius: 24,
  borderWidth: 2,
  borderColor: COLORS.blackTertiary,
  padding: 8,
};

export const styles = {
  container,
};
