import { useMutation } from 'react-query';

import { MutationHookParams } from '@/apis/type';

import settingApi from './SettingApi';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};

//프로필 - 상세조회
export const useProfileDetailMutation = (
  params?: MutationHookParams<typeof settingApi.postProfileDetail>,
) => {
  return useMutation(settingApi.postProfileDetail, {
    ...params?.options,
  });
};
//프로필 - 이미지 변경
export const useProfileImgeMutation = (
  params?: MutationHookParams<typeof settingApi.postParnterImage>,
) => {
  return useMutation(settingApi.postParnterImage, {
    ...params?.options,
  });
};
//프로필 - 프로필 수정
export const useProfileChangeMutation = (
  params?: MutationHookParams<typeof settingApi.patchProfileChange>,
) => {
  return useMutation(settingApi.patchProfileChange, {
    ...params?.options,
  });
};
//프로필 - 비밀번호 변경
export const useProfileChangePwMutation = (
  params?: MutationHookParams<typeof settingApi.postProfileChangePw>,
) => {
  return useMutation(settingApi.postProfileChangePw, {
    ...params?.options,
  });
};

//프로필 - 탈퇴요청
export const useProfileResignMutation = (
  params?: MutationHookParams<typeof settingApi.postResign>,
) => {
  return useMutation(settingApi.postResign, {
    ...params?.options,
  });
};
//프로필 - 배송비 추가/수정
export const useProfileShippingMutation = (
  params?: MutationHookParams<typeof settingApi.patchParnterShipping>,
) => {
  return useMutation(settingApi.patchParnterShipping, {
    ...params?.options,
  });
};
