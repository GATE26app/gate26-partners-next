import { AxiosInstance } from 'axios';

import instance, {
  AxiosResponseType,
  BasicListDTO,
} from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  StampDTOType,
  StampListDTOType,
  StampParamGetType,
  StampUpdateDTOType,
} from './StampApis.type';

export class NoticeApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  postStamp = async (body: StampDTOType) => {
    const formData = new FormData();
    formData.append('stampName', body.stampName);
    formData.append('descText', body.descText);
    formData.append('stampType', body.stampType);
    formData.append('useYn', body.useYn);
    if (body.img) formData.append('img', body.img);
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: `/stamp/create`,
      data: formData,
    });
    return data;
  };

  getStamp = async (
    params: StampParamGetType,
  ): Promise<BasicListDTO<StampListDTOType[]>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/stamp/list`,
      params,
    });
    return data;
  };

  putStamp = async (
    body: StampUpdateDTOType,
  ): Promise<AxiosResponseType<StampListDTOType>> => {
    const formData = new FormData();
    formData.append('stampId', body.stampId);
    if (body.stampName) formData.append('stampName', body.stampName);
    if (body.descText) formData.append('descText', body.descText);
    if (body.stampType) formData.append('stampType', body.stampType);
    if (body.useYn) formData.append('useYn', body.useYn);
    if (body.img) formData.append('img', body.img);
    if (body.deleteFile) formData.append('deleteFile', body.deleteFile);
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: `/stamp/update`,
      data: formData,
    });
    return data;
  };

  deleteStamp = async (
    stampId: string,
  ): Promise<AxiosResponseType<StampListDTOType>> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/stamp`,
      params: { stampId },
    });
    return data;
  };
}

const noticeApi = new NoticeApi();

export default noticeApi;
