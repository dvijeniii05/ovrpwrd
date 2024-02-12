import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { View, Image, Text } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './PremiumBanner.styles';
import {
  useGetPremiumStatusQuery,
  usePurchasePremiumMutation,
} from '../../redux/query/endpoints/premiumApi';
import { Loader } from '../Loaders/Loader';
import LottieView from 'lottie-react-native';
import GeneralErrorComponent from '../GeneralErrorComponent/GeneralErrorComponent';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';
import { updateUserDetails } from '../../redux/slices/userDataSlice';

const PremiumBanner = () => {
  const [bannerHeight, setBannerHeight] = useState<number>(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { hasPremium } = useSelector((state: RootState) => state.userData.data);

  // const {
  //   data,
  //   isSuccess: premiumStatusSuccess,
  //   isError: premiumStatusError,
  //   isFetching: premiumStatusFetching,
  //   refetch,
  // } = useGetPremiumStatusQuery();

  const [
    buyPremium,
    {
      isSuccess: isPurchaseSucces,
      isError: isPurchaseError,
      isLoading: isPurchaseLoading,
    },
  ] = usePurchasePremiumMutation();

  // const fetchingContent = (
  //   <LottieView
  //     source={require('../../assets/lottie/greenLoader.json')}
  //     style={{ width: 50, height: 50, marginTop: 16 }}
  //     autoPlay
  //     loop
  //   />
  // );

  // const errorContent = (
  //   <GeneralErrorComponent
  //     refetchFunction={() => refetch()}
  //     customErrorMessage="Error fetching your premium status"
  //     style={{ marginTop: 16 }}
  //   />
  // );

  const presentPaywall = async () => {
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();

    switch (paywallResult) {
      case PAYWALL_RESULT.NOT_PRESENTED:
      case PAYWALL_RESULT.ERROR:
      case PAYWALL_RESULT.CANCELLED:
        return false;
      case PAYWALL_RESULT.PURCHASED:
        () => {
          buyPremium()
            .unwrap()
            .then(() => dispatch(updateUserDetails({ hasPremium: true })));
        };
      case PAYWALL_RESULT.RESTORED:
        return true;
      default:
        return false;
    }
  };

  console.log('PREMIUNM???', hasPremium);

  return (
    <>
      {!hasPremium ? (
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
          <View style={styles.contentContainer}>
            <Text style={styles.headingText}>{t('premium.banner.header')}</Text>
            <Text style={styles.descriptionText}>
              {t('premium.banner.description')}
            </Text>
            <StandardButton
              onPress={() => presentPaywall()}
              buttonText="Buy Premium"
              iconName="round-chevron-right"
              buttonTextStyle={{ fontSize: 16 }}
              style={styles.button}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default PremiumBanner;
