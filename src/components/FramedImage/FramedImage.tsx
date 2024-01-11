import { View, Image, ViewStyle, ImageProps } from 'react-native';
import GreenFrame from '../../assets/GreenFrame.svg';
import PremiumFrame from '../../assets/PremiumFrame.svg';
import BlueFrame from '../../assets/BlueFrame.svg';
import WhiteFrame from '../../assets/WhiteFrame.svg';
import { heroIconPicker } from '../../utils/heroIconPicker';
import { styles } from './FramedImage.styles';

interface Props {
  avatar: string;
  frameColor: string;
  frameSize?: {
    width: number;
    height: number;
  };
  style?: ViewStyle;
  isOverflowHidden?: boolean;
}

const FramedImage = (props: Props) => {
  const avatarLocation = () => {
    switch (props.avatar) {
      case '1':
        return require('../../assets/icons/Avatar1.png');
      case '2':
        return require('../../assets/icons/Avatar2.png');
      case '3':
        return require('../../assets/icons/Avatar3.png');
      case '4':
        return require('../../assets/icons/Avatar4.png');
      case '5':
        return require('../../assets/icons/Avatar5.png');
      case '6':
        return require('../../assets/icons/Avatar6.png');
      case '7':
        return require('../../assets/icons/Avatar7.png');
      case '8':
        return require('../../assets/icons/Avatar8.png');
      case '9':
        return require('../../assets/icons/Avatar9.png');
      default: {
        return heroIconPicker(props.avatar);
      }
    }
  };

  const frame = () => {
    switch (props.frameColor) {
      case 'green':
        return <GreenFrame />;
      case 'blue':
        return (
          <BlueFrame
            width={props.frameSize?.width ?? 95}
            height={props.frameSize?.height ?? 100}
          />
        );
      case 'white':
        return <WhiteFrame />;
      case 'premium':
        return <PremiumFrame />;
    }
  };

  return (
    <View style={[styles.parentContainer(props.isOverflowHidden), props.style]}>
      {frame()}
      <Image
        source={avatarLocation()}
        style={styles.image(props.frameColor === 'blue')}
        resizeMode="contain"
      />
    </View>
  );
};

export default FramedImage;
