import { apiSlice } from '../apiSlice';

interface ReportNicknameProps {
  nickname: string;
}

export const supportApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    reportNickname: builder.mutation<void, ReportNicknameProps>({
      query: nickname => ({
        url: '/support/reportNickname',
        method: 'POST',
        body: nickname,
      }),
    }),
    deleteAccount: builder.mutation<void, void>({
      query: () => ({
        url: '/support/deleteAccount',
        method: 'GET',
      }),
    }),
  }),
});

export const { useReportNicknameMutation, useDeleteAccountMutation } =
  supportApi;
