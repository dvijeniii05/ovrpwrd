import { View, Image } from 'react-native';
import GreenFrame from '../../assets/GreenFrame.svg';
import BlueFrame from '../../assets/BlueFrame.svg';
import WhiteFrame from '../../assets/WhiteFrame.svg';

interface Props {
  avatar: string;
  frameColor: string;
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
    }
  };

  const frame = () => {
    switch (props.frameColor) {
      case 'green':
        return <GreenFrame />;
      case 'blue':
        return <BlueFrame />;
      case 'white':
        return <WhiteFrame />;
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {frame()}
      <Image
        source={avatarLocation()}
        style={{ position: 'absolute', height: '90%' }}
        resizeMode="contain"
      />
    </View>
  );
};

export default FramedImage;