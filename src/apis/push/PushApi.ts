import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { formatDateTimeDash } from '@utils/format';
import { getToken } from '@utils/localStorage/token';

import {
  PushChatroomGetType,
  PushChatroomListResponse,
  PushDeleteResponse,
  PushListResponse,
  PushLoungeGetType,
  PushLoungeListResponse,
  PushParamGetType,
  PushPostResponse,
  PushPostType,
} from './Push.type';

export class PushApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getPushList = async (
    params: PushParamGetType,
  ): Promise<AxiosResponseType<PushListResponse>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/notice/list`,
      params,
    });
    return data;
  };

  // 푸시알림용 라운지 리스트 조회
  getPushLoungeList = async (
    params?: PushLoungeGetType,
  ): Promise<AxiosResponseType<PushLoungeListResponse[]>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/lounges/push/list`,
      params,
    });
    return data;
  };

  // 푸시알림용 채팅방 리스트 조회
  getPushChatroomList = async (
    params: PushChatroomGetType,
  ): Promise<AxiosResponseType<PushChatroomListResponse[]>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/chatroom`,
      params,
    });
    return data;
  };

  //푸시등록
  postPush = async (body: PushPostType): Promise<PushPostResponse> => {
    const formData = new FormData();
    formData.append('type', body.type);
    formData.append('title', body.title);
    formData.append('content', body.content);
    formData.append('noticeDate', formatDateTimeDash(body.noticeDate));
    if (body.chatRoom) formData.append('chatRoom', body.chatRoom);
    if (body.coverImg) formData.append('coverImg', body.coverImg);

    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: `/users/notice/create`,
      data: formData,
    });
    return data;
  };

  // 푸시 수정
  putPush = async (body: PushPostType): Promise<PushPostResponse> => {
    const formData = new FormData();

    formData.append('noticeId', body.noticeId!);
    formData.append('type', body.type);
    formData.append('title', body.title);
    formData.append('content', body.content);
    formData.append('noticeDate', formatDateTimeDash(body.noticeDate));
    if (body.chatRoom) formData.append('chatRoom', body.chatRoom);
    if (body.coverImg) formData.append('coverImg', body.coverImg);
    if (body.deleteChatRoom)
      formData.append('deleteChatRoom', body.deleteChatRoom);
    if (body.deleteFile) formData.append('deleteFile', body.deleteFile);

    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: `/users/notice`,
      data: formData,
    });
    return data;
  };

  //푸시삭제
  deletePush = async (
    noticeId: string,
  ): Promise<AxiosResponseType<PushDeleteResponse>> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/notice`,
      params: { noticeId },
    });
    return data;
  };
}

const pushApi = new PushApi();

export default pushApi;
