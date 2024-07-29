import { useMutation } from 'react-query';

import { MutationHookParams } from '@/apis/type';

import joinApi from './JoinApi';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};

//회원가입 - 아이디 중복확인
export const usePostIdCheckMutation = (
  params?: MutationHookParams<typeof joinApi.postJoinIdCheck>,
) => {
  return useMutation(joinApi.postJoinIdCheck, {
    ...params?.options,
  });
};

//회원가입 - 본인인증키 발급
export const usePostAuthKeyMutation = (
  params?: MutationHookParams<typeof joinApi.postJoinAuthHpKey>,
) => {
  return useMutation(joinApi.postJoinAuthHpKey, {
    ...params?.options,
  });
};

//회원가입 - 본인인증 확인
export const usePostAuthCheckMutation = (
  params?: MutationHookParams<typeof joinApi.postJoinAuthCheck>,
) => {
  return useMutation(joinApi.postJoinAuthCheck, {
    ...params?.options,
  });
};

//회원가입 - 이메일 인증코드 발금
export const usePostAuthEmailMutation = (
  params?: MutationHookParams<typeof joinApi.postJoinAuthEmail>,
) => {
  return useMutation(joinApi.postJoinAuthEmail, {
    ...params?.options,
  });
};

//회원가입 - 이메일 인증코드 확인
export const usePostAuthEmailCheckMutation = (
  params?: MutationHookParams<typeof joinApi.postJoinAuthCheckEmail>,
) => {
  return useMutation(joinApi.postJoinAuthCheckEmail, {
    ...params?.options,
  });
};

//회원가입 - 프로필 이미지
export const usePostJoinImageMutation = (
  params?: MutationHookParams<typeof joinApi.postJoinImage>,
) => {
  return useMutation(joinApi.postJoinImage, {
    ...params?.options,
  });
};

//회원가입 - pdf
export const usePostJoinPdfMutation = (
  params?: MutationHookParams<typeof joinApi.postJoinPdf>,
) => {
  return useMutation(joinApi.postJoinPdf, {
    ...params?.options,
  });
};

//회원가입 -
export const usePutJoinMutation = (
  params?: MutationHookParams<typeof joinApi.putJoin>,
) => {
  return useMutation(joinApi.putJoin, {
    ...params?.options,
  });
};

//아이디 찾기 - 본인인증키 발급
export const usePostFindIdAuthKeyMutation = (
  params?: MutationHookParams<typeof joinApi.postFindIdAuthHpKey>,
) => {
  return useMutation(joinApi.postFindIdAuthHpKey, {
    ...params?.options,
  });
};

//아이디 찾기 - 본인인증 확인
export const usePosFindIdtAuthCheckMutation = (
  params?: MutationHookParams<typeof joinApi.postFindIdAuthCheck>,
) => {
  return useMutation(joinApi.postFindIdAuthCheck, {
    ...params?.options,
  });
};

//아이디 찾기 - 이메일 인증코드 발금
export const usePostFindIdAuthEmailMutation = (
  params?: MutationHookParams<typeof joinApi.postFindIdAuthEmail>,
) => {
  return useMutation(joinApi.postFindIdAuthEmail, {
    ...params?.options,
  });
};

//아이디 찾기 - 이메일 인증코드 확인
export const usePostFindIdAuthEmailCheckMutation = (
  params?: MutationHookParams<typeof joinApi.postFindIdAuthCheckEmail>,
) => {
  return useMutation(joinApi.postFindIdAuthCheckEmail, {
    ...params?.options,
  });
};

//비밀번호 찾기 - 본인인증키 발급
export const usePostFindPwAuthKeyMutation = (
  params?: MutationHookParams<typeof joinApi.postFindPWAuthHpKey>,
) => {
  return useMutation(joinApi.postFindPWAuthHpKey, {
    ...params?.options,
  });
};

//비밀번호 찾기 - 본인인증 확인
export const usePosFindPwtAuthCheckMutation = (
  params?: MutationHookParams<typeof joinApi.postFindPwAuthCheck>,
) => {
  return useMutation(joinApi.postFindPwAuthCheck, {
    ...params?.options,
  });
};

//비밀번호 찾기 - 이메일 인증코드 발금
export const usePostFindPwAuthEmailMutation = (
  params?: MutationHookParams<typeof joinApi.postFindPwAuthEmail>,
) => {
  return useMutation(joinApi.postFindPwAuthEmail, {
    ...params?.options,
  });
};

//비밀번호 찾기 - 이메일 인증코드 확인
export const usePostFindPwAuthEmailCheckMutation = (
  params?: MutationHookParams<typeof joinApi.postFindPwAuthCheckEmail>,
) => {
  return useMutation(joinApi.postFindPwAuthCheckEmail, {
    ...params?.options,
  });
};

//비밀번호 찾기 - 비밀번호 변경
export const usePostFindPwResetPwMutation = (
  params?: MutationHookParams<typeof joinApi.postFindPwResetPw>,
) => {
  return useMutation(joinApi.postFindPwResetPw, {
    ...params?.options,
  });
};
