import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { formatDateTimeDash } from '@utils/format';
import { getToken } from '@utils/localStorage/token';

import {
  EventEditType,
  EventListDTOType,
  EventListSeqType,
  EventListSetType,
  EventListType,
  EventParamGetType,
  EventParticipantList,
  EventParticipantParamGetType,
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
      url: '/event/list',
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

  putEventList = async (
    body: EventEditType,
  ): Promise<AxiosResponseType<EventListDTOType>> => {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(body.bannerImg), JSON.stringify(body.img)], {
        type: 'application/json',
      }),
    );
    const body2 = {
      ...body,
      bannerImg: formData.append('bannerImg', body.bannerImg),
      img: formData.append('img', body.img),
      startDate: formatDateTimeDash(body.startDate),
      endDate: formatDateTimeDash(body.endDate),
    };
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: '/event',
      data: body2,
    });
    return data;
  };

  postEventList = async (
    body: EventListSetType,
  ): Promise<AxiosResponseType<EventListDTOType>> => {
    const body2 = {
      ...body,
      startDate: formatDateTimeDash(body.startDate),
      expiredDate: formatDateTimeDash(body.endDate),
    };
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: '/event',
      data: body2,
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
}

const eventApi = new EventApi();

export default eventApi;
