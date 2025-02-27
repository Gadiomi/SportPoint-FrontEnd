import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';

export const authApi = createApi({
  reducerPath: 'Auth',
  baseQuery: axiosBaseQuery({
    baseURL: 'https://readjourney.b.goit.study/api/',
  }),
  endpoints: (builder: any) => ({
    register: builder.mutation({
      query: (userData: { name: string; email: string; password: string }) => ({
        url: 'users/signup',
        method: 'POST',
        data: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData: { email: string; password: string }) => ({
        url: 'users/signin',
        method: 'POST',
        data: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
