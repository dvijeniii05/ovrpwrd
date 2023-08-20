import { Image, ImageStyle } from 'react-native';
import { styles } from './Gradient.styles';

interface Props {
  type: string;
  style?: ImageStyle;
}

const Gradient = (props: Props) => {
  const imagePicker = () => {
    switch (props.type) {
      case 'conical':
        return require('../../assets/FullGradient.png');
      case 'shaded':
        return require('../../assets/ShadedGradient.png');
    }
  };

  return (
    <Image
      source={imagePicker()}
      style={[styles.main, props.style]}
      resizeMode="contain"
    />
  );
};
export default Gradient;
