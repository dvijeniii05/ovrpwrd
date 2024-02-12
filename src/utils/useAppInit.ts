import { useEffect, useState } from 'react';
import Purchases from 'react-native-purchases';
import { mainStore } from '../redux/store/mainStore';
import { revCatApiKey } from '../constans/revCat';
import { updateUserDetails } from '../redux/slices/userDataSlice';

export const useAppInit = () => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const revUserId = mainStore.getState()?.userData?.data?.revenueCatId;
  console.log('OUTSIDE_FUNC', revUserId);

  const revenueCatInit = async () => {
    try {
      console.log('CHEEECK', revUserId);
      if (revUserId) {
        Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
        Purchases.configure({
          apiKey: revCatApiKey,
          appUserID: revUserId,
        });
        console.log('REVENUE_CAT_INIT_ON_APP_INITATION', revUserId);

        // CHeck logic below with dummy object
        const customerInfo = await Purchases.getCustomerInfo();
        console.log('CUSTOMER_INFO', customerInfo.entitlements.active);
        const hasPremium = customerInfo.entitlements.active ?? false;
        mainStore.dispatch(updateUserDetails(hasPremium));
      }
      setIsError(false);
    } catch {
      console.log('RECENUE_ERRORR');
      setIsError(true);
    }
    setIsDone(true);
  };

  useEffect(() => {
    revenueCatInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isDone,
    isError,
  };
};
