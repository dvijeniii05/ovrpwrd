import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT, WIDTH } from '../../utils/dimension';

const parentContainer: ViewStyle = {
  height: HEIGHT,
  backgroundColor: COLORS.darkGrey,
  alignItems: 'center',
  paddingHorizontal: 16,
};

const productTag: ViewStyle = {
  marginRight: 16,
  paddingHorizontal: 8,
  paddingVertical: 4,
};

const headerContainer = (marginTop: number): ViewStyle => ({
  marginTop,
  width: '100%',
  marginBottom: 20,
});

const scrollContent: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 60,
};

const productImage: ImageStyle = {
  width: WIDTH - 32,
  aspectRatio: 1.5,
  borderRadius: 12,
};

const productBrandText: TextStyle = {
  fontSize: 14,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
  opacity: 0.4,
};

const productNameText: TextStyle = {
  fontSize: 32,
  fontFamily: 'Jost-Light',
  color: COLORS.white,
};

const productDescriptionText: TextStyle = {
  color: COLORS.white,
  marginTop: 32,
  fontFamily: 'Jost-Regular',
};

const productLinkButton: ViewStyle = {
  width: '100%',
  backgroundColor: COLORS.darkNeutral,
  marginTop: 24,
};

const productLinkText: TextStyle = {
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
  fontSize: 16,
};

const priceContainer: ViewStyle = {
  paddingHorizontal: 24,
  paddingVertical: 8,
  borderRadius: 12,
  backgroundColor: COLORS.darkNeutral,
  flexDirection: 'row',
  gap: 8,
  alignItems: 'center',
  justifyContent: 'center',
  width: 'auto',
  marginTop: 16,
};

const priceText: TextStyle = {
  fontSize: 20,
  color: COLORS.white,
  fontFamily: 'Jost-SemiBold',
};

export const styles = {
  parentContainer,
  productTag,
  headerContainer,
  scrollContent,
  productImage,
  productBrandText,
  productNameText,
  productDescriptionText,
  productLinkButton,
  productLinkText,
  priceContainer,
  priceText,
};
