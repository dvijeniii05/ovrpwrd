import { ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const barContainer: ViewStyle = {
  backgroundColor: COLORS.darkNeutral,
  height: 50,
  marginTop: 12,
};

const barCanvas = (outerBarWidth: number): ViewStyle => ({
  width: outerBarWidth,
  height: 50,
});

export const styles = {
  barCanvas,
  barContainer,
};
