import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getCards: builder.query({
      query: ({
        page = 1,
        perPage = 4,
        role,
        address,
        minPrice,
        maxPrice,
        sort,
        abilities,
      }) => ({
        url: '/cards',
        method: 'GET',
        params: {
          page,
          perPage,
          role,
          address,
          minPrice,
          maxPrice,
          sort,
          abilities,
        },
      }),
    }),
  }),
});

export const { useGetCardsQuery } = cardsApi;
