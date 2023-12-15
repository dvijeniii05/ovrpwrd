import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { devBaseUrl, prodBaseUrl } from '../../constans/urls';
import { getToken } from '../store/getTokenHelper';
import { leaugeNames } from '../../constans/interfaces';
import { Product } from './endpoints/productsApi';

export interface UserCountOnLeagues {
  legendary: number;
  mythical: number;
  immortal: number;
}

export interface LastTimeWinner {
  winnerName: string;
  prizeName: string;
  prizeValue: number;
  prizeImageUrl: string;
  season: string;
}

export interface LeaguePrize {
  prizeBrand: string;
  prizeName: string;
  prizeDescription: string;
  imageUrl: string;
  isPremium: boolean;
  linkToProduct: string;
}

export interface LeagueData {
  season: number;
  leagueName: leaugeNames;
  endDate: number;
  pointsMin: number;
  pointsMax: number;
  prizes: LeaguePrize[];
  sponsorInformation?: string;
  lastTimeWinner: LastTimeWinner;
}

export interface LeaderboardUser {
  nickname: string;
  perks: number;
  avatar: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: prodBaseUrl,
    prepareHeaders: async headers => {
      const token = getToken();
      // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZGlrYnN3QGdtYWlsLmNvbSIsImlhdCI6MTY5NTc1MDY3M30.ZLtkz2ZAGWXPnugqHjGZppecpSesOwyTjZlXnB974uI`;
      console.log('LOCAL_TOKEN', token);
      headers.set('authorization', `${token}`);
      return headers;
    },
  }),
  tagTypes: ['allProducts', 'userStats', 'userDetails', 'leaderboard'],
  keepUnusedDataFor: 6000,
  endpoints: builder => ({
    getCurentLeagues: builder.query<LeagueData[], void>({
      query: () => `/currentLeagues`,
    }),
    getUserCountOnLeagues: builder.query<UserCountOnLeagues, void>({
      query: () => `/currentLeagues/userCountOnLeagues`,
    }),
    getLeaderboard: builder.query<LeaderboardUser[], void>({
      query: () => `/leaderboard`,
      providesTags: ['leaderboard'],
    }),
  }),
});

export const {
  useGetCurentLeaguesQuery,
  useGetUserCountOnLeaguesQuery,
  useGetLeaderboardQuery,
} = apiSlice;
