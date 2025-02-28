import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
