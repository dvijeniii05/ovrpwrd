import React from 'react';
import { View, Text, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

import {
  useLinkSteamIDQuery,
  useUpdateUserDetailsMutation,
} from '../../redux/query/endpoints/userApi';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import { styles } from './SteamLinkScreen.styles';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../../redux/slices/userDataSlice';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { z } from 'zod';

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.steamLink>;

const errorZSchema = z.object({
  data: z.object({
    message: z.string(),
  }),
  status: z.number(),
});

const SteamLinkScreen = ({ navigation, route }: ScreenProps) => {
  const { steamID32 } = route.params;

  const dispatch = useDispatch();

  const { data, isSuccess, isError, isFetching, refetch, error } =
    useLinkSteamIDQuery({
      steamID32,
    });

  const [trigger, { isLoading }] = useUpdateUserDetailsMutation();

  const handleOnPress = () => {
    trigger({ isFullyOnboarded: true })
      .unwrap()
      .then(response => {
        dispatch(updateUserDetails({ isGameLinked: true }));
      })
      .catch(error => {});
  };

  const handleRefetch = () => {
    refetch();
  };

  const descriptionContent = () => {
    if (isSuccess) {
      return (
        <>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.descriptionHeading}>Before you go...</Text>
            <Image
              source={require('../../assets/images/beforeYouGo.png')}
              style={styles.imageStyle}
            />
            <Text style={styles.descriptionText}>
              Perks and Relics will start accumulating after your first match is
              tracked in OVRPWRD
            </Text>
          </View>
          <StandardButton
            buttonText="Got it"
            onPress={handleOnPress}
            style={styles.button}
          />
        </>
      );
    } else if (isError) {
      const isExpectedError = errorZSchema.safeParse(error);
      if (isExpectedError.success) {
        if (isExpectedError.data.status === 409) {
          // steamID is in use. inform the user and let them to try a different steam ID + contact support if they dont expect this issue
          return (
            <>
              <View style={styles.descriptionWrapper}>
                <Text style={styles.descriptionHeading}>SteamID in use</Text>
                <Text style={styles.descriptionText}>
                  We have noticed that your steam account is already registered
                  to our database and linked to a different email address.
                  Please try and link a different steam account.
                </Text>
                <Text style={styles.descriptionText}>
                  If this is your only steam account and you haven't registered
                  with our app using it, please contact our Support Team and
                  they will held to solve the issue.
                </Text>
              </View>
              <StandardButton
                buttonText="Try different Steam Account"
                onPress={() => navigation.navigate(StackScreenName.linkGame)}
                style={styles.button}
              />
            </>
          );
        } else if (isExpectedError.data.status === 406) {
          return (
            <>
              <View style={styles.descriptionWrapper}>
                <Text style={styles.descriptionHeading}>
                  Match History is not public
                </Text>
                <Text style={styles.descriptionText}>
                  We have noticed that your match history is set to be 'not
                  public' in Dota 2 settings. We need this setting to be enbaled
                  to allow point calcualtion. Please follow the guide below to
                  enable it. Once the change is complete, press the 'Retry'
                  button below.
                </Text>
                <Text style={styles.descriptionText}>
                  This is the guide blah blah blah. Can be a screenshot as
                  well??? If the issue still persists, please contact out
                  support team
                </Text>
              </View>
              <StandardButton
                buttonText="Retry"
                onPress={() => navigation.navigate(StackScreenName.linkGame)}
                style={styles.button}
              />
            </>
          );
        }
      } else {
        return (
          <>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.descriptionHeading}>
                Something went wrong
              </Text>
              <Text style={styles.descriptionText}>
                There was a problem linking your Steam account. Please press a
                'Retry' button to try it again.
              </Text>
            </View>
            <StandardButton
              buttonText="Retry"
              onPress={handleRefetch}
              style={styles.button}
            />
          </>
        );
      }
    } else {
      return (
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionHeading}>Processing data</Text>
        </View>
      );
    }
  };

  const errorContent = () => {
    if (isError) {
      const isExpectedError = errorZSchema.safeParse(error).success;
      if (isExpectedError) {
      } else {
        return (
          <StandardButton
            buttonText="Retry"
            onPress={handleRefetch}
            style={styles.button}
          />
        );
      }
    } else {
      return null;
    }
  };

  return (
    <CustomSafeAreaView style={styles.parentContainer} edges={['bottom']}>
      <LoadingComponent isLoading={isFetching} />
      <View style={styles.descriptionContainer}>{descriptionContent()}</View>
      {/* {isSuccess ? (
        <StandardButton
          buttonText="Got it"
          onPress={handleOnPress}
          style={styles.button}
        />
      ) : null} */}
      {errorContent()}
    </CustomSafeAreaView>
  );
};

export default SteamLinkScreen;
