import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {MatchStatsProps} from '../../staticTypes';

interface StartingPointDataProps {
  startingGameID: number;
  startingGameTime: number;
  matchData: MatchStatsProps[];
  points: number;
}

export const fetchStartingPointData = createAsyncThunk(
  'fetchStartingPointData',
  async (steamID32: string): Promise<StartingPointDataProps> => {
    const response = await axios.get(
      `https://sleepy-badlands-00627.herokuapp.com/recentMatches/startingMatchData/${steamID32}`,
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
      `https://sleepy-badlands-00627.herokuapp.com/recentMatches/getMatches/${arg.steamID32}/${arg.fromThisTime}`,
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
  data: {startingGameID: 0, startingGameTime: 0, matchData: [], points: 0},
  status: 'idle',
  error: null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: userDataState,
  reducers: {
    addPoints: (state, action) => {
      console.log('REDUCER', action.payload);
      state.data.points += action.payload;
    },
    resetPointsDev: state => {
      state.data.points = 0;
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
        state.status = 'fulfilled';
      })
      .addCase(fetchRecentGamesData.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchRecentGamesData.fulfilled, (state, action) => {
        const matches = action.payload;
        if (matches.length > 1) {
          state.data.matchData = matches.slice(1);
        } else {
          state.data.matchData = [];
        }
        state.status = 'fulfilled';
      });
  },
});

export const {addPoints, resetPointsDev} = userDataSlice.actions;
export default userDataSlice.reducer;
