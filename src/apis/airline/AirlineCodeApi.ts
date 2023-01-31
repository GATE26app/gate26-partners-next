import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import { DefaultDTOType } from '@apis/admin/AdminAccountApi.type';
import { basicDtotype } from '@apis/common/CommonApi.type';

import { getToken } from '@utils/localStorage/token';

import {
  AirlineInfoDTOType,
  AirlineModifyDTOType,
  AirlineRequestDTOType,
} from './AirlineCodeApi.type';

export class AirlineCodeApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  //항공사 코드 리스트 조회
  getAirlineCodeList = async (
    params?: AirlineRequestDTOType,
  ): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airline`,
      params: params,
    });
    return data;
  };

  getAirlineCode = async (airlineId: any): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airline/${airlineId}`,
    });
    return data;
  };

  // 항공사 코드 추가
  postAddAirlineCode = async (
    body: AirlineInfoDTOType,
  ): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airline`,
      data: body,
    });
    return data;
  };

  // 항공사 코드 수정
  putModifyAirlineCode = async (
    body: AirlineModifyDTOType,
    airlineId: any,
  ): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airline/${airlineId}`,
      data: body,
    });
    return data;
  };

  // 항공사 코드 삭제하기
  deleteAirlineCode = async (airlineId: any): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airline/${airlineId}`,
    });
    return data;
  };
}

const airlineCodeApi = new AirlineCodeApi();

export default airlineCodeApi;
