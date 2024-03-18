import Purchases from 'react-native-purchases';
import { androidRevCatApiKey, iosRevCatApiKey } from '../constans/revCat';
import { Alert, Platform } from 'react-native';
import { customDispatch } from '../redux/store/mainStore';
import { premiumApi } from '../redux/query/endpoints/premiumApi';
import { CustomerInfo } from '@revenuecat/purchases-typescript-internal';

export const revenueCatInit = async (revUserId: string) => {
  try {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    Purchases.configure({
      apiKey: Platform.OS === 'android' ? androidRevCatApiKey : iosRevCatApiKey,
      appUserID: revUserId,
    });
  } catch (err: any) {
    console.log('REVENUE_HELPER_INIT_ERRORR');
  }
};

export const refetchRevCatCustomerInfo = async (info: CustomerInfo) => {
  try {
    console.log('INFO_CHECK', info.entitlements);

    const dummyResponse = {
      request_date: '2024-03-13T16:38:08Z',
      request_date_ms: 1710347888954,
      subscriber: {
        entitlements: {
          premium: {
            expires_date: '2024-03-13T16:49:27Z',
            grace_period_expires_date: null,
            product_identifier: 'ovrpwrd_59_1y',
            purchase_date: '2024-03-13T15:49:27Z',
          },
        },
        first_seen: '2024-02-15T17:50:33Z',
        last_seen: '2024-03-12T18:10:25Z',
        management_url: 'https://apps.apple.com/account/subscriptions',
        non_subscriptions: {},
        original_app_user_id:
          'adikbsw@icloud.com_45d225ae-c9cf-4ff4-949e-96c4d27349f0',
        original_application_version: '1.0',
        original_purchase_date: '2024-03-12T17:58:32Z',
        other_purchases: {},
        subscriptions: {
          ovrpwrd_59_1y: {
            auto_resume_date: null,
            billing_issues_detected_at: null,
            expires_date: '2024-03-13T16:49:27Z',
            grace_period_expires_date: null,
            is_sandbox: true,
            original_purchase_date: '2024-03-12T17:58:32Z',
            ownership_type: 'PURCHASED',
            period_type: 'normal',
            purchase_date: '2024-03-13T15:49:27Z',
            refunded_at: null,
            store: 'app_store',
            store_transaction_id: '1000000978882206',
            unsubscribe_detected_at: null,
          },
          ovrpwrd_999_1m: {
            auto_resume_date: null,
            billing_issues_detected_at: null,
            expires_date: '2024-03-13T14:06:55Z',
            grace_period_expires_date: null,
            is_sandbox: true,
            original_purchase_date: '2024-02-07T17:42:16Z',
            ownership_type: 'PURCHASED',
            period_type: 'normal',
            purchase_date: '2024-03-13T14:01:55Z',
            refunded_at: null,
            store: 'app_store',
            store_transaction_id: '1000000978814781',
            unsubscribe_detected_at: '2024-03-13T14:06:37Z',
          },
        },
      },
    };

    const subs = dummyResponse.subscriber.subscriptions.ovrpwrd_59_1y;

    const hasAnyActiveEntitelment =
      Object.keys(info.entitlements.active).length !== 0;
    console.log('EARLY_CHECK', hasAnyActiveEntitelment);

    const promise = customDispatch(
      premiumApi.endpoints.updatePremium.initiate({
        hasActiveEntitelement: hasAnyActiveEntitelment,
        isIos: Platform.OS === 'ios',
        entitlements: info.entitlements,
      }),
    );
    await promise;
  } catch {
    Alert.alert(
      'Error getting your premium Status details. Please contact our customer support channel in Discord',
    );
  }
};
