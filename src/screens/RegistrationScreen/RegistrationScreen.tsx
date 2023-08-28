import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { useRegisterUserMutation } from '../../redux/query/endpoints/userApi';
import { COLORS } from '../../constans/COLORS';
import DetailInput from '../../components/DetailsInput/DetailsInput';
import { useTranslation } from 'react-i18next';
import { styles } from './RegistrationScreen.styles';
import Gradient from '../../components/Gradient/Gradient';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { openBottomSheet } from '../../redux/slices/userDataSlice';
import { RootState } from '../../redux/store/mainStore';
import { useHeaderHeight } from '@react-navigation/elements';

type ScreenProps = StackScreenProps<
  StackParamList,
  StackScreenName.registration
>;

const RegistrationScreen = ({ navigation, route }: ScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 56;

  const { email } = route.params ?? 'not ready yet';
  const [registerUser, { isSuccess, isLoading, isError }] =
    useRegisterUserMutation();
  const { dob, gender, country } = useSelector(
    (state: RootState) => state.userData.data,
  );

  const [fullName, setFullName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  console.log(fullName);

  // TODO: to be rewoerked with nickname confirmation logic
  const isFormComplete = dob && gender && country && fullName && nickname;

  return (
    <KeyboardAwareScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContentContainer}>
      <Gradient type="shaded" style={{ position: 'absolute', top: 0 }} />
      <View style={styles.headingContainer(topMargin)}>
        <Text style={styles.headingText(COLORS.mainBlue)}>1.</Text>
        <Text style={styles.headingText(COLORS.white)}>
          {t('registration.details.heading')}
        </Text>
      </View>
      <View style={{ width: '100%', marginTop: 40 }}>
        <DetailInput
          placeholderText="Full name"
          onChangeText={value => setFullName(value)}
        />
        <DetailInput
          placeholderText="Email"
          containerStyle={{ marginTop: 8 }}
          editable={false}
          defaultValue={email}
        />
        <DetailInput
          placeholderText="Nickname"
          containerStyle={{ marginTop: 8 }}
          onChangeText={value => setNickname(value)}
        />
        <DetailInput
          placeholderText="DOB"
          containerStyle={{ marginTop: 8 }}
          editable={false}
          onPress={() =>
            dispatch(openBottomSheet({ isOpen: true, type: 'DOB' }))
          }
          defaultValue={dob}
        />
        <DetailInput
          placeholderText="Gender"
          containerStyle={{ marginTop: 8 }}
          editable={false}
          onPress={() =>
            dispatch(openBottomSheet({ isOpen: true, type: 'Gender' }))
          }
          defaultValue={gender}
          icon
        />
        <DetailInput
          placeholderText="Country"
          containerStyle={{ marginTop: 8 }}
          onPress={() =>
            dispatch(openBottomSheet({ isOpen: true, type: 'Country' }))
          }
          editable={false}
          defaultValue={country}
          icon
        />
      </View>
      <StandardButton
        buttonText={t('nextStep.button')}
        style={{ top: 40 }}
        onPress={() => navigation.navigate(StackScreenName.avatar)}
        isDisabled={!isFormComplete}
      />
    </KeyboardAwareScrollView>
  );
};

export default RegistrationScreen;
