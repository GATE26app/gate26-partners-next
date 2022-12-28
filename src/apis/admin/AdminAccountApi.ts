import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { DefaultDTOType, PagingDTOType } from './AdminAccountApi.type';
import { getToken } from '@utils/localStorage/token';

export class AdminAccountApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 관리자 조회
  getAdminAccount = async (
    params?: PagingDTOType
  ): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`
      },
      url: `http://dbackoffice.gate26.co.kr/admin`,
      params,
    });
    return data;
  };

  getAdminAll = async (): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `http://dbackoffice.gate26.co.kr/admin?page=0&size=10000`,
    });
    return data;
  } 
}

const adminAccountApi = new AdminAccountApi();

export default adminAccountApi;