import { EventPostType } from '@apis/event/EventApi.type';

export const RadioGroups = [
  {
    value: '0',
    label: 'URL',
  },
  {
    value: '1',
    label: 'IMAGE',
  },
  {
    value: '2',
    label: 'TEXT',
  },
];

export const validRequest = (request: EventPostType) => {
  if (!request.contentType) {
    return { success: false, message: '타입이 선택되지 않았습니다.' };
  }
  if (!request.title || request.title.trim() === '') {
    return { success: false, message: '타이틀이 비었습니다.' };
  }

  if (
    (request.contentType === '0' || request.contentType === '2') &&
    (!request.content || request.content.trim() === '')
  ) {
    return { success: false, message: '내용이 비었습니다.' };
  }

  //   // 파일형태일때
  //   if (request.contentType === '1' && !request.content) {
  //     return { success: false, message: '내용이 비었습니다.' };
  //   }

  if (!request.startDate) {
    return { success: false, message: '시작일자가 비었습니다.' };
  }
  if (!request.endDate) {
    return { success: false, message: '종료일자가 비었습니다.' };
  }

  return { success: true };
};
