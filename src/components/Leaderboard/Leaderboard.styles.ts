import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  backgroundColor: 'transparent',
  width: '100%',
};

const cardContainer: ViewStyle = {
  backgroundColor: COLORS.darkGrey,
  padding: 16,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 8,
};

const leftSideContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const text: TextStyle = {
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
};

const seeMoreButton: ViewStyle = {
  paddingVertical: 8,
  marginTop: 24,
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: COLORS.mainBlue,
};

export const styles = {
  parentContainer,
  cardContainer,
  leftSideContainer,
  text,
  seeMoreButton,
};
