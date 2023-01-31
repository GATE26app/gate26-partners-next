import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import { DefaultDTOType, PagingDTOType, AdminAccountDetailInfoDTOType, AdminCreatOrUpdateDTO } from './AdminAccountApi.type';

export class AdminAccountApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 관리자 리스트 조회
  getAdminAccount = async (params?: PagingDTOType): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
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
  };

  // 관리자 상세 조회
  getAdminAccountByAdminId = async (
    adminId?: string
  ): Promise<AdminAccountDetailInfoDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`
      },
      url: `http://dbackoffice.gate26.co.kr/admin/${adminId}`,
    });
    return data;
  };

  // 관리자 정보 수정
  updateAdminAccount = async (
    body: AdminCreatOrUpdateDTO
  ): Promise<AdminAccountDetailInfoDTOType> => {
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`
      },
      url: `http://dbackoffice.gate26.co.kr/admin/${body?.adminId}`,
      data: body,
    });
    return data;
  };

  // 관리자 생성
  createAdminAccount = async (
    body: AdminCreatOrUpdateDTO
  ): Promise<AdminAccountDetailInfoDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`
      },
      url: `http://dbackoffice.gate26.co.kr/admin`,
      data: body,
    });
    return data;
  };

  // 관리자 삭제
  removeAdminAccount = async (
    adminId?: string
  ): Promise<AdminAccountDetailInfoDTOType> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`
      },
      url: `http://dbackoffice.gate26.co.kr/admin/${adminId}`,
    });
    return data;
  };
}

const adminAccountApi = new AdminAccountApi();

export default adminAccountApi;
