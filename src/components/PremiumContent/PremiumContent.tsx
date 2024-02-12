import { Alert } from 'react-native';
import {
  useGetPremiumStatusQuery,
  useActivatePremiumMutation,
} from '../../redux/query/endpoints/premiumApi';
import PremiumButton from '../Buttons/PremiumButton/PremiumButton';
import LottieView from 'lottie-react-native';
import { useLazyGetUserStatsQuery } from '../../redux/query/endpoints/userApi';
import GeneralErrorComponent from '../GeneralErrorComponent/GeneralErrorComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';

const PremiumContent = () => {
  const { hasPremium } = useSelector((state: RootState) => state.userData.data);

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
      isLoading: isPremiumActiveLoading,
    },
  ] = useActivatePremiumMutation();

  const [
    fetchLatestGames,
    { data: latestGames, isFetching: isLatestGamesLoading },
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

  const dummyLoading = true;
  const dummyError = true;

  if (isPremiumActiveLoading || isLatestGamesLoading || premiumStatusFetching)
    return (
      <LottieView
        source={require('../../assets/lottie/greenLoader.json')}
        style={{ width: 30, height: 90 }}
        autoPlay
        loop
      />
    );

  if (isPremiumActiveError) {
    return (
      <GeneralErrorComponent
        refetchFunction={() => activatePremium()}
        customErrorMessage="Error activating your boost, please try again"
        style={{ marginTop: 16 }}
      />
    );
  }

  if (premiumStatusSuccess) {
    const { isPremiumActive } = data.premium;
    if (hasPremium) {
      return (
        <PremiumButton
          isPremiumActive={isPremiumActive}
          onPress={hanleOnAcivateBoost}
        />
      );
    } else {
      return null;
    }
  }
};

export default PremiumContent;
