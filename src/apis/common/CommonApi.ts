import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import { basicDtotype } from './CommonApi.type';

export class CommonApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getCommonCodeById = async (
    type: string,
    codeName: string,
  ): Promise<basicDtotype> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/backoffice/common/codes?type=${type}&keyword=${codeName}`,
    });
    return data;
  };
}

const commonApi = new CommonApi();

export default commonApi;
