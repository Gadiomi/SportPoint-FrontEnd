import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['UserProfile'],
  endpoints: builder => ({
    getUserProfile: builder.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      providesTags: ['UserProfile'],
    }),

    updateUserProfile: builder.mutation({
      query: userData => ({
        url: '/profile',
        method: 'PATCH',
        data: userData,
      }),
      invalidatesTags: ['UserProfile'], // Оновлення даних після зміни профілю
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
