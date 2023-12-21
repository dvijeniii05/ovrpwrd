import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { userApi } from '../query/endpoints/userApi';

interface StartingPointDataProps {
  isGameLinked: boolean;
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
    isGameLinked: false,
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
    openBottomSheet: (state, action) => {
      state.data.bottomSheetState = {
        ...action.payload,
      };
    },
    closeBottomSheet: state => {
      state.data.bottomSheetState.isOpen = false;
    },
    updateUserDetails: (
      state,
      action: { payload: Partial<StartingPointDataProps> },
    ) => {
      const payloadDetails = action.payload;
      state.data = {
        ...state.data,
        ...payloadDetails,
      };
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        userApi.endpoints.registerUser.matchFulfilled,
        userApi.endpoints.loginUser.matchFulfilled,
      ),
      (state, { payload }) => {
        console.log('PAYLOAD_CHECK', payload);
        if (payload !== null && payload.token) {
          state.data.token = payload.token;
        } else {
          state.data.token = '';
        }
      },
    );
  },
});

export const { openBottomSheet, closeBottomSheet, updateUserDetails } =
  userDataSlice.actions;
export default userDataSlice.reducer;
