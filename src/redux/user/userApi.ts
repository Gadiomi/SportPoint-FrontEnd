import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getUserProfile: builder.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),

    deleteUserProfile: builder.mutation({
      query: () => ({
        url: '/profile',
        method: 'DELETE',
      }),
    }),

    updateUserProfile: builder.mutation({
      query: userData => ({
        url: '/profile',
        method: 'PATCH',
        data: userData,
      }),
    }),

    createUserProfile: builder.mutation({
      query: userData => ({
        url: '/profile',
        method: 'POST',
        data: userData,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useDeleteUserProfileMutation,
  useUpdateUserProfileMutation,
  useCreateUserProfileMutation,
} = userApi;
