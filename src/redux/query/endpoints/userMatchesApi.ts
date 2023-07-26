import {devBaseUrl} from '../../../constans/urls';
import {MatchStatsProps} from '../../../staticTypes';
import {addPoints} from '../../slices/userDataSlice';
import {apiSlice} from '../apiSlice';

export interface StartingPointDataProps {
  email: string;
  displayName: string;
  firstEverGameID: number;
  firstEverGameTime: number;
  startingGameID: number;
  startingGameTime: number;
  matchData: MatchStatsProps[];
  points: number;
}

export const userMatchesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRecentMatches: builder.query<
      MatchStatsProps[],
      {steamID32: string; fromThisGame: string}
    >({
      query: args =>
        `/recentMatches/getMatches/${args.steamID32}/${args.fromThisGame}`,
      onQueryStarted: async (api, {dispatch, queryFulfilled}) => {
        try {
          const {data} = await queryFulfilled;
          dispatch(addPoints(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {useGetRecentMatchesQuery} = userMatchesApi;
