import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.darkBlue,
  paddingHorizontal: 16,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 24,
};

const headerText: TextStyle = {
  color: COLORS.white,
  fontSize: 22,
  fontFamily: 'Jost-SemiBold',
};

const descriptionText: TextStyle = {
  color: COLORS.white,
  fontSize: 16,
  fontFamily: 'Jost-Regualar',
  textAlign: 'center',
};

const button: ViewStyle = {
  marginTop: 40,
};

export const styles = {
  parentContainer,
  headerText,
  descriptionText,
  button,
};
