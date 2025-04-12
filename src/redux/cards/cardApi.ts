import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Card'],
  endpoints: builder => ({
    getCards: builder.query({
      query: ({ page, perPage, role }) => ({
        url: `cards?page=${page}&perPage=${perPage}&role=${role}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCardsQuery } = cardApi;
