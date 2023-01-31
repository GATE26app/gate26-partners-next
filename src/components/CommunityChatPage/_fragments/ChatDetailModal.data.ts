import { CommunityChatPostType } from '@apis/CommunityChat/CommunityChatApi.type';

export const validRequest = (request: CommunityChatPostType) => {
  if (!request.roomName || request.roomName.trim() === '') {
    return { success: false, message: '채팅방이 비었습니다.' };
  }
  return { success: true };
};
