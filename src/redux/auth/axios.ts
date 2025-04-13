import { CookiesKey } from '@/constants';
import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: 'https://sportpoint-backend.onrender.com',
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get(CookiesKey.REFRESH_TOKEN);
    if (!refreshToken) throw new Error('No refresh token available');

    console.log('[Refresh] RefreshToken:', refreshToken);

    const response = await axios.get(
      'https://sportpoint-backend.onrender.com/auth/refresh/current',
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    const { accessToken, newRefreshToken } = response.data;
    Cookies.set(CookiesKey.TOKEN, accessToken, {
      expires: 1,
      path: '/',
      sameSite: 'Strict',
    });
    Cookies.set(CookiesKey.REFRESH_TOKEN, newRefreshToken, {
      expires: 7,
      path: '/',
      sameSite: 'Strict',
    });

    console.log('[Refresh] Новий accessToken:', Cookies.get(CookiesKey.TOKEN));

    return accessToken;
  } catch (error) {
    console.error('[Refresh] Помилка при оновленні токена:', error);
    // Очистка старих токенів
    Cookies.remove(CookiesKey.TOKEN);
    Cookies.remove(CookiesKey.REFRESH_TOKEN);
    throw new Error('Failed to refresh access token');
  }
};

axiosInstance.interceptors.request.use(
  config => {
    const token = Cookies.get(CookiesKey.TOKEN);
    console.log('Token перед запитом:', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        console.log('[Retry] Повторний запит з токеном:', newAccessToken);
        return axios(originalRequest);
      } catch (refreshError) {
        console.error(
          '[Response] Помилка під час повторної авторизації:',
          refreshError,
        );
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const axiosBaseQuery = () => {
  return ({
    url,
    method,
    data,
    params,
  }: {
    url: string;
    method: string;
    data?: any;
    params?: any;
  }) => {
    return axiosInstance({ url, method, data, params })
      .then(response => ({ data: response.data }))
      .catch(error => ({ error: error.response?.data || error.message }));
  };
};
