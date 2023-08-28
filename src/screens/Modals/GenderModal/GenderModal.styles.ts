import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../../constans/COLORS';

const headerContainer: ViewStyle = {
  alignItems: 'center',
};

const headerText: TextStyle = {
  fontSize: 28,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
};

export const styles = {
  headerContainer,
  headerText,
};
