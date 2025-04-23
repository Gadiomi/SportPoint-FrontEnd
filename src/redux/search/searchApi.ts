import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';
import { SearchResponse } from '@/types';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Search'],
  endpoints: builder => ({
    search: builder.query<SearchResponse, string>({
      query: query => ({
        url: `search/by-name?name=${query}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazySearchQuery } = searchApi;
