import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { StackParamList } from '../../navigation/navigationTypes';
import { styles } from './WelcomeScreen.styles';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import { useLoginUserQuery } from '../../redux/query/endpoints/userApi';
import { StackScreenName } from '../../../ScreenNames';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../../redux/slices/userDataSlice';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { COLORS } from '../../constans/COLORS';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.welcome>;

const WelcomeScreen = ({ navigation, route }: ScreenProps) => {
  const { email } = route.params ?? '';
  const dispatch = useDispatch();

  const {
    data: userInfo,
    isSuccess,
    isFetching,
    isError,
    refetch,
  } = useLoginUserQuery(
    { email },
    {
      skip: email === undefined,
    },
  );

  const descriptionContent = () => {
    if (userInfo) {
      if (userInfo.isFullyOnboarded) {
        return (
          <View style={styles.descriptionWrapper}>
            <Text style={styles.descriptionHeading}>Welcome back!</Text>
            <Image
              source={require('../../assets/images/welcome.png')}
              style={styles.imageStyle}
            />
            <Text style={styles.descriptionText}>
              It’s great that you have decided to come back because a lot awaits
              you
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.descriptionWrapper}>
            <Text style={styles.descriptionHeading}>Welcome back!</Text>
            <Image
              source={require('../../assets/images/welcome.png')}
              style={styles.imageStyle}
            />
            <Text style={styles.descriptionText}>
              Looks like you haven't finsihed onboarding. We will prompt you to
              pick your Avatar and link a game publisher
            </Text>
          </View>
        );
      }
    }
    return (
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionHeading}>Welcome stranger!</Text>
        <Image
          source={require('../../assets/images/welcome.png')}
          style={styles.imageStyle}
        />
        <Text style={styles.descriptionText}>
          We will need to collect some information about you before you start
          your journey here
        </Text>
      </View>
    );
  };

  const errorContent = (
    <View style={styles.descriptionWrapper}>
      <Text style={styles.descriptionHeading}>
        There was an error while checking your account.
      </Text>
      <Text style={styles.descriptionText}>
        Please try again or contact our customer support chat in Discord.
      </Text>
      <StandardButton
        onPress={refetch}
        buttonText="Retry"
        style={{ marginTop: 40, backgroundColor: COLORS.red }}
      />
    </View>
  );

  const handleOnPress = useCallback(() => {
    if (userInfo) {
      if (userInfo.isFullyOnboarded) {
        dispatch(updateUserDetails({ isGameLinked: true }));
        // navigation.navigate(StackScreenName.home);
      } else {
        navigation.navigate(StackScreenName.avatar);
      }
    } else {
      navigation.navigate(StackScreenName.registration, { email });
    }
  }, [isSuccess]);

  return (
    <CustomSafeAreaView style={styles.parentContainer} edges={['bottom']}>
      <LoadingComponent isLoading={isFetching} />
      {isSuccess ? (
        <>
          <View style={styles.descriptionContainer}>
            {descriptionContent()}
          </View>
          <StandardButton
            buttonText="Continue"
            onPress={handleOnPress}
            style={styles.button}
          />
        </>
      ) : null}
      {isError ? errorContent : null}
    </CustomSafeAreaView>
  );
};

export default WelcomeScreen;
