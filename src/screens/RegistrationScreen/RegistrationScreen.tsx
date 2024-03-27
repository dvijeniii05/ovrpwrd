import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Keyboard, Text, View } from 'react-native';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { useRegisterUserMutation } from '../../redux/query/endpoints/userApi';
import { COLORS } from '../../constans/COLORS';
import DetailInput, {
  ValidationTypes,
} from '../../components/DetailsInput/DetailsInput';
import { useTranslation } from 'react-i18next';
import { styles } from './RegistrationScreen.styles';
import Gradient from '../../components/Gradient/Gradient';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import {
  openBottomSheet,
  updateUserDetails,
} from '../../redux/slices/userDataSlice';
import { RootState } from '../../redux/store/mainStore';
import { useHeaderHeight } from '@react-navigation/elements';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import InformationModal from '../Modals/InformationModal/InformationModal';
import uuid from 'react-native-uuid';
import { setUserId } from '@amplitude/analytics-react-native';

type ScreenProps = StackScreenProps<
  StackParamList,
  StackScreenName.registration
>;

const RegistrationScreen = ({ navigation }: ScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 56;

  const { email, appleUserId } = useSelector(
    (state: RootState) => state.userData.data,
  );

  useEffect(() => {
    setUserId(email!);
  }, [email]);

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const { dob, gender, country } = useSelector(
    (state: RootState) => state.userData.data,
  );

  const [nickname, setNickname] = useState<string>('');
  const [isProfanitySuccess, setIsProfanitySuccess] = useState<boolean>(false);
  const [isAgeVerificationSuccess, setIsAgeVerificationSuccess] =
    useState<boolean>(false);
  const [isInformationModalVisible, setIsInformationModalVisible] =
    useState<boolean>(false);
  const [informationModalText, setInformationModalText] = useState<string>('');

  // TODO: to be rewoerked with nickname confirmation logic
  const isFormComplete =
    dob &&
    gender &&
    country &&
    nickname &&
    isProfanitySuccess &&
    isAgeVerificationSuccess;

  const randomstring = uuid.v4().toString();
  const revUserId = `${email}_${randomstring}`;

  const handleOnpress = () => {
    registerUser({
      nickname,
      email: email!,
      appleUserId,
      dob,
      gender,
      country,
      revUserId,
    })
      .unwrap()
      .then(response => {
        if (response.token) {
          dispatch(updateUserDetails({ revenueCatId: revUserId }));
          navigation.navigate(StackScreenName.avatar);
        } else {
          setInformationModalText(response.message!);
          setIsInformationModalVisible(true);
        }
      })
      .catch(error => {
        setInformationModalText(error.data?.message ?? JSON.stringify(error));
        setIsInformationModalVisible(true);
      });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.scroll}
      enableOnAndroid
      contentContainerStyle={styles.scrollContentContainer}>
      <Gradient type="shaded" style={{ position: 'absolute', top: 0 }} />
      <LoadingComponent isLoading={isLoading} />
      <InformationModal
        isVisible={isInformationModalVisible}
        headerText="Oops, something went wrong"
        informationText={informationModalText}
        onPress={() => setIsInformationModalVisible(false)}
        buttonText="Okay"
      />
      <View style={styles.headingContainer(topMargin)}>
        <Text style={styles.headingText(COLORS.mainBlue)}>1.</Text>
        <Text style={styles.headingText(COLORS.white)}>
          {t('registration.details.heading')}
        </Text>
      </View>
      <View style={{ width: '100%', marginTop: 40 }}>
        <DetailInput
          placeholderText="Email"
          containerStyle={{ marginTop: 8 }}
          editable={false}
          defaultValue={email!}
        />
        <DetailInput
          placeholderText="Nickname"
          containerStyle={{ marginTop: 8 }}
          onChangeText={value => setNickname(value)}
          needsValidation={ValidationTypes.profanity}
          isProfanitySuccess={value => setIsProfanitySuccess(value)}
        />
        <DetailInput
          placeholderText="DOB"
          containerStyle={{ marginTop: 8 }}
          editable={false}
          onPress={() => {
            Keyboard.dismiss();
            dispatch(openBottomSheet({ isOpen: true, type: 'DOB' }));
          }}
          defaultValue={dob}
          needsValidation={ValidationTypes.age}
          isAgeVerificationSuccess={value => setIsAgeVerificationSuccess(value)}
        />
        <DetailInput
          placeholderText="Gender"
          containerStyle={{ marginTop: 8 }}
          editable={false}
          onPress={() => {
            Keyboard.dismiss();
            dispatch(openBottomSheet({ isOpen: true, type: 'Gender' }));
          }}
          defaultValue={gender}
          icon
        />
        <DetailInput
          placeholderText="Country of Residence"
          containerStyle={{ marginTop: 8 }}
          onPress={() => {
            Keyboard.dismiss();
            dispatch(openBottomSheet({ isOpen: true, type: 'Country' }));
          }}
          editable={false}
          defaultValue={country}
          icon
        />
      </View>
      <StandardButton
        buttonText={t('nextStep.button')}
        style={{ top: 40, width: '100%' }}
        onPress={handleOnpress}
        isDisabled={!isFormComplete}
      />
    </KeyboardAwareScrollView>
  );
};

export default RegistrationScreen;
