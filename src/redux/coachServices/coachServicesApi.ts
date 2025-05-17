import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export type Service = {
  _id: string;
  name: string;
  description?: string;
  amount?: number;
  image?: string;
};

type GetCoachServicesResponse = {
  status: number;
  message: string;
  data: {
    data: Service[];
    totalItems: number;
  };
};

export const coachServicesApi = createApi({
  reducerPath: 'coachServices',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['coachServices'],
  endpoints: builder => ({
    getCoachServices: builder.query<GetCoachServicesResponse, void>({
      query: () => ({
        url: `/services`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCoachServicesQuery } = coachServicesApi;
