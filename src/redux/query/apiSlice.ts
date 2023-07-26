import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseType } from 'axios';
import { devBaseUrl } from '../../constans/urls';

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
  baseQuery: fetchBaseQuery({ baseUrl: devBaseUrl }),
  endpoints: builder => ({
    getCurentLeagues: builder.query<LeagueData, void>({
      query: () => `/currentLeagues`,
    }),
  }),
});

export const { useGetCurentLeaguesQuery } = apiSlice;
