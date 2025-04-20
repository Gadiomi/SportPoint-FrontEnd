import { UserProfile } from '@/types/userProfile';
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from './userApi';

type InitialState = {
  user: UserProfile | null;
  initDataRaw: string;
  isLoading: boolean;
  userCommentId?: string;
};

const initialState: InitialState = {
  user: null,
  initDataRaw: '',
  isLoading: false,
  userCommentId: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action.payload;
      state.userCommentId = action.payload.userCommentId;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.getUserProfile.matchPending, state => {
        state.isLoading = true;
      })
      .addMatcher(
        userApi.endpoints.getUserProfile.matchFulfilled,
        (state, action) => {
          state.user = action.payload.userProfile;
          state.userCommentId = action.payload.userProfile.userCommentId;
          state.isLoading = false;
        },
      );
    builder
      .addMatcher(userApi.endpoints.updateUserProfile.matchPending, state => {
        state.isLoading = true;
      })
      .addMatcher(
        userApi.endpoints.updateUserProfile.matchFulfilled,
        (state, action) => {
          state.user = action.payload.userProfile;
          state.userCommentId = action.payload.userProfile.userCommentId;
          state.isLoading = false;
        },
      )
      .addMatcher(userApi.endpoints.updateUserProfile.matchRejected, state => {
        state.isLoading = false;
      });
  },
});

export const userActions = userSlice.actions;
export const { setUserProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
