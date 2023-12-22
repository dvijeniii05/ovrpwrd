import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { View, Image, Text } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './PremiumBanner.styles';
import {
  useActivatePremiumMutation,
  useGetPremiumStatusQuery,
  usePurchasePremiumMutation,
} from '../../redux/query/endpoints/premiumApi';
import { Loader } from '../Loaders/Loader';
import LottieView from 'lottie-react-native';
import { COLORS } from '../../constans/COLORS';
import { useLazyGetUserStatsQuery } from '../../redux/query/endpoints/userApi';

const PremiumBanner = () => {
  const [bannerHeight, setBannerHeight] = useState<number>(0);
  const { t } = useTranslation();

  const {
    data,
    isSuccess: premiumStatusSuccess,
    isError: premiumStatusError,
    isFetching: premiumStatusFetching,
  } = useGetPremiumStatusQuery();

  const [
    buyPremium,
    {
      isSuccess: isPurchaseSucces,
      isError: isPurchaseError,
      isLoading: isPurchaseLoading,
    },
  ] = usePurchasePremiumMutation();

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

  const fetchingContent = (
    <LottieView
      source={require('../../assets/lottie/greenLoader.json')}
      style={{ width: 50, height: 50, position: 'absolute' }}
      autoPlay
      loop
    />
  );

  const successContent = () => {
    if (data?.premium.hasPremium) {
      if (data.premium.isPremiumActive) {
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.withPremiumHeadingText}>
              {`Premium Boost is currently active and you will get 2x points for the match after ${latestGames?.significantMatches[0].matchId}`}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.withPremiumHeadingText}>
              You are now a Premium User!
            </Text>
            <Text style={styles.withPremiumDescriptionText}>
              {`You have ${data?.premium.premiumGamesLeft} boosters left. Press the button below to activate a booster for the next match`}
            </Text>
            <StandardButton
              onPress={() =>
                fetchLatestGames().finally(() => activatePremium())
              }
              buttonText="Activate Booster"
              buttonTextStyle={{ fontSize: 16, color: COLORS.black }}
              style={styles.withPremiumButton}
            />
          </View>
        );
      }
    } else {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.headingText}>{t('premium.banner.header')}</Text>
          <Text style={styles.descriptionText}>
            {t('premium.banner.description')}
          </Text>
          <StandardButton
            onPress={() => buyPremium()}
            buttonText="Buy Premium"
            iconName="round-chevron-right"
            buttonTextStyle={{ fontSize: 16 }}
            style={styles.button}
          />
        </View>
      );
    }
  };

  const errorContent = (
    <View style={styles.contentContainer}>
      <Text style={styles.withPremiumHeadingText}>
        There was an error with this request (TO FIX)
      </Text>
    </View>
  );

  return (
    <View
      style={styles.parentContainer}
      onLayout={event => {
        const width = event.nativeEvent.layout.height;
        setBannerHeight(Number(width.toFixed(3)));
      }}>
      <Image
        source={require('../../assets/banners/premiumBanner.png')}
        style={{ width: '100%' }}
        resizeMode="cover"
      />
      <Canvas style={styles.canvas}>
        <Rect width={WIDTH} height={bannerHeight} />
        <LinearGradient
          start={vec(WIDTH * 0.5, bannerHeight * 0.4)}
          end={vec(WIDTH * 0.5, bannerHeight)}
          colors={['transparent', '#040413']}
        />
      </Canvas>
      <Loader
        isFetching={
          premiumStatusFetching ||
          isLatestGamesLoading ||
          isPurchaseLoading ||
          isPremiumActiveLoading
        }
        fetchFallback={fetchingContent}>
        {premiumStatusSuccess ? successContent() : null}
      </Loader>
    </View>
  );
};

export default PremiumBanner;
