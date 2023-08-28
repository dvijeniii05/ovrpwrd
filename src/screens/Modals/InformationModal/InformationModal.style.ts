import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../../constans/COLORS';

const parentContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
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
  wrapper,
  header,
  information,
};
