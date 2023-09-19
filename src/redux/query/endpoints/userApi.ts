import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import { ParsedMatch } from '../../../constans/interfaces';
import { updateUserDetails, updateToken } from '../../slices/userDataSlice';
import { apiSlice } from '../apiSlice';
import { startListening } from '../listenerMiddleware';

export interface AuthResponseProps {
  token: string | undefined;
  message?: string;
  startingGameID?: number;
}

export interface UserLoginResponseProps {
  token: string | undefined;
  isFullyOnboarded: boolean;
}

export interface UserRegisterArgProps {
  email: string;
  fullName: string;
  nickname: string;
  dob: string;
  gender: string;
  country: string;
  avatar: string;
}

export interface UserRequestProps {
  email: string;
}

export interface UserStatsResponseProps {
  currentPoints: {
    currentPerks: number;
    currentRelics: number;
  };
  lastTenMatches: ParsedMatch[];
}

export interface UserSteamLinkProps {
  steamID32: string;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    registerUser: builder.mutation<
      AuthResponseProps,
      Partial<UserRegisterArgProps>
    >({
      query: userDetails => ({
        url: '/userAuth/registerUser',
        method: 'POST',
        body: userDetails,
        validateStatus: response =>
          (response.status >= 200 && response.status <= 299) ||
          response.status === 422,
      }),
    }),
    loginUser: builder.query<UserLoginResponseProps, { email: string }>({
      query: args => ({
        url: `/userAuth/loginUser/${args.email}`,
        validateStatus: response =>
          (response.status >= 200 && response.status <= 299) ||
          response.status === 404,
      }),
    }),
    updateUserDetails: builder.mutation<
      Partial<AuthResponseProps>,
      Partial<UserRegisterArgProps>
    >({
      query: args => ({
        url: `/userAuth/updateUserDetails`,
        method: 'PATCH',
        body: args,
      }),
    }),
    linkSteamID: builder.query<AuthResponseProps, UserSteamLinkProps>({
      query: args => `/userAuth/linkSteam/${args.steamID32}`,
    }),
    getUserStats: builder.query<UserStatsResponseProps, UserRequestProps>({
      query: args => `/userAuth/getUserStats/${args.email}`,
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserQuery,
  useUpdateUserDetailsMutation,
  useGetUserStatsQuery,
  useLinkSteamIDQuery,
} = userApi;

startListening({
  matcher: userApi.endpoints.linkSteamID.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(updateUserDetails({ isGameLinked: true }));
    //listener triggered too often
  },
});