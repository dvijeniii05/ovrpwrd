import {combineReducers, configureStore} from '@reduxjs/toolkit';
import steamAuth from '../slices/steamAuthSlice';
import userData from '../slices/userDataSlice';
import {apiSlice} from '../query/apiSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [apiSlice.reducerPath],
};

const rootReducer = combineReducers({
  steamAuth,
  userData,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createDebugger = require('redux-flipper').default;

export const mainStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(createDebugger(), apiSlice.middleware),
});

export const persistor = persistStore(mainStore);

export type RootState = ReturnType<typeof mainStore.getState>;

export type AppDispatch = typeof mainStore.dispatch;
