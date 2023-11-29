import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  width: '100%',
};

const inputContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const textInput: TextStyle = {
  fontSize: 18,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
  flex: 1,
  paddingVertical: 16,
};

const profanityText: TextStyle = {
  color: COLORS.red,
  marginTop: 8,
  fontFamily: 'Jost-Regular',
};

export const styles = {
  parentContainer,
  inputContainer,
  textInput,
  profanityText,
};
