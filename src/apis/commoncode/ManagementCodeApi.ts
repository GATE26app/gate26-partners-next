import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { CommonCodeInfoDTO, CommonCodeInfoDTOType, PagingDTOType } from './ManagementCodeApi.type';
import { getToken } from '@utils/localStorage/token';

export class ManagementCodeApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getCommonCode =async (
    body : PagingDTOType,
  ): Promise<CommonCodeInfoDTO> => {
    const { data } = await this.axios({
        method: 'GET',
        headers: {
          'X-AUTH-TOKEN':`${getToken()}`
        },
        url: `http://localhost:40004/common/codes`,
        // body,
      });
      return data;
  }


  // 공통코드 추가하기
  postCommonCode = async (
    body: CommonCodeInfoDTOType,
  ): Promise<CommonCodeInfoDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN':`${getToken()}`
      },
      url: `http://dbackoffice.gate26.co.kr/common/codes`,
      data: body,
    });
    return data;
  };
}

const managementCodeApi = new ManagementCodeApi();

export default managementCodeApi;
