import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';

export const presentPaywall = async () => {
  const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();

  switch (paywallResult) {
    case PAYWALL_RESULT.NOT_PRESENTED:
      break;
    case PAYWALL_RESULT.ERROR:
      console.log('ERRRRRROOOORR');
      break;
    case PAYWALL_RESULT.CANCELLED:
      break;

    case PAYWALL_RESULT.PURCHASED:
      console.log('PURCHASED!!!');

      break;
    case PAYWALL_RESULT.RESTORED:
      console.log('RESTORED!!');
      break;

    default:
      return false;
  }
};
