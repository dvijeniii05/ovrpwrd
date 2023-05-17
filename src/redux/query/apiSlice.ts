import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
  endpoints: builder => ({
    //swap this query to asyncthunk
    getSingleMatchData: builder.query({
      query: (matchID: string) => `/matches/${matchID}`,
    }),
    getCurentLeagues: builder.query<LeagueData, void>({
      query: () => `/currentLeagues`,
    }),
  }),
});

export const {useGetCurentLeaguesQuery} = apiSlice;
