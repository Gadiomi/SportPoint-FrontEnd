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
    logout: state => {
      state.isLogin = false;

      // Очистка куків
      Cookies.remove(CookiesKey.TOKEN, { path: '/' });
      Cookies.remove(CookiesKey.REFRESH_TOKEN, { path: '/' });
      Cookies.remove(CookiesKey.TOKEN_F, { path: '/' });
      Cookies.remove(CookiesKey.REFRESH_TOKEN_F, { path: '/' });

      // Очистка localStorage
      localStorage.removeItem('isLogin');
    },
  },
});

export const { setIsLogin, logout } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
