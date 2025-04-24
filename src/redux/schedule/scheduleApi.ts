import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Schedule'],
  endpoints: builder => ({
    addSchedule: builder.mutation({
      query: workoutPlans => ({
        url: '/workoutPlan',
        method: 'POST',
        data: workoutPlans,
      }),
    }),
    deleteSchedule: builder.mutation({
      query: id => ({
        url: `/workoutPlan/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useAddScheduleMutation, useDeleteScheduleMutation } =
  scheduleApi;
