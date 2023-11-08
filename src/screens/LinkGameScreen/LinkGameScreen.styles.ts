import { ImageStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';

const parentContainer = (isModalOpen: boolean): ViewStyle => ({
  flex: 1,
  alignItems: 'center',
  backgroundColor: COLORS.darkBlue,
  opacity: isModalOpen ? 0.5 : 1,
});

const publisherContainer: ViewStyle = {
  marginTop: 130,
  alignItems: 'center',
};

const canvas: ViewStyle = {
  width: 360,
  height: 360,
  position: 'absolute',
  zIndex: 2,
};

const publisherImage: ImageStyle = {
  width: 360,
  height: 360,
  alignItems: 'center',
};

const publisherIcon: ViewStyle = {
  height: 64,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: -64,
  zIndex: 3,
};

export const styles = {
  parentContainer,
  canvas,
  publisherContainer,
  publisherImage,
  publisherIcon,
};
