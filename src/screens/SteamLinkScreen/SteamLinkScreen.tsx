import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
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
import { z } from 'zod';
import SteamIcon from '../../assets/icons/steam2.svg';
import { WIDTH } from '../../utils/dimension';
import YoutubePlayer from 'react-native-youtube-iframe';

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
                <Text style={styles.descriptionHeading}>
                  Steam account already in use
                </Text>
                <SteamIcon width={100} height={100} />
                <Text style={styles.descriptionText}>
                  We've noticed that your Steam account is already linked to
                  another profile registered in the app. Please link a different
                  Steam account.
                </Text>
                <Text style={styles.descriptionText}>
                  If this is your only Steam account and you haven't registered
                  with our app using it, please contact our Support Team, and
                  they will help resolve the issue.
                </Text>
              </View>
              <View style={styles.buttonsContainer}>
                <StandardButton
                  buttonText="Link a new Steam account"
                  onPress={() => navigation.navigate(StackScreenName.linkGame)}
                  style={styles.button}
                />
                <StandardButton
                  buttonText="Support"
                  logoName="discord"
                  onPress={() => {}}
                  style={styles.transparentButton}
                />
              </View>
            </>
          );
        } else if (isExpectedError.data.status === 406) {
          return (
            <>
              <View style={styles.descriptionWrapper}>
                <Text style={[styles.descriptionHeading, { width: WIDTH }]}>
                  Your match data is not public in Dota 2
                </Text>
                <Text style={styles.descriptionText}>
                  We've noticed that your match data is not set to public in
                  your Dota 2 settings. We need this setting to be enabled in
                  order to collect points
                </Text>
                <Text style={styles.descriptionText}>
                  Please follow the tutorial below to enable this setting. Once
                  you have done so, press the 'Retry' button
                </Text>
              </View>
              <View style={{ width: '100%', height: 200 }}>
                <YoutubePlayer height={200} videoId={'iee2TATGMyI'} />
              </View>
              <View style={styles.buttonsContainer}>
                <StandardButton
                  buttonText="Retry"
                  onPress={handleRefetch}
                  style={styles.button}
                />
                <StandardButton
                  buttonText="Support"
                  logoName="discord"
                  onPress={() => {}}
                  style={styles.transparentButton}
                />
              </View>
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
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}>
      <LoadingComponent isLoading={isFetching} />
      <View style={styles.descriptionContainer}>{descriptionContent()}</View>
      {errorContent()}
    </ScrollView>
  );
};

export default SteamLinkScreen;
