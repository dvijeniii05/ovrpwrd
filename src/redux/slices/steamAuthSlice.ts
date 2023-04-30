import {createSlice} from '@reduxjs/toolkit';

interface initialStateProps {
  steamID: null | string;
  status: 'idle' | 'fulfilled' | 'pending';
  error: null | string;
}

const initialState: initialStateProps = {
  steamID: null,
  status: 'idle',
  error: null,
};

const steamAuthSlice = createSlice({
  name: 'steamID',
  initialState,
  reducers: {
    setSteamID: (state, action) => {
      console.log('PAYLOAD', action.payload);
      state.steamID = action.payload;
      state.status = 'fulfilled';
    },
  },
});

export const {setSteamID} = steamAuthSlice.actions;
export default steamAuthSlice.reducer;
