import { useEffect, useState } from 'react';
import { Pressable, TextInput, View, ViewStyle, Text } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import { styles } from './DetailsInput.styles';
import DividerLine from '../DividerLine/DividerLine';
import DropdownIcon from '../../assets/icons/dropdown.svg';
import GreenCheckboxIcon from '../../assets/icons/selected-checkbox.svg';
import RedCheckboxIcon from '../../assets/icons/canceled-checkbox.svg';
import { badWords } from '../../constans/badWords';
import { DateTime } from 'luxon';

export enum ValidationTypes {
  age = 'age',
  profanity = 'profanity',
}

interface Props {
  placeholderText: string;
  containerStyle?: ViewStyle;
  dividerStyle?: ViewStyle;
  editable?: boolean;
  onPress?: () => void;
  onChangeText?: (value: string) => void;
  isProfanitySuccess?: (value: boolean) => void;
  isAgeVerificationSuccess?: (value: boolean) => void;
  needsValidation?: ValidationTypes;
  defaultValue?: string;
  icon?: boolean;
}

const DetailInput = ({ editable = true, ...props }: Props) => {
  const [isProfanitySuccess, setIsProfanitySuccess] = useState<boolean>(false);
  const [isAgeVerificationSuccess, setIsAgeVerificationSuccess] =
    useState<boolean>(false);

  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (props.needsValidation === ValidationTypes.age && props.defaultValue) {
      const isOldEnough =
        DateTime.fromFormat(props.defaultValue, 'dd-MMM-yyyy').diffNow('years')
          .years < -18;
      setIsAgeVerificationSuccess(isOldEnough);
    }
    props.isAgeVerificationSuccess
      ? props.isAgeVerificationSuccess(isAgeVerificationSuccess)
      : null;
  }, [props.defaultValue, props.needsValidation, isAgeVerificationSuccess]);

  const icon = () => {
    if (props.icon) {
      return <DropdownIcon />;
    }
    if (props.needsValidation) {
      if ((isProfanitySuccess && text) || isAgeVerificationSuccess) {
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

    props.isProfanitySuccess ? props.isProfanitySuccess(!hasProfanity) : null;

    if (!hasProfanity) {
      setIsProfanitySuccess(true);
      props.onChangeText ? props.onChangeText(text) : null;
    } else {
      setIsProfanitySuccess(false);
    }
  };

  const handleOnChangeText = async (text: string) => {
    if (props.needsValidation) {
      profanityCheck(text);
    } else {
      setText(text);
      props.onChangeText ? props.onChangeText(text) : null;
    }
  };

  const validationContent = () => {
    if (
      props.needsValidation === ValidationTypes.profanity &&
      !isProfanitySuccess &&
      text
    ) {
      return (
        <>
          <DividerLine
            style={[props.dividerStyle, { backgroundColor: COLORS.red }]}
          />
          <Text style={styles.profanityText}>
            This nickname contains a profanity
          </Text>
        </>
      );
    } else if (
      props.needsValidation === ValidationTypes.age &&
      !isAgeVerificationSuccess &&
      props.defaultValue
    ) {
      return (
        <>
          <DividerLine
            style={[props.dividerStyle, { backgroundColor: COLORS.red }]}
          />
          <Text style={styles.profanityText}>
            You must be 18+ to use this app
          </Text>
        </>
      );
    } else {
      return <DividerLine style={props.dividerStyle} />;
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
      {validationContent()}
    </View>
  );
};

export default DetailInput;
