//샌드버드 토큰 request type
export type SendBirdTokenDtoType = {
  code: string;
  count: number;
  data: {
    user_id: string;
    token: string;
    expires_at: number;
  };
  success: boolean;
};
//샌드버드 이미지 request type
export type SendBirdImageType = {
  ChannelUrl: string;
  imageId: string;
};
