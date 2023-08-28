import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MatchStatsProps } from '../../staticTypes';
import { calculatePoints } from '../../utils/pointCalculation/pointCalculation';
import { devBaseUrl } from '../../constans/urls';

interface StartingPointDataProps {
  isAuthed: boolean;
  email: string;
  displayName: string;
  steamID: string;
  token: string;
  bottomSheetState: {
    isOpen: boolean;
    type: string;
  };
  dob: string;
  gender: string;
  country: string;
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
    bottomSheetState: {
      isOpen: false,
      type: '',
    },
    dob: '',
    gender: '',
    country: '',
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
    openBottomSheet: (state, action) => {
      state.data.bottomSheetState = {
        ...action.payload,
      };
    },
    closeBottomSheet: state => {
      state.data.bottomSheetState.isOpen = false;
    },
    updateUserDetails: (state, action) => {
      const payloadDetails = action.payload;
      state.data = {
        ...state.data,
        ...payloadDetails,
      };
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
  updateUserDetails,
} = userDataSlice.actions;
export default userDataSlice.reducer;
