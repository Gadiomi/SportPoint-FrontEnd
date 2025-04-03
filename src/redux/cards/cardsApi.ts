import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getCoachCards: builder.query({
      query: ({ page = 1, perPage = 4 }) => ({
        url: '/cards',
        method: 'GET',
        params: {
          page,
          perPage,
          'filter.role': 'coach',
        },
      }),
    }),

    getClubCards: builder.query({
      query: ({ page = 1, perPage = 4 }) => ({
        url: '/cards',
        method: 'GET',
        params: {
          page,
          perPage,
          'filter.role': 'adminClub',
        },
      }),
    }),
  }),
});

export const { useGetCoachCardsQuery, useGetClubCardsQuery } = cardsApi;
