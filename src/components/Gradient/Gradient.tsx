import { Image, ImageResizeMode, ImageStyle } from 'react-native';
import { styles } from './Gradient.styles';

interface Props {
  type: string;
  style?: ImageStyle;
  resizeMode?: ImageResizeMode;
}

const Gradient = (props: Props) => {
  const imagePicker = () => {
    switch (props.type) {
      case 'conical':
        return require('../../assets/FullGradient.png');
      case 'shaded':
        return require('../../assets/ShadedGradient.png');
      case 'legendary':
        return require('../../assets/LegendaryLeague.png');
      case 'mythical':
        return require('../../assets/MythicalLeague.png');
      case 'immortal':
        return require('../../assets/ImmortalLeague.png');
      case 'allLeagues':
        return require('../../assets/AllLeagues.png');
    }
  };

  return (
    <Image
      source={imagePicker()}
      style={[styles.main, props.style]}
      resizeMode={props.resizeMode ?? 'contain'}
    />
  );
};
export default Gradient;
