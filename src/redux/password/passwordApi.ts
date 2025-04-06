import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../auth/axios';

interface SendCodeResponse {
  message: string;
}

interface VerifyCodeResponse {
  token: string;
  refreshToken: string;
  message: string;
}

export const passwordApi = createApi({
  reducerPath: 'passwordApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['PasswordRecovery'],
  endpoints: builder => ({
    sendRecoveryCode: builder.mutation<SendCodeResponse, string>({
      query: email => ({
        url: '/auth/send/verify',
        method: 'POST',
        data: { email },
      }),
    }),
    verifyCode: builder.mutation<
      VerifyCodeResponse,
      { password: string; code: string }
    >({
      query: ({ password, code }) => ({
        url: '/auth/verify',
        method: 'POST',
        data: { password, verifyCode: code },
      }),
    }),
  }),
});

export const { useSendRecoveryCodeMutation, useVerifyCodeMutation } =
  passwordApi;
