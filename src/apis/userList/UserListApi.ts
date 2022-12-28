import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import { RequestDTOType, ResponseDTOType } from './UserListApi.type';

export class UserListApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 회원 목록 조회하기
  getUserList = async (params?: RequestDTOType): Promise<ResponseDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/users/active`,
      params,
    });
    return data;
  };
}

const userListApi = new UserListApi();

export default userListApi;
