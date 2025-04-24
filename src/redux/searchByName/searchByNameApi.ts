import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const byNameApi = createApi({
  reducerPath: 'searchByNameApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Search'],
  endpoints: builder => ({
    getByName: builder.query({
      query: ({ name, role }) => ({
        url: `search/by-name?name=${name}&role=${role}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetByNameQuery } = byNameApi;
