import { isAnyOf } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';
import { startListening } from '../listenerMiddleware';
import { userApi } from './userApi';

export interface RewardStatusResponseProps {
  premium: {
    hasPremium: boolean;
    isPremiumActive: boolean;
    premiumGamesLeft: number;
  };
}

export const premiumApi = apiSlice.injectEndpoints({
  endpoints: buidler => ({
    purchasePremium: buidler.mutation<void, void>({
      query: arg => ({
        url: '/premium/purchasePremium',
        body: arg,
        method: 'PATCH',
      }),
    }),
    activatePremium: buidler.mutation<void, void>({
      query: arg => ({
        url: '/premium/activatePremium',
        body: arg,
        method: 'PATCH',
      }),
    }),
    getPremiumStatus: buidler.query<RewardStatusResponseProps, void>({
      query: () => '/premium/getPremiumStatus',
      providesTags: ['premium'],
    }),
  }),
});

startListening({
  matcher: isAnyOf(
    premiumApi.endpoints.purchasePremium.matchFulfilled,
    premiumApi.endpoints.activatePremium.matchFulfilled,
  ),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(userApi.util.invalidateTags(['premium']));
  },
});
export const {
  usePurchasePremiumMutation,
  useActivatePremiumMutation,
  useGetPremiumStatusQuery,
} = premiumApi;
