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
  }),
});

export const { useReportNicknameMutation } = supportApi;
