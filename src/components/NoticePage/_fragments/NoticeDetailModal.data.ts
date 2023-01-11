import { NoticeDTOType } from '@apis/notice/NoticeApi.type';

export const validRequest = (request: NoticeDTOType) => {
  if (!request.title || request.title.trim() === '') {
    return { success: false, message: '타이틀이 비었습니다.' };
  }
  if (!request.content || request.content.trim() === '') {
    return { success: false, message: '내용이 비었습니다.' };
  }
  if (!request.startDate) {
    return { success: false, message: '시작일자가 비었습니다.' };
  }
  if (!request.expiredDate) {
    return { success: false, message: '종료일자가 비었습니다.' };
  }
  return { success: true };
};
