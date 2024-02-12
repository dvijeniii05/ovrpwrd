import Purchases from 'react-native-purchases';
import { revCatApiKey } from '../constans/revCat';

export const revenueCatInit = async (revUserId: string) => {
  try {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    Purchases.configure({
      apiKey: revCatApiKey,
      appUserID: revUserId,
    });
    console.log('REVENUE_HELPER_INIT', revUserId);
  } catch (err: any) {
    console.log('REVENUE_HELPER_INIT_ERRORR');
  }
};
