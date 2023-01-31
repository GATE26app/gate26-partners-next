import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from './../../utils/localStorage/token/index';
import {
  AppVersionInfoDTO,
  AppVersionInfoDTOType,
  AppVesionListDTOType,
  DefaultDTOType,
  RequestDTOType,
} from './AppManageApi.type';

export class AppManageApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 앱 버전 추가하기
  postAppVersion = async (
    body: AppVersionInfoDTOType,
  ): Promise<AppVersionInfoDTO> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/backoffice/app/version`,
      data: body,
    });
    return data;
  };

  // 앱 버전 리스트 조회하기
  getAppVersionList = async (
    params?: RequestDTOType,
  ): Promise<AppVesionListDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/backoffice/app/version`,
      params,
    });
    return data;
  };

  // 앱 버전 상세 조회하기
  getAppVersion = async (id: number): Promise<AppVersionInfoDTO> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/backoffice/app/version/${id}`,
    });
    return data;
  };

  // 앱 버전 수정하기
  putAppVersion = async (
    body: AppVersionInfoDTOType,
  ): Promise<AppVersionInfoDTO> => {
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/backoffice/app/version`,
      data: body,
    });
    return data;
  };

  // 앱 버전 삭제하기
  deleteAppVersion = async (id: any): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/backoffice/app/version/${id}`,
    });
    return data;
  };
}

const appManageApi = new AppManageApi();

export default appManageApi;
