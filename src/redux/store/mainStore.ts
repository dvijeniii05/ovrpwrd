import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userData from '../slices/userDataSlice';
import { apiSlice } from '../query/apiSlice';
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
import { listenerMiddleware } from '../query/listenerMiddleware';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [apiSlice.reducerPath],
};

const appReducer = combineReducers({
  userData,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createDebugger = require('redux-flipper').default;

export const mainStore = configureStore({
  reducer: persistedReducer, //replace with persistedReducer when cache driven development needed
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .prepend(listenerMiddleware.middleware)
      .concat(createDebugger(), apiSlice.middleware),
});

export const customDispatch = (action: any) => mainStore.dispatch(action);

export const persistor = persistStore(mainStore);

export type RootState = ReturnType<typeof mainStore.getState>;

export type AppDispatch = typeof mainStore.dispatch;
