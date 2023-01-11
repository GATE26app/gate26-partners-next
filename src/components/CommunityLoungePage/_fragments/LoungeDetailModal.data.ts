import { CommunityLoungePostType } from '@apis/communityLounge/CommunityLoungeApi.type';

export const validRequest = (request: CommunityLoungePostType) => {
  if (!request.title || request.title.trim() === '') {
    return { success: false, message: '타이틀이 비었습니다.' };
  }

  return { success: true };
};
