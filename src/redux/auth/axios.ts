import { CookiesKey } from '@/constants';
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get(CookiesKey.REFRESH_TOKEN);
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.get('/auth/refresh/current', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { accessToken, newRefreshToken } = response.data;
    Cookies.set(CookiesKey.TOKEN, accessToken, { expires: 1 });
    Cookies.set(CookiesKey.REFRESH_TOKEN, newRefreshToken, { expires: 7 });

    return accessToken;
  } catch (error) {
    throw new Error('Failed to refresh access token');
  }
};

axiosInstance.interceptors.request.use(
  config => {
    const token = Cookies.get(CookiesKey.TOKEN);
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
        return axiosInstance(originalRequest);
      } catch (refreshError) {
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
