import {configureStore} from '@reduxjs/toolkit';
import steamAuthReducer from '../slices/steamAuthSlice';
import {apiSlice} from '../query/apiSlice';

const createDebugger = require('redux-flipper').default;

export const mainStore = configureStore({
  reducer: {
    steamAuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createDebugger(), apiSlice.middleware),
});

export type RootState = ReturnType<typeof mainStore.getState>;

export type AppDispatch = typeof mainStore.dispatch;
