import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import { basicDtotype } from '@apis/common/CommonApi.type';

import { getToken } from '@utils/localStorage/token';

import { AirlineRequestDTOType } from './AirlineCodeApi.type';

export class AirlineCodeApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getAirlineCodeList = async (
    params?: AirlineRequestDTOType,
  ): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/common/codes/airline`,
      params: params,
    });
    return data;
  };

}

const airlineCodeApi = new AirlineCodeApi();

export default airlineCodeApi;
