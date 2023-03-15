import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { formatDateTimeDash } from '@utils/format';
import { getToken } from '@utils/localStorage/token';

import {
  EventListDTOType,
  EventListType,
  EventParamGetType,
  EventParticipantList,
  EventParticipantParamGetType,
  EventPostResponse,
  EventPostType,
} from './EventApi.type';

export class EventApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getEventList = async (
    params: EventParamGetType,
  ): Promise<AxiosResponseType<EventListType>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: '/event/list',
      params,
    });
    return data;
  };

  getEventListCount = async (): Promise<
    AxiosResponseType<{ count: number }>
  > => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: '/event/count',
    });
    return data;
  };

  getEventParticipantList = async (
    params: EventParticipantParamGetType,
  ): Promise<AxiosResponseType<EventParticipantList>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: '/event/users',
      params,
    });
    return data;
  };
  putEventListSeq = async (
    eventId: string,
    seq: number,
  ): Promise<AxiosResponseType<EventListDTOType>> => {
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: '/event/seq',
      data: { eventId, seq },
    });
    return data;
  };

  // 이벤트 수정
  putEvent = async (
    body: EventPostType,
  ): Promise<AxiosResponseType<EventPostResponse>> => {
    const formData = new FormData();
    formData.append('eventId', body.eventId!);
    formData.append('title', body.title);
    formData.append('content', body.content);
    formData.append('contentType', body.contentType);
    formData.append('startDate', formatDateTimeDash(body.startDate));
    formData.append('endDate', formatDateTimeDash(body.endDate));
    if (body.img) formData.append('img', body.img);
    if (body.bannerImg) formData.append('bannerImg', body.bannerImg);
    if (body.loungeId) formData.append('loungeId', body.loungeId);
    if (body.deleteFile) formData.append('deleteFile', body.deleteFile);
    if (body.deleteBannerFile)
      formData.append('deleteBannerFile', body.deleteBannerFile);

    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: '/event',
      data: formData,
    });
    return data;
  };

  // 이벤트 등록
  postEvent = async (body: EventPostType): Promise<EventPostResponse> => {
    const formData = new FormData();
    formData.append('title', body.title);
    formData.append('content', body.content);
    formData.append('contentType', body.contentType);
    formData.append('startDate', formatDateTimeDash(body.startDate));
    formData.append('endDate', formatDateTimeDash(body.endDate));
    if (body.img) formData.append('img', body.img);
    if (body.bannerImg) formData.append('bannerImg', body.bannerImg);
    if (body.loungeId) formData.append('loungeId', body.loungeId);

    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: '/event',
      data: formData,
    });
    return data;
  };

  deleteEventList = async (
    eventId: string,
  ): Promise<AxiosResponseType<boolean>> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/event`,
      params: { eventId },
    });
    return data;
  };

  postEventParticipantList = async (
    body: FormData,
  ): Promise<AxiosResponseType<any>> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      data: body,
      url: '/event/users/upload',
    });
    return data;
  };
}

const eventApi = new EventApi();

export default eventApi;
