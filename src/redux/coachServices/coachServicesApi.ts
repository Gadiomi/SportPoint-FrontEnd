import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export type Service = {
  _id?: string;
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
    postCoachServices: builder.mutation<any, FormData>({
      query: formData => ({
        url: `/services`,
        method: 'POST',
        data: formData,
      }),
    }),
    deleteCoachServices: builder.mutation<any, string>({
      query: id => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCoachServicesQuery,
  usePostCoachServicesMutation,
  useDeleteCoachServicesMutation,
} = coachServicesApi;
