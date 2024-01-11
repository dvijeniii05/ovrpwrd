import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const giftsContainer: ViewStyle = {
  flexDirection: 'row',
  gap: 4,
  justifyContent: 'space-evenly',
  marginTop: 16,
};

const errorContainer: ViewStyle = {
  marginTop: 16,
  alignItems: 'center',
  gap: 8,
};

const errorText: TextStyle = {
  fontSize: 18,
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
  textAlign: 'center',
};

const informationText: TextStyle = {
  fontSize: 12,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
  opacity: 0.7,
  textAlign: 'center',
  marginTop: 8,
  fontWeight: '500',
};

export const styles = {
  giftsContainer,
  errorContainer,
  errorText,
  informationText,
};
