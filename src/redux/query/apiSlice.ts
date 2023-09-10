import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { devBaseUrl } from '../../constans/urls';
import { getToken } from '../store/getTokenHelper';

export interface LeagueData {
  leagueName: string;
  endData: number;
  pointsRequired: number;
  lootDescription: string;
  lootImage: string;
  sponsorInformation: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: devBaseUrl,
    prepareHeaders: async headers => {
      const token = getToken();
      headers.set('authorization', `${token}`);
      return headers;
    },
  }),
  keepUnusedDataFor: 500,
  endpoints: builder => ({
    getCurentLeagues: builder.query<LeagueData, void>({
      query: () => `/currentLeagues`,
    }),
  }),
});

export const { useGetCurentLeaguesQuery } = apiSlice;
