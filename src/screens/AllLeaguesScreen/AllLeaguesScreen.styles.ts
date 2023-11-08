import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT } from '../../utils/dimension';

const scroll: ViewStyle = {
  height: HEIGHT,
  backgroundColor: COLORS.darkBlue,
};

const scrollContentContainer: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 60,
};

const bgImageContainer: ViewStyle = {
  width: '100%',
  height: 300,
  position: 'absolute',
};

const bgImage: ImageStyle = {
  resizeMode: 'cover',
};

const mainContentContainer: ViewStyle = {
  width: '100%',
};

const headerText = (marginTop: number): TextStyle => ({
  marginTop: marginTop,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
  fontSize: 54,
  fontWeight: '300',
  marginHorizontal: 16,
});

const leaguesContainer: ViewStyle = {
  gap: 8,
  flex: 1,
};

const errorContainer: ViewStyle = {
  height: 200,
  justifyContent: 'center',
  marginTop: 16,
};

export const styles = {
  scroll,
  scrollContentContainer,
  bgImageContainer,
  bgImage,
  mainContentContainer,
  headerText,
  leaguesContainer,
  errorContainer,
};
