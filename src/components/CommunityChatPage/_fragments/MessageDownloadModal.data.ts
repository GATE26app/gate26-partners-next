import { ChatMessageRequestType } from '@apis/CommunityChat/CommunityChatApi.type';

export const validRequest = (request: ChatMessageRequestType) => {
  if (!request.roomId) {
    return { success: false, message: '채팅방을 선택해주세요!' };
  } else  if (isInvalidDate(request.startDate) || isInvalidDate(request.endDate)) {
    return { success: false, message: '조회 시작/종료일자를 확인해주세요!' };
  }
  return { success: true };
};

const isInvalidDate = (d: string) => {
  var isValidDate = Date.parse(d);
  if (isNaN(isValidDate)){
    console.log("sdfdfsdfsdf");
    return true;
  }
  return false;
}