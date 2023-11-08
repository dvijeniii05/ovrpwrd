import { Animated, TextStyle, ViewStyle } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  width: '100%',
};

const headerContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginRight: 16,
};

const headerText: TextStyle = {
  fontSize: 24,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
  marginLeft: 16,
};

const scrollStyle: ViewStyle = {
  width: '100%',
  paddingLeft: 16,
  marginTop: 24,
};

const noProductsContainer: ViewStyle = {
  width: '100%',
  padding: 40,
  justifyContent: 'center',
  alignItems: 'center',
};

const noProductsText: TextStyle = {
  color: 'white',
  fontFamily: 'Jost-SemiBold',
  fontSize: 20,
};

const scrollContentContainer = (itemWidth: number): ViewStyle => ({
  paddingRight: WIDTH - itemWidth,
  gap: 4,
});

const paginationContainer: ViewStyle = {
  flexDirection: 'row',
  gap: 10,
  width: '100%',
  justifyContent: 'center',
  marginTop: 24,
};

const paginationIndicator = (
  indicatorWidth: Animated.AnimatedInterpolation<string | number>,
  indicatorColor: Animated.AnimatedInterpolation<string | number>,
) => ({
  width: indicatorWidth,
  height: 10,
  borderRadius: 5,
  backgroundColor: indicatorColor,
});

export const styles = {
  parentContainer,
  headerContainer,
  headerText,
  scrollStyle,
  noProductsContainer,
  noProductsText,
  scrollContentContainer,
  paginationContainer,
  paginationIndicator,
};
