import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MatchStatsProps } from '../../staticTypes';
import { calculatePoints } from '../../utils/pointCalculation/pointCalculation';
import { devBaseUrl } from '../../constans/urls';

interface StartingPointDataProps {
  isAuthed: boolean;
  email: string;
  displayName: string;
  steamID: string;
  token: string;
  isBottomSheetOpen: boolean;
  dob: string;
  // matchData: MatchStatsProps[];
}

export interface userDataStateProps {
  data: StartingPointDataProps;
  status: string;
  error: null | string;
}

const userDataState: userDataStateProps = {
  data: {
    isAuthed: false,
    email: '',
    displayName: '',
    steamID: '',
    token: '',
    isBottomSheetOpen: false,
    dob: '',
    // matchData: [],
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
      const { email, displayName } = action.payload;
      state.data.email = email;
      state.data.displayName = displayName;
    },
    addSteamID: (state, action) => {
      state.data.steamID = action.payload;
    },
    addPoints: (state, action) => {
      console.log('ADD_POINTS_REDUCER_CALLED', action.payload);
      const points = calculatePoints(action.payload);
      // state.data.points += points;
    },
    updateAuthStatus: (state, action: { payload: boolean; type: string }) => {
      state.data.isAuthed = action.payload;
    },
    updateToken: (state, action) => {
      state.data.token = action.payload.token;
    },
    openBottomSheet: state => {
      state.data.isBottomSheetOpen = true;
    },
    closeBottomSheet: state => {
      state.data.isBottomSheetOpen = false;
    },
    addDOB: (state, action) => {
      state.data.dob = action.payload;
    },
  },
});

export const {
  updateUserInfo,
  addSteamID,
  addPoints,
  updateAuthStatus,
  updateToken,
  openBottomSheet,
  closeBottomSheet,
  addDOB,
} = userDataSlice.actions;
export default userDataSlice.reducer;
