import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoginState {
  isLogin: boolean;
}

const initialState: ILoginState = { isLogin: false };

const loginSlice = createSlice({
  name: 'setLogin',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setIsLogin } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
