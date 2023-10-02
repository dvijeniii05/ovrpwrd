import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { devBaseUrl } from '../../constans/urls';
import { getToken } from '../store/getTokenHelper';

export interface LeagueData {
  season: number;
  leagueName: string;
  endDate: number;
  pointsMin: number;
  pointsMax: number;
  prizes: LeaguePrize[];
  sponsorInformation?: string;
  lastTimeWinner?: string;
}

export interface LeaguePrize {
  prizeName: string;
  prizeDescription: string;
  imageUrl: string;
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
    getLeaderboard: builder.query<LeaderboardUser[], void>({
      query: () => `/leaderboard`,
    }),
  }),
});

export const { useGetCurentLeaguesQuery, useGetLeaderboardQuery } = apiSlice;
