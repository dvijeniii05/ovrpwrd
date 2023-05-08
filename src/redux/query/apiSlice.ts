import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface BeforeFirstMatchData {
  lastGameId: number;
  lastGameTime: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
  endpoints: builder => ({
    //swap this query to asyncthunk

    getStartingFromMatchData: builder.query<BeforeFirstMatchData, string>({
      query: steamID32 => `/recentMatches/startingMatchData/${steamID32}`,
    }),
    getSingleMatchData: builder.query({
      query: (matchID: string) => `/matches/${matchID}`,
    }),
  }),
});

export const {useGetStartingFromMatchDataQuery} = apiSlice;
