import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const cardIdApi = createApi({
  reducerPath: 'cardIdApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Card'],
  endpoints: builder => ({
    getCurrentCardId: builder.query({
      query: (id: string) => ({
        url: `/cards/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Card', id }],
    }),

    updateCard: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/cards/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Card', id }],
    }),
  }),
});

export const { useGetCurrentCardIdQuery, useUpdateCardMutation } = cardIdApi;
