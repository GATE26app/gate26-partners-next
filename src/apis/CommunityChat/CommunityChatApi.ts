import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import './CommunityChatApi.type';
import {
  CommunityChatDeleteDTOType,
  CommunityChatListResponse,
  CommunityChatParamGetType,
  CommunityChatPostResponse,
  CommunityChatPostType,
  ChatroomListInfo,
  ChatMessageRequestType,
  ChatMessageResponseType
} from './CommunityChatApi.type';

export class CommunityChatApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getCommunityChatList = async (
    params?: CommunityChatParamGetType,
  ): Promise<AxiosResponseType<CommunityChatListResponse>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/chatroom/list`,
      params,
    });
    return data;
  };

  // 라운지 등록
  postCommunityChat = async (
    body: CommunityChatPostType,
  ): Promise<CommunityChatPostResponse> => {
    const formData = new FormData();
    formData.append('roomName', body.roomName);
    if (body.loungeId) formData.append('loungeId', body.loungeId);
    if (body.img) formData.append('img', body.img);

    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: `/chatroom/create`,
      data: formData,
    });
    return data;
  };

  // 라운지 수정
  putCommunityChat = async (
    body: CommunityChatPostType,
  ): Promise<CommunityChatPostResponse> => {
    const formData = new FormData();
    formData.append('roomId', body.roomId!);
    formData.append('roomName', body.roomName);
    if (body.loungeId) formData.append('loungeId', body.loungeId);
    if (body.img) formData.append('img', body.img);
    if (body.deleteFile) formData.append('deleteFile', body.deleteFile);
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: `/chatroom/update`,
      data: formData,
    });
    return data;
  };

  deleteCommunityChat = async (
    roomId: string,
  ): Promise<AxiosResponseType<CommunityChatDeleteDTOType>> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/chatroom/delete`,
      params: { roomId },
    });
    return data;
  };

  getChatroomListByRoomType = async (
    roomType: string,
  ): Promise<AxiosResponseType<ChatroomListInfo[]>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/chatroom/type`,
      params: { roomType },
    });
    return data;
  };

  getMessagesByRoomIdAndDate = async (
    params: ChatMessageRequestType,
  ): Promise<AxiosResponseType<Map<string, ChatMessageResponseType>>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/chat/messages`,
      params
    });
    return data;
  };
}

const communityChatApi = new CommunityChatApi();

export default communityChatApi;
