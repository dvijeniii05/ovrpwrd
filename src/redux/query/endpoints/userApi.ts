import { ParsedMatch } from '../../../constans/interfaces';
import { updateAuthStatus } from '../../slices/userDataSlice';
import { apiSlice } from '../apiSlice';
import { startListening } from '../listenerMiddleware';

export interface ResponseProps {
  message: string;
}

export interface UserRegisterArgProps {
  email: string;
  displayName: string;
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
  email: string;
  steamID32: string;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    registerUser: builder.query<ResponseProps, UserRegisterArgProps>({
      query: args => `/userAuth/registerUser/${args.email}/${args.displayName}`,
    }),
    getUserStats: builder.query<UserStatsResponseProps, UserRequestProps>({
      query: args => `/userAuth/getUserStats/${args.email}`,
    }),
    linkSteamID: builder.query<ResponseProps, UserSteamLinkProps>({
      query: args => `/userAuth/linkSteam/${args.email}/${args.steamID32}`,
    }),
  }),
});

export const {
  useRegisterUserQuery,
  useGetUserStatsQuery,
  useLinkSteamIDQuery,
} = userApi;

startListening({
  matcher: userApi.endpoints.linkSteamID.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(updateAuthStatus(true));
    //listener triggered too often
  },
});
