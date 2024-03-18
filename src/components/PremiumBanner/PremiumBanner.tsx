import { View, Text } from 'react-native';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { useTranslation } from 'react-i18next';
import { styles } from './PremiumBanner.styles';
import { useGetPremiumStatusQuery } from '../../redux/query/endpoints/premiumApi';
import { Loader } from '../Loaders/Loader';
import LottieView from 'lottie-react-native';
import GeneralErrorComponent from '../GeneralErrorComponent/GeneralErrorComponent';

import PremiumBolt from '../../assets/icons/premium-bolt.svg';
import { presentPaywall } from '../../utils/presentPaywal';

const PremiumBanner = () => {
  const { t } = useTranslation();

  const {
    data,
    isSuccess: premiumStatusSuccess,
    isError: premiumStatusError,
    isFetching: premiumStatusFetching,
    refetch,
  } = useGetPremiumStatusQuery();

  const fetchingContent = (
    <LottieView
      source={require('../../assets/lottie/greenLoader.json')}
      style={{ width: 50, height: 50, marginTop: 16 }}
      autoPlay
      loop
    />
  );

  const errorContent = (
    <GeneralErrorComponent
      refetchFunction={() => refetch()}
      customErrorMessage="Error fetching your premium status"
      style={{ marginTop: 16 }}
    />
  );

  return (
    <Loader fetchFallback={fetchingContent} isFetching={premiumStatusFetching}>
      {premiumStatusSuccess && !data.premium.hasPremium ? (
        <View style={styles.parentContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headingText}>
                {t('premium.banner.header')}
              </Text>
              <Text style={styles.descriptionText}>
                {t('premium.banner.description')}
              </Text>
            </View>
            <PremiumBolt />
          </View>
          <StandardButton
            onPress={presentPaywall}
            buttonText="Learn More"
            iconName="round-chevron-right"
            buttonTextStyle={{ fontSize: 16 }}
            style={styles.button}
          />
        </View>
      ) : null}
      {premiumStatusError ? errorContent : null}
    </Loader>
  );
};

export default PremiumBanner;
