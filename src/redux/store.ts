import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './user/userApi';
import { userReducer } from './user/userProfileSlice';
import { passwordApi } from './password/passwordApi';
import { editProfileReducer } from './user/editProfileSlice';
import { cardApi } from './cards/cardApi';
import { byNameApi } from './searchByName/searchByNameApi';
import { cardsApi } from './cards/cardsApi';
import { scheduleApi } from './schedule/scheduleApi';
import { cardIdApi } from './details/cardIdApi';
import { favoritesApi } from './details/favoritesApi';
import { loginReducer } from './auth/loginSlice';
import { searchApi } from './search/searchApi';

// Store
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
    [byNameApi.reducerPath]: byNameApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    user: userReducer,
    editProfile: editProfileReducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
    [cardIdApi.reducerPath]: cardIdApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    setLogin: loginReducer,
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
      byNameApi.middleware,
      cardsApi.middleware,
      scheduleApi.middleware,
      cardIdApi.middleware,
      favoritesApi.middleware,
      searchApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
