import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import { DefaultDTOType } from '@apis/admin/AdminAccountApi.type';
import { basicDtotype } from '@apis/common/CommonApi.type';

import { getToken } from '@utils/localStorage/token';

import {
  AdminMenuInfoDTOType,
  AdminMenuModifyDTOType,
  MenuRequestDTOType,
} from './AdminMenuApi.type';

export class AdminMenuApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  //메뉴 리스트 조회
  getAdminMenuList = async (
    params?: MenuRequestDTOType,
  ): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/admin/menu`,
      params: params,
    });
    return data;
  };

  //상위메뉴리스트 조회
  getParentAdminMenu = async (): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/admin/menu/parents`,
    });
    return data;
  };

  //메뉴 아이디로 조회
  getAdminMenu = async (id: any): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/admin/menu/${id}`,
    });
    return data;
  };

  // 메뉴 추가
  postAddAdminMenu = async (
    body: AdminMenuInfoDTOType,
  ): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/admin/menu`,
      data: body,
    });
    return data;
  };

  // 메뉴 수정
  putModifyAdminMenu = async (
    body: AdminMenuModifyDTOType,
    id: any,
  ): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/admin/menu/${id}`,
      data: body,
    });
    return data;
  };

  // 메뉴 삭제하기
  deleteAdminMenu = async (id: any): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/admin/menu/${id}`,
    });
    return data;
  };
}

const adminMenuApi = new AdminMenuApi();

export default adminMenuApi;
