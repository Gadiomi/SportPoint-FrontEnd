import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CookiesKey } from '@/constants';
import Cookies from 'js-cookie';

interface ILoginState {
  isLogin: boolean;
}

const loadLoginState = (): boolean => {
  if (typeof window !== 'undefined') {
    const tokenFront = Cookies.get(CookiesKey.TOKEN_F);
    const refreshTokenFront = Cookies.get(CookiesKey.REFRESH_TOKEN_F);
    // console.log('tokenFront:', tokenFront, ' refreshTokenFront:', refreshTokenFront);
    if (!tokenFront || !refreshTokenFront) return false;
    return localStorage.getItem('isLogin') === 'true';
  }
  return false;
};

const initialState: ILoginState = {
  isLogin: loadLoginState(),
};

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
