import { UserProfile } from '@/types/userProfile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from './userApi';

// Отримання збереженого профілю з localStorage (якщо є)
let savedUser: UserProfile | null = null;

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('userProfile');
  if (stored) {
    try {
      savedUser = JSON.parse(stored);
    } catch (error) {
      console.error('Помилка при парсингу userProfile з localStorage:', error);
    }
  }
}

type InitialState = {
  user: UserProfile | null;
  initDataRaw: string;
  isLoading: boolean;
  // userCommentId?: string;
};

const initialState: InitialState = {
  user: savedUser,
  initDataRaw: '',
  isLoading: false,
  // userCommentId: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      // Збереження профілю в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userProfile', JSON.stringify(action.payload));
      }
      // state.userCommentId = action.payload.userCommentId ?? undefined;
    },
    clearUserProfile: state => {
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userProfile');
      }
      // state.userCommentId = undefined;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearUserComments: state => {
      if (state.user) {
        state.user.user_comments = [];
      }
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addMatcher(userApi.endpoints.getUserProfile.matchPending, state => {
  //       state.isLoading = true;
  //     })
  //     .addMatcher(
  //       userApi.endpoints.getUserProfile.matchFulfilled,
  //       (state, action) => {
  //         state.user = action.payload.userProfile;
  //         state.userCommentId =
  //           action.payload.userProfile?.userCommentId ?? undefined;
  //         state.isLoading = false;
  //       },
  //     );
  //   builder
  //     .addMatcher(userApi.endpoints.updateUserProfile.matchPending, state => {
  //       state.isLoading = true;
  //     })
  //     .addMatcher(
  //       userApi.endpoints.updateUserProfile.matchFulfilled,
  //       (state, action) => {
  //         state.user = action.payload.userProfile;
  //         state.userCommentId =
  //           action.payload.userProfile?.userCommentId ?? undefined;
  //         state.isLoading = false;
  //       },
  //     )
  //     .addMatcher(userApi.endpoints.updateUserProfile.matchRejected, state => {
  //       state.isLoading = false;
  //     });
  // },
});

export const userActions = userSlice.actions;
export const {
  setUserProfile,
  clearUserProfile,
  setIsLoading,
  clearUserComments,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
