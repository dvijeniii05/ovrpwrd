import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {MatchStatsProps} from '../../staticTypes';
import {calculatePoints} from '../../utils/pointCalculation/pointCalculation';

interface StartingPointDataProps {
  email: string;
  displayName: string;
  firstEverGameID: number;
  firstEverGameTime: number;
  startingGameID: number;
  startingGameTime: number;
  matchData: MatchStatsProps[];
  points: number;
}

export const fetchStartingPointData = createAsyncThunk(
  'fetchStartingPointData',
  async (steamID32: string): Promise<StartingPointDataProps> => {
    const response = await axios.get(
      `https://ovrpwrd-backend.herokuapp.com/recentMatches/startingMatchData/${steamID32}`,
    );
    console.log(response.data);
    return response.data;
  },
);

export const fetchRecentGamesData = createAsyncThunk(
  'fetchRecentGamesData',
  async (arg: {
    steamID32: string;
    fromThisTime: string;
  }): Promise<MatchStatsProps[]> => {
    const response = await axios.get(
      `https://ovrpwrd-backend.herokuapp.com/recentMatches/getMatches/${arg.steamID32}/${arg.fromThisTime}`,
    );
    return response.data;
  },
);

export const fetchCustomMatchData = createAsyncThunk(
  'fetchCustomMatchData',
  async (arg: {
    matchID: string;
  }): Promise<{startDateTime: number; id: number}> => {
    const response = await axios.get(
      `https://ovrpwrd-backend.herokuapp.com/recentMatches/getCustomMatch/${arg.matchID}`,
    );
    return response.data;
  },
);

export interface userDataStateProps {
  data: StartingPointDataProps;
  status: string;
  error: null | string;
}

const userDataState: userDataStateProps = {
  data: {
    email: '',
    displayName: '',
    firstEverGameID: 0,
    firstEverGameTime: 0,
    startingGameID: 0,
    startingGameTime: 0,
    matchData: [],
    points: 0,
  },
  status: 'idle',
  error: null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: userDataState,
  reducers: {
    updateUserInfo: (state, action) => {
      console.log('UPDATE_USERINFO_REDUCER_CALLED', action.payload);
      const {email, displayName} = action.payload;
      state.data.email = email;
      state.data.displayName = displayName;
    },
    addPoints: (state, action) => {
      console.log('ADD_POINTS_REDUCER_CALLED', action.payload);
      state.data.points += action.payload;
    },
    resetPointsDev: state => {
      console.log('RESET_POINTS_REDUCER_CALLED');
      state.data.points *= 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStartingPointData.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchStartingPointData.fulfilled, (state, action) => {
        const {startingGameID, startingGameTime} = action.payload;
        state.data.startingGameID = startingGameID;
        state.data.startingGameTime = startingGameTime;
        state.data.firstEverGameID = startingGameID;
        state.data.firstEverGameTime = startingGameTime;
        state.status = 'fulfilled';
      })
      .addCase(fetchStartingPointData.rejected, state => {
        state.status = 'fulfilled';
      })
      .addCase(fetchRecentGamesData.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchRecentGamesData.fulfilled, (state, action) => {
        const matches = action.payload;
        console.log(
          'HOW_MANY_MATHCES',
          matches.length - 1,
          matches.slice(0, -1).length,
        );
        if (matches.length > 1) {
          const newMatches = matches.slice(0, -1);
          state.data.matchData = newMatches;
          state.data.startingGameTime = matches[0].startDateTime;
          state.data.startingGameID = matches[0].id;
          state.data.points += calculatePoints(newMatches);
        } else {
          state.data.matchData = [];
        }
        state.status = 'fulfilled';
      })
      .addCase(fetchRecentGamesData.rejected, state => {
        state.status = 'fulfilled';
      })
      .addCase(fetchCustomMatchData.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchCustomMatchData.fulfilled, (state, action) => {
        const {startDateTime, id} = action.payload;
        if (startDateTime > 0) {
          state.data.startingGameTime = startDateTime;
          state.data.startingGameID = id;
          state.status = 'fulfilled';
        } else {
          state.status = 'rejected';
          state.error = 'Game ID is incorrect';
        }
      })
      .addCase(fetchCustomMatchData.rejected, state => {
        state.status = 'fulfilled';
      });
  },
});

export const {updateUserInfo, addPoints, resetPointsDev} =
  userDataSlice.actions;
export default userDataSlice.reducer;
