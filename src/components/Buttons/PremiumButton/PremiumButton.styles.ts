import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../../constans/COLORS';

const parentContainer: ViewStyle = {
  backgroundColor: COLORS.darkBlue,
  width: 220,
  height: 90,
  alignItems: 'center',
};

const contentContainer: ViewStyle = {
  position: 'absolute',
  width: 180,
  height: 50,
  zIndex: 4,
  top: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
};

const text: TextStyle = {
  color: COLORS.neonGreen,
  fontFamily: 'Jost-SemiBold',
  fontSize: 16,
};

const canvas: ViewStyle = {
  width: 220,
  height: 90,
  backgroundColor: 'transaprent',
  zIndex: 3,
};

export const styles = {
  parentContainer,
  contentContainer,
  text,
  canvas,
};
