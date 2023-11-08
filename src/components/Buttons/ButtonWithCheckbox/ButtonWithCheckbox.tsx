import { Pressable, Text } from 'react-native';
import SelectedCheckbox from '../../../assets/icons/selected-checkbox.svg';
import { styles } from './ButtonWithCheckBox.styles';

interface Props {
  text: string;
  onPress: () => void;
  selected?: boolean;
}

const ButtonWithCheckbox = ({ selected = false, ...props }: Props) => {
  return (
    <Pressable style={styles.buttonContainer} onPress={props.onPress}>
      <Text style={styles.text(selected)}>{props.text}</Text>
      {selected ? <SelectedCheckbox /> : null}
    </Pressable>
  );
};

export default ButtonWithCheckbox;
