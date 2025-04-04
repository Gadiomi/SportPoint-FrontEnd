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
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      userApi.endpoints.getUserProfile.matchFulfilled,
      (state, action) => {
        console.log(action.payload.userProfile);

        state.user = action.payload.userProfile;
      },
    );
    builder.addMatcher(
      userApi.endpoints.updateUserProfile.matchFulfilled,
      (state, action) => {
        state.user = action.payload.userProfile;
      },
    );
  },
});

export const userActions = userSlice.actions;
export const { setUserProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
