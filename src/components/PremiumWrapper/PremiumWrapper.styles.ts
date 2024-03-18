import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer = (isActive: boolean): ViewStyle => ({
  flexDirection: 'row',
  backgroundColor: COLORS.semiDarkBlue,
  borderRadius: 25,
  width: isActive ? 90 : 80,
  alignItems: 'center',
  justifyContent: 'center',
  gap: isActive ? 0 : 8,
  overflow: 'hidden',
  paddingVertical: 8,
});

const gardientLottie: ViewStyle = {
  width: 80,
  height: 50,
  position: 'absolute',
};

const loaderLottie: ViewStyle = {
  width: 24,
  height: 24,
};

const text: TextStyle = {
  color: COLORS.white,
  fontFamily: 'Jost-SemiBold',
  paddingVertical: 0,
};

const activeText: TextStyle = {
  ...text,
  color: COLORS.neonGreen,
};

const errorText: TextStyle = {
  ...text,
  color: COLORS.red,
};

export const styles = {
  parentContainer,
  gardientLottie,
  loaderLottie,
  text,
  activeText,
  errorText,
};
