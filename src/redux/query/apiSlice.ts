import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { devBaseUrl } from '../../constans/urls';
import { getToken } from '../store/getTokenHelper';
import { leaugeNames } from '../../constans/interfaces';

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
    baseUrl: devBaseUrl,
    prepareHeaders: async headers => {
      // const token = getToken();
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZGlrYnN3QGdtYWlsLmNvbSIsImlhdCI6MTY5NTc1MDY3M30.ZLtkz2ZAGWXPnugqHjGZppecpSesOwyTjZlXnB974uI`;
      console.log('TOKEN', token);
      headers.set('authorization', `${token}`);
      return headers;
    },
  }),
  keepUnusedDataFor: 500,
  endpoints: builder => ({
    getCurentLeagues: builder.query<LeagueData[], void>({
      query: () => `/currentLeagues`,
    }),
    getUserCountOnLeagues: builder.query<UserCountOnLeagues, void>({
      query: () => `/currentLeagues/userCountOnLeagues`,
    }),
    getLeaderboard: builder.query<LeaderboardUser[], void>({
      query: () => `/leaderboard`,
    }),
  }),
});

export const {
  useGetCurentLeaguesQuery,
  useGetUserCountOnLeaguesQuery,
  useGetLeaderboardQuery,
} = apiSlice;
