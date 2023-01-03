import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  PushDeleteDTOType,
  PushListDTOType,
  PushParamGetType,
} from './Push.type';

export class PushApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getPushList = async (
    params: PushParamGetType,
  ): Promise<AxiosResponseType<PushListDTOType>> => {
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

  deletePush = async (
    noticeId: string,
  ): Promise<AxiosResponseType<PushDeleteDTOType>> => {
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
