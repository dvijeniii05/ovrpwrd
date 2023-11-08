import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT } from '../../utils/dimension';

const scroll: ViewStyle = {
  height: HEIGHT,
  backgroundColor: COLORS.darkBlue,
};

const scrollContentContainer: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 80,
  //   paddingHorizontal: 16,
};

const headerContainer = (marginTop: number): ViewStyle => ({
  marginTop,
  width: '100%',
  paddingHorizontal: 16,
});

const headerText: TextStyle = {
  fontSize: 56,
  fontFamily: 'Jost-Light',
  color: COLORS.white,
};

export const styles = {
  scroll,
  scrollContentContainer,
  headerContainer,
  headerText,
};
