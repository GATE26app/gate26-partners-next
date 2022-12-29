import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { formatDateTimeDash } from '@utils/format';
import { getToken } from '@utils/localStorage/token';

import {
  NoticeDTOType,
  NoticeListDTOType,
  NoticeParamGetType,
} from './NoticeApi.type';

export class NoticeApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getNoticeList = async (
    params: NoticeParamGetType,
  ): Promise<AxiosResponseType<NoticeListDTOType[]>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/notice/list`,
      params,
    });
    return data;
  };

  postNotice = async (
    body: NoticeDTOType,
  ): Promise<AxiosResponseType<NoticeListDTOType>> => {
    const body2 = {
      ...body,
      startDate: formatDateTimeDash(body.startDate),
      expiredDate: formatDateTimeDash(body.expiredDate),
    };
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/notice`,
      data: body2,
    });
    return data;
  };

  putNotice = async (
    body: NoticeDTOType,
  ): Promise<AxiosResponseType<NoticeListDTOType>> => {
    const body2 = {
      ...body,
      startDate: formatDateTimeDash(body.startDate),
      expiredDate: formatDateTimeDash(body.expiredDate),
    };
    const { data } = await this.axios({
      method: 'PUT',
      url: `/notice`,
      data: body2,
    });
    return data;
  };

  deleteNotice = async (id: string): Promise<AxiosResponseType<boolean>> => {
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/notice/${id}`,
    });
    return data;
  };
}

const noticeApi = new NoticeApi();

export default noticeApi;
