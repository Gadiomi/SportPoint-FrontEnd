import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Schedule'],
  endpoints: builder => ({
    getSchedule: builder.query({
      query: editId => ({
        url: `/workoutPlan/${editId}`,
        method: 'GET',
      }),
      transformResponse: response => {
        return response.data?.[0];
      },
      providesTags: ['Schedule'],
    }),
    getAllSchedules: builder.query({
      query: () => ({
        url: `/workoutPlan`,
        method: 'GET',
      }),

      providesTags: ['Schedule'],
    }),
    addSchedule: builder.mutation({
      query: workoutPlans => ({
        url: '/workoutPlan',
        method: 'POST',
        data: workoutPlans,
      }),
    }),
    updateSchedule: builder.mutation({
      query: ({ workoutPlans, id }) => ({
        url: `/workoutPlan/${id}`,
        method: 'PATCH',
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

export const {
  useAddScheduleMutation,
  useDeleteScheduleMutation,
  useUpdateScheduleMutation,
  useGetScheduleQuery,
  useGetAllSchedulesQuery,
} = scheduleApi;
