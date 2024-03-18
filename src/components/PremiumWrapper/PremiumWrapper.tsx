import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, TouchableOpacity, Alert, View } from 'react-native';
import Premiums from '../../assets/icons/premium-bolt.svg';
import { styles } from './PremiumWrapper.styles';
import {
  useActivatePremiumMutation,
  useGetPremiumStatusQuery,
} from '../../redux/query/endpoints/premiumApi';
import { useLazyGetUserStatsQuery } from '../../redux/query/endpoints/userApi';

interface Props {
  value: number;
}

const PremiumWrapper = (props: Props) => {
  const {
    data,
    isSuccess: premiumStatusSuccess,
    isError: premiumStatusError,
    isFetching: premiumStatusFetching,
  } = useGetPremiumStatusQuery();
  const [
    activatePremium,
    {
      isSuccess: isPremiumActiveSuccess,
      isError: isPremiumActiveError,
      isLoading: isPremiumActiveFetching,
    },
  ] = useActivatePremiumMutation();

  const [
    fetchLatestGames,
    { data: latestGames, isFetching: isLatestGamesFetching },
  ] = useLazyGetUserStatsQuery();

  const hanleOnAcivateBoost = () => {
    console.log('HNDLE?');
    Alert.alert(
      'Confirmation',
      `Are you sure you want to activate x2 booster for the next match?`,
      [
        {
          text: 'No',
          onPress: () => Alert.alert('Boost activation canceled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            fetchLatestGames().finally(() => activatePremium());
          },
          style: 'default',
        },
      ],
    );
  };

  const isPremActive = data?.premium.isPremiumActive ?? false;
  const mockFetching = false;
  const mockError = false;

  const content = () => {
    if (
      premiumStatusFetching ||
      isPremiumActiveFetching ||
      isLatestGamesFetching
    ) {
      return (
        <LottieView
          source={require('../../assets/lottie/greenLoader.json')}
          style={styles.loaderLottie}
          autoPlay
          loop
        />
      );
    }

    if (premiumStatusError || isPremiumActiveError) {
      return <Text style={styles.errorText}>Error</Text>;
    }

    if (premiumStatusSuccess && data) {
      return (
        <>
          {isPremActive ? null : (
            <LottieView
              source={require('../../assets/lottie/gradient.json')}
              style={styles.gardientLottie}
              autoPlay
              loop
            />
          )}

          <Premiums width={24} height={24} />
          {isPremActive ? (
            <Text style={styles.activeText}>Active</Text>
          ) : (
            <Text style={styles.text}>{props.value}</Text>
          )}
        </>
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.parentContainer(isPremActive)}
      disabled={isPremActive}
      onPress={hanleOnAcivateBoost}>
      {content()}
    </TouchableOpacity>
  );
};

export default PremiumWrapper;
