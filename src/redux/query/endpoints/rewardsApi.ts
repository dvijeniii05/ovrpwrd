import { apiSlice } from '../apiSlice';

export interface RewardRequestProps {
  claimId: 'left' | 'mid' | 'right';
  reward: number;
}

export interface RewardStatusResponseProps {
  rewards: {
    leftGiftClaimedDate: number;
    midGiftClaimedDate: number;
    rightGiftClaimedDate: number;
  };
}

export const rewardsApi = apiSlice.injectEndpoints({
  endpoints: buidler => ({
    claimReward: buidler.mutation<void, RewardRequestProps>({
      query: arg => ({
        url: '/claimReward',
        body: arg,
        method: 'PATCH',
      }),
      invalidatesTags: ['leaderboard'],
    }),
    getRewardsStatus: buidler.query<RewardStatusResponseProps, void>({
      query: () => '/claimReward/getRewardsStatus',
      providesTags: ['rewards'],
    }),
  }),
});

export const { useClaimRewardMutation, useGetRewardsStatusQuery } = rewardsApi;
