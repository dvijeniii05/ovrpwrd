import { ViewStyle } from 'react-native';
import { HEIGHT, WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';

const generalCard: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: WIDTH,
  backgroundColor: 'yellow',
  height: 150,
};

const scroll: ViewStyle = {
  height: HEIGHT,
  backgroundColor: COLORS.darkBlue,
};

const scrollContentContainer: ViewStyle = {
  alignItems: 'center',
};

export const styles = {
  generalCard,
  scroll,
  scrollContentContainer,
};
