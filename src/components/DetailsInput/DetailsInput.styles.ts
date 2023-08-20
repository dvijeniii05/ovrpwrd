import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  width: '100%',
};

const textInput: TextStyle = {
  fontSize: 18,
  fontFamily: 'Jost-Regular',
  paddingTop: 16,
  color: COLORS.white,
};

const divider: ViewStyle = {
  height: 2,
  backgroundColor: COLORS.neutral,
  marginTop: 16,
};

export const styles = {
  parentContainer,
  textInput,
  divider,
};
