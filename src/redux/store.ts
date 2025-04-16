import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './user/userApi';
import { userReducer } from './user/userProfileSlice';
import { passwordApi } from './password/passwordApi';
import { editProfileReducer } from './user/editProfileSlice';
import { cardApi } from './cards/cardApi';
import { cardsApi } from './cards/cardsApi';
import { cardIdApi } from './details/cardIdApi';

// Store
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    user: userReducer,
    editProfile: editProfileReducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
    [cardIdApi.reducerPath]: cardIdApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      userApi.middleware,
      passwordApi.middleware,
      cardApi.middleware,
      cardsApi.middleware,
      cardIdApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
