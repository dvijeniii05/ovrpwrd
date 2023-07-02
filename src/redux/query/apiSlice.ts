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

export interface UserRegisterDataArgProps {
  email: string;
  displayName: string;
}

export interface UserSteamLinkProps {
  email: string;
  steamID32: string;
}

export interface ResponseProps {
  message: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://ovrpwrd-backend.herokuapp.com'}),
  endpoints: builder => ({
    getCurentLeagues: builder.query<LeagueData, void>({
      query: () => `/currentLeagues`,
    }),
    registerUser: builder.query<ResponseProps, UserRegisterDataArgProps>({
      query: args => `/userAuth/registerUser/${args.email}/${args.displayName}`,
    }),
    linkSteamID: builder.query<ResponseProps, UserSteamLinkProps>({
      query: args => `/userAuth/linkSteam/${args.email}/${args.steamID32}`,
    }),
  }),
});

export const {
  useGetCurentLeaguesQuery,
  useRegisterUserQuery,
  useLinkSteamIDQuery,
} = apiSlice;
