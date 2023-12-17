import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT } from '../../utils/dimension';

const parentContainer = (bottomSafeArea: number): ViewStyle => ({
  height: HEIGHT,
  backgroundColor: COLORS.darkBlue,
  alignItems: 'center',
  paddingBottom: bottomSafeArea,
});

const editButton: ViewStyle = {
  backgroundColor: COLORS.darkBlue,
  borderWidth: 1,
  borderColor: COLORS.mainBlue,
  paddingVertical: 8,
  marginTop: 16,
  width: '100%',
  paddingHorizontal: 20,
};

const noPurchaseText: TextStyle = {
  marginTop: 40,
  fontSize: 16,
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
  textAlign: 'center',
};

const purchaseParentContent: ViewStyle = {
  width: '100%',
  flex: 1,
  marginTop: 16,
  paddingHorizontal: 16,
};

const purchaseHeadingText: TextStyle = {
  fontSize: 24,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
};

const singlePurchaseContainer: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  paddingVertical: 16,
  alignItems: 'center',
  justifyContent: 'space-between',
};

const brandText: TextStyle = {
  maxWidth: 100,
  color: COLORS.white,
  opacity: 0.4,
};

const productNameText: TextStyle = {
  ...brandText,
  opacity: 1,
  fontSize: 14,
};

const priceContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: COLORS.darkNeutral,
  paddingVertical: 4,
  paddingHorizontal: 6,
  borderRadius: 8,
  gap: 2,
};

const priceText: TextStyle = {
  fontSize: 12,
  color: COLORS.white,
  fontFamily: 'Jost-SemiBold',
};

const separator: ViewStyle = {
  height: 1,
  width: '100%',
  backgroundColor: COLORS.darkNeutral,
};

export const styles = {
  parentContainer,
  editButton,
  noPurchaseText,
  purchaseParentContent,
  purchaseHeadingText,
  singlePurchaseContainer,
  brandText,
  productNameText,
  priceContainer,
  priceText,
  separator,
};
