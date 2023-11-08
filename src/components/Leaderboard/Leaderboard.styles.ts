import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  width: '100%',
  marginTop: 40,
  paddingHorizontal: 16,
};

const headingContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 24,
};

const allUsersContainer: ViewStyle = {
  paddingHorizontal: 8,
  paddingVertical: 2,
  backgroundColor: COLORS.mainBlue,
  borderRadius: 100,
};

const boardParentContainer: ViewStyle = {
  backgroundColor: 'transparent',
  width: '100%',
};

const cardContainer = (isTopFive: boolean): ViewStyle => ({
  backgroundColor: isTopFive ? COLORS.darkNeutral : COLORS.darkGrey,
  padding: 16,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 8,
  borderWidth: isTopFive ? 1 : 0,
  borderColor: COLORS.green,
});

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
  headingContainer,
  allUsersContainer,
  boardParentContainer,
  cardContainer,
  leftSideContainer,
  text,
  seeMoreButton,
};
