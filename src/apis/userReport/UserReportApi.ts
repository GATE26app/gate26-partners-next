import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';
import { PagingDTOType, UserReportInfoDTO, UserReportInfoDTOType } from './UserReportApi.type';

export class UserReportApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getReportInfo =async (
    params : PagingDTOType, category : string
  ): Promise<UserReportInfoDTOType> => {
    const { data } = await this.axios({
        method: 'GET',
        headers: {
          'X-AUTH-TOKEN':`${getToken()}`
        },
        url: `http://dbackoffice.gate26.co.kr/report/${category}?`,
        params,
      });
      return data;
  }
}

const userReportApi = new UserReportApi();

export default userReportApi;