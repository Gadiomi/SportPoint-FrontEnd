import { UserProfile } from '@/types/userProfile';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { userApi } from './userApi';

type InitialState = {
  user: UserProfile | null;
  initDataRaw: string;
};

const initialState: InitialState = {
  user: null,
  initDataRaw: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      userApi.endpoints.getUserProfile.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
      },
    );
    builder.addMatcher(
      userApi.endpoints.updateUserProfile.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
      },
    );
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
