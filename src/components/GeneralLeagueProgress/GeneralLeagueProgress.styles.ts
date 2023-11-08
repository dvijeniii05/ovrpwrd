import { TextStyle, ViewStyle } from 'react-native';
import { COLORS, SPECIFIC_COLORS } from '../../constans/COLORS';

const topContentContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const generalText: TextStyle = {
  color: 'white',
  fontFamily: 'Jost-Regular',
  fontSize: 20,
};

const generalSmallText: TextStyle = {
  ...generalText,
  fontSize: 14,
};

const greySmallText: TextStyle = {
  ...generalText,
  opacity: 0.5,
  fontSize: 12,
  fontWeight: '500',
};

const userCountContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
};

const progressMainContainer: ViewStyle = {
  width: '100%',
  minHeight: 100,
  backgroundColor: COLORS.darkNeutral,
  padding: 12,
  borderRadius: 16,
  marginTop: 16,
  paddingBottom: 16,
};

const progressPerksContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const bar: ViewStyle = {
  backgroundColor: SPECIFIC_COLORS.leagueBarBackground,
  marginTop: 12,
  borderRadius: 30,
  overflow: 'hidden',
  height: 30,
};

export const styles = {
  topContentContainer,
  generalText,
  generalSmallText,
  greySmallText,
  userCountContainer,
  progressMainContainer,
  progressPerksContainer,
  bar,
};
