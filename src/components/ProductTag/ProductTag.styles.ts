import { ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const prizeTag = (isPremium: boolean): ViewStyle => ({
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

export const styles = {
  prizeTag,
  prizeTagText,
};
