import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.darkBlue,
  alignItems: 'center',
};

const logo: ViewStyle = {
  position: 'absolute',
  top: 130,
};

const heading: TextStyle = {
  fontSize: 36,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
  marginTop: 58,
};

const buttonsContainer: ViewStyle = {
  paddingHorizontal: 16,
  flex: 1,
  width: '100%',
  alignItems: 'center',
  marginTop: 48,
  gap: 16,
};

export const styles = {
  parentContainer,
  logo,
  heading,
  buttonsContainer,
};
