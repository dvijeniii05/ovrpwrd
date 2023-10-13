import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  gap: 4,
  marginTop: 16,
  justifyContent: 'center',
};

const contentWrapper: ViewStyle = {
  backgroundColor: COLORS.darkNeutral,
  width: '100%',
  padding: 12,
  paddingTop: 21,
  borderRadius: 16,
};

const headerContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const winnerNameText: TextStyle = {
  textAlign: 'center',
  marginTop: 32,
  marginBottom: 16,
  fontSize: 20,
  color: COLORS.white,
  fontFamily: 'Jost-Regular',
};

const prizeContainer: ViewStyle = {
  width: '100%',
  backgroundColor: COLORS.darkGrey,
  padding: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 8,
};

const prizeImage: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
};

const winnerAvatarContainer: ViewStyle = {
  position: 'absolute',
  marginTop: -50,
  justifyContent: 'center',
  alignItems: 'center',
};

const headerText: TextStyle = {
  fontSize: 12,
  fontFamily: 'Jost-Regular',
  color: COLORS.neutral,
};

const tag: ViewStyle = {
  paddingHorizontal: 6,
  paddingVertical: 2,
  backgroundColor: COLORS.green,
  borderRadius: 4,
};

const prizeText: TextStyle = {
  fontSize: 12,
  fontFamily: 'Jost-Regular',
  color: COLORS.green,
};

const prizeNameText: TextStyle = {
  fontSize: 18,
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
};

const prizeRetailText: TextStyle = {
  ...prizeText,
  color: COLORS.white,
  opacity: 0.4,
};

const prizeValueText: TextStyle = {
  ...prizeText,
  color: COLORS.white,
};

export const styles = {
  parentContainer,
  contentWrapper,
  headerContainer,
  winnerNameText,
  prizeContainer,
  prizeImage,
  winnerAvatarContainer,
  headerText,
  tag,
  prizeText,
  prizeNameText,
  prizeRetailText,
  prizeValueText,
};
