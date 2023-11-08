import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const imageWidth = 160;

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.darkGrey,
  padding: 4,
  borderRadius: 16,
  alignItems: 'center',
};

const image: ImageStyle = {
  width: imageWidth,
  aspectRatio: 1.2,
  maxHeight: 130,
  borderRadius: 12,
  overflow: 'hidden',
};

const productTag: ViewStyle = {
  position: 'absolute',
  right: 12,
  top: 10,
};

const textContainer: ViewStyle = {
  marginTop: 16,
  marginHorizontal: 4,
};

const nameText: TextStyle = {
  color: COLORS.white,
  fontFamily: 'Jost-regular',
  fontSize: 18,
  width: imageWidth - 16,
};

const brandText: TextStyle = {
  ...nameText,
  opacity: 0.4,
  fontSize: 14,
};

const button = (isPurchasable: boolean, isOutOfStock?: boolean): ViewStyle => ({
  backgroundColor: isOutOfStock
    ? COLORS.neutral
    : isPurchasable
    ? COLORS.mainBlue
    : 'transparent',
  borderWidth: 1,
  borderColor: COLORS.mainBlue,
  marginTop: 16,
  paddingVertical: 8,
  marginHorizontal: 4,
  marginBottom: 4,
  width: '100%',
});

export const styles = {
  parentContainer,
  image,
  productTag,
  textContainer,
  nameText,
  brandText,
  button,
};
