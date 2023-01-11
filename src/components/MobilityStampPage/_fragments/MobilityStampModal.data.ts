import { StampDTOType, StampUpdateDTOType } from '@apis/stamp/StampApis.type';

export const SEARCH_TYPE = [
  { value: '1', label: '항공사' },
  { value: '2', label: '첼린지' },
  { value: '3', label: '국가' },
];

export const valideRequest = (request: StampDTOType | StampUpdateDTOType) => {
  if (!request.stampName || request.stampName.trim() === '') {
    return { success: false, message: '스탬프러리명이 비었습니다.' };
  }
  if (!request.descText || request.descText.trim() === '') {
    return { success: false, message: '스탬프러리 설명이 비었습니다.' };
  }

  return { success: true };
};
