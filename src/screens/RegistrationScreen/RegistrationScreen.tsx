import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { useRegisterUserMutation } from '../../redux/query/endpoints/userApi';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constans/COLORS';
import DetailInput from '../../components/DetailsInput/DetailsInput';
import { useTranslation } from 'react-i18next';
import { styles } from './RegistrationScreen.styles';
import Gradient from '../../components/Gradient/Gradient';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux';
import { openBottomSheet } from '../../redux/slices/userDataSlice';

type ScreenProps = StackScreenProps<
  StackParamList,
  StackScreenName.registration
>;

const RegistrationScreen = ({ navigation, route }: ScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { email } = route.params ?? 'not ready yet';
  const [registerUser, { isSuccess, isLoading, isError }] =
    useRegisterUserMutation();

  return (
    <KeyboardAwareScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContentContainer}>
      <Gradient type="shaded" style={{ position: 'absolute', top: 0 }} />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText(COLORS.mainBlue)}>1.</Text>
        <Text style={styles.headingText(COLORS.white)}>
          {t('registration.details.heading')}
        </Text>
      </View>
      <View style={{ width: '100%', marginTop: 40 }}>
        <DetailInput placeholderText="Full name" />
        <DetailInput
          placeholderText="Email"
          containerStyle={{ marginTop: 8 }}
        />
        <DetailInput
          placeholderText="Nickname"
          containerStyle={{ marginTop: 8 }}
        />
        <DetailInput placeholderText="DOB" containerStyle={{ marginTop: 8 }} />
        <DetailInput
          placeholderText="Gender"
          containerStyle={{ marginTop: 8 }}
        />
        <DetailInput
          placeholderText="Country"
          containerStyle={{ marginTop: 8 }}
        />
      </View>
      <StandardButton
        buttonText={t('nextStep.button')}
        style={{ top: 40 }}
        onPress={() => dispatch(openBottomSheet())}
      />
    </KeyboardAwareScrollView>
  );
};

export default RegistrationScreen;
