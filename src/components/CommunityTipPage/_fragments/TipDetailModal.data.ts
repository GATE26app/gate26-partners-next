import { TipPostType } from '@apis/communityTip/communityTipApi.type';

export const validRequest = (request: TipPostType) => {
  if (!request.tipTitle || request.tipTitle.trim() === '') {
    return { success: false, message: '여행팁 제목이 비었습니다.' };
  }
  return { success: true };
};
