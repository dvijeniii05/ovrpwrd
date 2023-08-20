import { TextInput, View, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { styles } from './DetailsInput.styles';

interface Props {
  placeholderText: string;
  containerStyle?: ViewStyle;
  dividerStyle?: ViewStyle;
}

const DetailInput = (props: Props) => {
  return (
    <View style={[styles.parentContainer, props.containerStyle]}>
      <TextInput
        placeholder={props.placeholderText}
        placeholderTextColor={COLORS.neutral}
        style={styles.textInput}
      />
      <View style={[styles.divider, props.dividerStyle]} />
    </View>
  );
};

export default DetailInput;
