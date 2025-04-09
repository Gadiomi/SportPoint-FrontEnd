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
        city,
        priceFrom,
        priceTo,
        sortBy,
        classification,
      }) => ({
        url: '/cards',
        method: 'GET',
        params: {
          page,
          perPage,
          role,
          city,
          priceFrom,
          priceTo,
          sortBy,
          classification,
        },
      }),
    }),
  }),
});

export const { useGetCardsQuery } = cardsApi;
