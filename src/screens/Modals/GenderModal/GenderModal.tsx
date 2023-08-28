import { View, Text, Pressable } from 'react-native';
import StandardButton from '../../../components/Buttons/StandardButton/StandardButton';
import { useTranslation } from 'react-i18next';
import { styles } from './GenderModal.styles';
import { COLORS } from '../../../constans/COLORS';
import SelectedCheckbox from '../../../assets/icons/selected-checkbox.svg';
import ButtonWithCheckbox from '../../../components/Buttons/ButtonWithCheckbox/ButtonWithCheckbox';
import DividerLine from '../../../components/DividerLine/DividerLine';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  closeBottomSheet,
  updateUserDetails,
} from '../../../redux/slices/userDataSlice';

const GenderModal = () => {
  const genders = [
    {
      key: 1,
      value: 'Male',
    },
    {
      key: 2,
      value: 'Female',
    },
    {
      key: 3,
      value: 'Prefer not to say',
    },
  ];
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState<string>('');

  const onPress = () => {
    dispatch(updateUserDetails({ gender: selectedGender }));
    dispatch(closeBottomSheet());
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{t('genderAtBirth.header')}</Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        {genders.map(gender => (
          <View key={gender.key}>
            <ButtonWithCheckbox
              text={gender.value}
              onPress={() => {
                setSelectedGender(gender.value);
              }}
              selected={selectedGender === gender.value}
            />
            <DividerLine style={{ marginTop: 0 }} />
          </View>
        ))}
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <StandardButton
          buttonText={t('button.select')}
          onPress={onPress}
          isDisabled={!selectedGender}
          style={{ marginTop: 40 }}
        />
      </View>
    </View>
  );
};

export default GenderModal;
