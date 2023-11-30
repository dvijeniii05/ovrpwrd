import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
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

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.steamLink>;

const SteamLinkScreen = ({ navigation, route }: ScreenProps) => {
  const { steamID32 } = route.params;

  const dispatch = useDispatch();

  const { data, isSuccess, isError, isFetching, refetch } = useLinkSteamIDQuery(
    {
      steamID32,
    },
  );

  const [trigger, { isLoading }] = useUpdateUserDetailsMutation();

  const descriptionContent = () => {
    if (isSuccess) {
      return (
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionHeading}>
            You steam account is now linked to your OVRPWRD account.
          </Text>
          <Text style={styles.descriptionText}>
            {` We are going to gather and proccess your statics starting from a match with the following match ID: ${data?.latestGameId}`}
          </Text>
        </View>
      );
    } else if (isError) {
      return (
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionHeading}>Something went wrong</Text>
          <Text style={styles.descriptionText}>
            There was a problem linking your Steam account. Please press a
            'Retry' button to try it again.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionHeading}>Processing data</Text>
        </View>
      );
    }
  };

  const handleOnPress = () => {
    trigger({ isFullyOnboarded: true })
      .unwrap()
      .then(response => {
        dispatch(updateUserDetails({ isGameLinked: true }));
      })
      .catch(error => {
        console.log('ERROE', error);
      });
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <SafeAreaView style={styles.parentContainer} edges={['bottom']}>
      <LoadingComponent isLoading={isFetching} />
      <View style={styles.descriptionContainer}>{descriptionContent()}</View>
      {isSuccess ? (
        <StandardButton
          buttonText="Continue"
          onPress={handleOnPress}
          style={styles.button}
        />
      ) : null}
      {isError ? (
        <StandardButton
          buttonText="Retry"
          onPress={handleRefetch}
          style={styles.button}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default SteamLinkScreen;
