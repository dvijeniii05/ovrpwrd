import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './StandardButton.styles';
import Apple from '../../../assets/icons/apple.svg';
import Google from '../../../assets/icons/google.svg';

interface Props {
  buttonText: string;
  onPress: () => void;
  iconName?: string;
  style?: ViewStyle;
  isDisabled?: boolean;
}

const StandardButton = ({ isDisabled = false, ...props }: Props) => {
  const iconPicker = () => {
    switch (props.iconName) {
      case 'apple':
        return <Apple />;
      case 'google':
        return <Google />;
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity
      style={[styles.buttonContainer(isDisabled, props.iconName), props.style]}
      disabled={isDisabled}
      onPress={props.onPress}>
      {iconPicker()}
      <Text style={styles.buttonText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

export default StandardButton;
