import { useEffect, useState } from 'react';
import { mainStore } from '../redux/store/mainStore';
import { refetchRevCatCustomerInfo, revenueCatInit } from './revenueCatInit';
import Purchases from 'react-native-purchases';
import { CustomerInfo } from '@revenuecat/purchases-typescript-internal';

export const useAppInit = () => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const revUserId = mainStore.getState()?.userData?.data?.revenueCatId;

  const revenueConfgiInit = async () => {
    try {
      console.log('REV_CAT_INIT');
      if (revUserId) {
        revenueCatInit(revUserId);
      }
      setIsError(false);
    } catch {
      setIsError(true);
    }
    //Maybe move setIsDone to a chain after updating Premium status on app init??
    setIsDone(true);
  };

  useEffect(() => {
    revenueConfgiInit();
    const listener = (info: CustomerInfo) => {
      refetchRevCatCustomerInfo(info);
    };
    Purchases.addCustomerInfoUpdateListener(listener);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revUserId]);

  return {
    isDone,
    isError,
  };
};
