import { isAnyOf } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';
import { startListening } from '../listenerMiddleware';
import { userApi } from './userApi';
import { PurchasesEntitlementInfos } from 'react-native-purchases';

export interface PremiumStatusResponseProps {
  premium: {
    isPremiumActive: boolean;
    premiumGamesLeft: number;
    hasPremium: boolean;
  };
}

export interface UpdatePremiumProps {
  hasActiveEntitelement: boolean;
  isIos: boolean;
  entitlements: PurchasesEntitlementInfos;
}

export const premiumApi = apiSlice.injectEndpoints({
  endpoints: buidler => ({
    updatePremium: buidler.mutation<void, UpdatePremiumProps>({
      query: arg => ({
        url: '/premium/updatePremium',
        body: arg,
        method: 'POST',
      }),
    }),
    activatePremium: buidler.mutation<void, void>({
      query: arg => ({
        url: '/premium/activatePremium',
        body: arg,
        method: 'PATCH',
      }),
    }),
    getPremiumStatus: buidler.query<PremiumStatusResponseProps, void>({
      query: () => '/premium/getPremiumStatus',
      providesTags: ['premium'],
    }),
  }),
});

startListening({
  matcher: isAnyOf(
    premiumApi.endpoints.activatePremium.matchFulfilled,
    premiumApi.endpoints.updatePremium.matchFulfilled,
  ),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(userApi.util.invalidateTags(['premium']));
  },
});
export const {
  useActivatePremiumMutation,
  useGetPremiumStatusQuery,
  useUpdatePremiumMutation,
} = premiumApi;
