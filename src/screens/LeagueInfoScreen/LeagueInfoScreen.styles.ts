import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT } from '../../utils/dimension';

const scroll: ViewStyle = {
  height: HEIGHT,
  backgroundColor: COLORS.darkBlue,
};

const scrollContentContainer: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 80,
};

const gradientWrapper = (topInset: number): ViewStyle => ({
  position: 'absolute',
  top: topInset + 8,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

const participantsContainer = (marginTop: number): ViewStyle => ({
  marginTop: marginTop,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  paddingRight: 10,
  borderRadius: 16,
  gap: 8,
});

const participantsText: Text = {
  fontFamily: 'Jost-Regular',
  color: COLORS.white,
};

const prizesContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  paddingHorizontal: 8,
  marginTop: 8,
};

const prizesHeaderText: TextStyle = {
  color: COLORS.white,
  fontSize: 20,
  fontFamily: 'Jost-Regular',
  textAlign: 'center',
};

const prizeDescriptionContainer: TextStyle = {
  width: '100%',
  flexDirection: 'row',
  gap: 4,
  marginTop: 16,
  justifyContent: 'center',
};

const winnerHeaderText: TextStyle = {
  ...prizesHeaderText,
};

const winnerAvatarContainer: ViewStyle = {
  ...prizeDescriptionContainer,
  justifyContent: 'center',
  marginTop: 58,
};

export const styles = {
  scroll,
  scrollContentContainer,
  gradientWrapper,
  participantsContainer,
  participantsText,
  prizesContainer,
  prizesHeaderText,
  prizeDescriptionContainer,
  winnerHeaderText,
  winnerAvatarContainer,
};
