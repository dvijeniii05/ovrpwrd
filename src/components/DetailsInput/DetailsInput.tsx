import { Pressable, TextInput, View, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { styles } from './DetailsInput.styles';
import DividerLine from '../DividerLine/DividerLine';
import DropdownIcon from '../../assets/icons/dropdown.svg';

interface Props {
  placeholderText: string;
  containerStyle?: ViewStyle;
  dividerStyle?: ViewStyle;
  editable?: boolean;
  onPress?: () => void;
  onChangeText?: (value: string) => void;
  defaultValue?: string;
  icon?: boolean;
}

const DetailInput = ({ editable = true, ...props }: Props) => {
  const dropdownIcon = () => {
    if (props.icon) {
      return <DropdownIcon />;
    }
    return null;
  };
  return (
    <View style={[styles.parentContainer, props.containerStyle]}>
      <Pressable style={styles.inputContainer} onPress={props.onPress}>
        <TextInput
          placeholder={props.placeholderText}
          placeholderTextColor={COLORS.neutral}
          style={styles.textInput}
          editable={editable}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          onPressIn={props.onPress}
        />
        {dropdownIcon()}
      </Pressable>
      <DividerLine style={props.dividerStyle} />
    </View>
  );
};

export default DetailInput;
