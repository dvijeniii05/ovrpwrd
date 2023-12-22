import { ParsedMatch } from '../../../constans/interfaces';
import { updateUserDetails } from '../../slices/userDataSlice';
import { apiSlice } from '../apiSlice';
import { startListening } from '../listenerMiddleware';

export interface AuthResponseProps {
  token: string | undefined;
  message?: string;
  latestGameId?: number;
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
  isFullyOnboarded?: boolean;
}

export interface PurchasedProduct {
  productThumbnailUrl: string;
  productBrand: string;
  productName: string;
  price: number;
  uniqueId: string;
  promoCode: string;
  date: string;
  productLink: string;
}

export interface UserDetailsResponseProps
  extends Omit<UserRegisterArgProps, 'gender' | 'country'> {
  steamID32: string;
  dota: {
    latestGameId: number;
  };
  purchases: PurchasedProduct[];
  rewards: {
    leftGiftClaimedDate: number;
    midGiftClaimedDate: number;
    rightGiftClaimedDate: number;
  };
}

export interface UserStatsResponseProps {
  currentPoints: {
    currentPerks: number;
    currentRelics: number;
  };
  significantMatches: ParsedMatch[];
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token !== undefined) {
            dispatch(updateUserDetails({ token: data.token }));
          }
        } catch {
          console.log('ERROR_ON_LOGIN');
        }
      },
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
    getUserStats: builder.query<UserStatsResponseProps, void>({
      query: () => `/userAuth/getUserStats`,
      providesTags: ['userStats'],
    }),
    getUserDetails: builder.query<UserDetailsResponseProps, void>({
      query: () => `/userAuth/getUserDetails`,
      providesTags: ['userDetails'],
    }),
    getUserCurrency: builder.query<{ perks: number; relics: number }, void>({
      query: () => `/userAuth/getUserCurrency`,
      providesTags: ['currency'],
    }),
  }),
});

startListening({
  matcher: userApi.endpoints.getUserStats.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(userApi.util.invalidateTags(['currency', 'premium']));
  },
});
export const {
  useRegisterUserMutation,
  useLoginUserQuery,
  useUpdateUserDetailsMutation,
  useGetUserStatsQuery,
  useGetUserDetailsQuery,
  useLinkSteamIDQuery,
  useGetUserCurrencyQuery,
  useLazyGetUserStatsQuery,
} = userApi;
