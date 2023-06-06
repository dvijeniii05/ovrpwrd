import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ResponseType} from 'axios';

export interface LeagueData {
  leagueName: string;
  endData: number;
  pointsRequired: number;
  lootDescription: string;
  lootImage: string;
  sponsorInformation: string;
}

export interface UserDataArgProps {
  email: string;
  displayName: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://ovrpwrd-backend.herokuapp.com'}),
  endpoints: builder => ({
    getCurentLeagues: builder.query<LeagueData, void>({
      query: () => `/currentLeagues`,
    }),
    registerUser: builder.query<ResponseType, UserDataArgProps>({
      query: args => `/userAuth/registerUser/${args.email}/${args.displayName}`,
    }),
  }),
});

export const {useGetCurentLeaguesQuery, useRegisterUserQuery} = apiSlice;
