import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.darkBlue,
  justifyContent: 'space-between',
  paddingHorizontal: 16,
};

const descriptionContainer: ViewStyle = {
  marginTop: 160,
  alignItems: 'center',
};

const descriptionWrapper: ViewStyle = {
  alignItems: 'center',
};

const descriptionHeading: TextStyle = {
  color: COLORS.white,
  fontSize: 28,
  fontFamily: 'Jost-Regular',
  textAlign: 'center',
};

const descriptionText: TextStyle = {
  ...descriptionHeading,
  marginTop: 40,
  fontSize: 20,
};

const button: ViewStyle = {
  bottom: 0,
};

export const styles = {
  parentContainer,
  descriptionContainer,
  descriptionWrapper,
  descriptionHeading,
  descriptionText,
  button,
};
