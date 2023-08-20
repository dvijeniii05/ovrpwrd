import { ParsedMatch } from '../../../constans/interfaces';
import { updateAuthStatus, updateToken } from '../../slices/userDataSlice';
import { apiSlice } from '../apiSlice';
import { startListening } from '../listenerMiddleware';

export interface ResponseProps {
  message: string;
}

export interface UserRegisterArgProps {
  email: string;
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
    registerUser: builder.mutation<ResponseProps, UserRegisterArgProps>({
      query: userDetails => ({
        url: '/userAuth/registerUser',
        method: 'POST',
        body: userDetails,
      }),
      onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled; //SAVA response JWT to redux persisted store or AsyncStorage
        console.log(data);
        dispatch(updateToken(data));
      },
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
  useRegisterUserMutation,
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
