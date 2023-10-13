import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.darkGrey,
  padding: 4,
  borderRadius: 16,
};

const image: ImageStyle = {
  width: '100%',
  aspectRatio: 1.4,
  borderRadius: 12,
  overflow: 'hidden',
};

const prizeTag = (isPremium: boolean): ViewStyle => ({
  position: 'absolute',
  right: 12,
  top: 10,
  paddingHorizontal: 6,
  paddingVertical: 2,
  backgroundColor: isPremium ? COLORS.orange : COLORS.green,
  borderRadius: 4,
});

const prizeTagText: TextStyle = {
  color: COLORS.black,
  fontSize: 10,
  fontFamily: 'Jost-SemiBold',
};

const textContainer: ViewStyle = {
  marginTop: 16,
  marginHorizontal: 4,
};

const nameText: TextStyle = {
  color: COLORS.white,
  fontFamily: 'Jost-regular',
  fontSize: 18,
};

const brandText: TextStyle = {
  ...nameText,
  opacity: 0.4,
  fontSize: 14,
};

const button: ViewStyle = {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: COLORS.mainBlue,
  marginTop: 16,
  paddingVertical: 8,
  marginHorizontal: 4,
  marginBottom: 4,
};

export const styles = {
  parentContainer,
  image,
  prizeTag,
  prizeTagText,
  textContainer,
  nameText,
  brandText,
  button,
};
