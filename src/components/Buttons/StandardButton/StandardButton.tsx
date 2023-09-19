import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './StandardButton.styles';
import Apple from '../../../assets/icons/apple.svg';
import Google from '../../../assets/icons/google.svg';
import RoundChevronRight from '../../../assets/icons/round-chevron-right.svg';

type LogoNames = 'apple' | 'google';

type IconNames = 'round-chevron-right';
interface Props {
  buttonText: string;
  buttonTextStyle?: TextStyle;
  onPress: () => void;
  logoName?: LogoNames;
  iconName?: IconNames;
  style?: ViewStyle;
  isDisabled?: boolean;
  isSecondary?: boolean;
}

const StandardButton = ({ isDisabled = false, ...props }: Props) => {
  const logoPicker = () => {
    switch (props.logoName) {
      case 'apple':
        return <Apple />;
      case 'google':
        return <Google />;
      default:
        return null;
    }
  };

  const iconPicker = () => {
    switch (props.iconName) {
      case 'round-chevron-right':
        return <RoundChevronRight height={16} width={16} />;
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
      {logoPicker()}
      <Text style={[styles.buttonText, props.buttonTextStyle]}>
        {props.buttonText}
      </Text>
      {iconPicker()}
    </TouchableOpacity>
  );
};

export default StandardButton;
