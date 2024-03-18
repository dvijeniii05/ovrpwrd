import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './StandardButton.styles';
import Apple from '../../../assets/icons/apple.svg';
import Google from '../../../assets/icons/google.svg';
import RoundChevronRight from '../../../assets/icons/round-chevron-right.svg';
import RoundChevronRightDark from '../../../assets/icons/round-chevron-right-dark.svg';
import WebIcon from '../../../assets/icons/web.svg';
import LockIcon from '../../../assets/icons/lock.svg';
import RelicIcon from '../../../assets/Relics.svg';
import DiscordIcon from '../../../assets/icons/discord.svg';
import TandCIcon from '../../../assets/icons/fileIcon.svg';
import PrivacyIcon from '../../../assets/icons/infoShieldIcon.svg';
import SteamIcon from '../../../assets/icons/steam2.svg';
import Logout from '../../../assets/icons/logout.svg';

import LottieView from 'lottie-react-native';

type LogoNames =
  | 'apple'
  | 'google'
  | 'discord'
  | 'tandc'
  | 'privacy'
  | 'steam'
  | 'logout';

type IconNames =
  | 'round-chevron-right'
  | 'round-chevron-right-dark'
  | 'web'
  | 'lock'
  | 'relic';
interface Props {
  buttonText: string;
  buttonTextStyle?: TextStyle;
  onPress: () => void;
  logoName?: LogoNames;
  iconName?: IconNames;
  style?: ViewStyle;
  isDisabled?: boolean;
  isVerifying?: boolean;
}

const StandardButton = ({ isDisabled = false, ...props }: Props) => {
  const logoPicker = () => {
    switch (props.logoName) {
      case 'apple':
        return <Apple />;
      case 'google':
        return <Google />;
      case 'discord':
        return <DiscordIcon width={20} height={20} />;
      case 'tandc':
        return <TandCIcon width={20} height={20} />;
      case 'privacy':
        return <PrivacyIcon width={20} height={20} />;
      case 'logout':
        return <Logout width={20} height={20} />;
      case 'steam':
        return <SteamIcon width={20} height={20} />;
      default:
        return null;
    }
  };

  const iconPicker = () => {
    switch (props.iconName) {
      case 'round-chevron-right':
        return <RoundChevronRight height={16} width={16} />;
      case 'round-chevron-right-dark':
        return <RoundChevronRightDark height={16} width={16} />;
      case 'web':
        return <WebIcon width={24} height={24} />;
      case 'lock':
        return <LockIcon width={16} height={16} fill={'white'} />;
      case 'relic':
        return <RelicIcon width={18} height={18} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer(isDisabled, props.logoName || props.iconName),
        props.style,
      ]}
      disabled={isDisabled}
      onPress={props.onPress}>
      {props.isVerifying ? (
        <LottieView
          source={require('../../../assets/lottie/greenLoader.json')}
          style={{ width: 24, height: 24 }}
          autoPlay
          loop
        />
      ) : (
        <>
          {logoPicker()}
          <Text style={[styles.buttonText, props.buttonTextStyle]}>
            {props.buttonText}
          </Text>
          {iconPicker()}
        </>
      )}
    </TouchableOpacity>
  );
};

export default StandardButton;
