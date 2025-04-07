import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './user/userApi';
import { userReducer } from './user/userProfileSlice';
import { passwordApi } from './password/passwordApi';
import { editProfileReducer } from './user/editProfileSlice';

// Store
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
    editProfile: editProfileReducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(authApi.middleware, userApi.middleware, passwordApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
