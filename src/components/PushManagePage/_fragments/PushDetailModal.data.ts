import { PushPostType } from '@apis/push/Push.type';

export const FCM_TYPE = [
  { value: 'MILEAGE', label: 'MILEAGE' },
  { value: 'STAMP', label: 'STAMP' },
  { value: 'DM', label: 'DM' },
  { value: 'TICKET', label: 'TICKET' },
  { value: 'FLIGHT', label: 'FLIGHT' },
  { value: 'ACCOMPANY', label: 'ACCOMPANY' },
  { value: 'CHAT', label: 'CHAT' },
];

export const validRequest = (request: PushPostType) => {
  if (!request.type || request.type.trim() === '') {
    return { success: false, message: 'fcm type이 비었습니다.' };
  }
  if (!request.title || request.title.trim() === '') {
    return { success: false, message: '타이틀이 비었습니다.' };
  }
  if (!request.content || request.content.trim() === '') {
    return { success: false, message: '내용이 비었습니다.' };
  }
  if (!request.noticeDate) {
    return { success: false, message: '예약발행이 비었습니다.' };
  }

  return { success: true };
};
