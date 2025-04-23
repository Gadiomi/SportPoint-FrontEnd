import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Favorites'],
  endpoints: builder => ({
    addToFavorites: builder.mutation({
      query: ({ id, data }) => ({
        url: `/favorites/${id}`,
        method: 'POST',
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Favorites', id }],
    }),
    getFavorites: builder.query<any, { role: string }>({
      query: ({ role }) => ({
        url: `/favorites?role=${role}`,
        method: 'GET',
      }),
      providesTags: ['Favorites'],
    }),
    removeFromFavorites: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Favorites', id }],
    }),
  }),
});

export const {
  useAddToFavoritesMutation,
  useGetFavoritesQuery,
  useRemoveFromFavoritesMutation,
} = favoritesApi;
