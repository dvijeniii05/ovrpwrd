import { useState } from 'react';
import { Pressable, TextInput, View, ViewStyle, Text } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { styles } from './DetailsInput.styles';
import DividerLine from '../DividerLine/DividerLine';
import DropdownIcon from '../../assets/icons/dropdown.svg';
import GreenCheckboxIcon from '../../assets/icons/selected-checkbox.svg';
import RedCheckboxIcon from '../../assets/icons/canceled-checkbox.svg';
import { badWords } from '../../constans/badWords';

interface Props {
  placeholderText: string;
  containerStyle?: ViewStyle;
  dividerStyle?: ViewStyle;
  editable?: boolean;
  onPress?: () => void;
  onChangeText?: (value: string) => void;
  needsProfanityCheck?: boolean;
  defaultValue?: string;
  icon?: boolean;
}

const DetailInput = ({ editable = true, ...props }: Props) => {
  const [isProfanitySuccess, setIsProfanitySuccess] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const icon = () => {
    if (props.icon) {
      return <DropdownIcon />;
    }
    if (props.needsProfanityCheck) {
      if (isProfanitySuccess && text) {
        return <GreenCheckboxIcon />;
      }
      return <RedCheckboxIcon />;
    }
    return null;
  };

  const profanityCheck = (text: string) => {
    setText(text);
    const hasProfanity = badWords.some(badWord =>
      text.toLowerCase().includes(badWord),
    );
    if (!hasProfanity) {
      setIsProfanitySuccess(true);
    } else {
      setIsProfanitySuccess(false);
    }
  };

  const handleOnChangeText = async (text: string) => {
    if (props.needsProfanityCheck) {
      profanityCheck(text);
    } else {
      setText(text);
      props.onChangeText;
    }
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
          onChangeText={handleOnChangeText}
          onPressIn={props.onPress}
        />
        {icon()}
      </Pressable>
      {props.onChangeText &&
      !isProfanitySuccess &&
      props.needsProfanityCheck ? (
        <>
          <DividerLine
            style={[props.dividerStyle, { backgroundColor: COLORS.red }]}
          />
          <Text style={styles.profanityText}>
            This nickname contains a profanity
          </Text>
        </>
      ) : (
        <DividerLine style={props.dividerStyle} />
      )}
    </View>
  );
};

export default DetailInput;
