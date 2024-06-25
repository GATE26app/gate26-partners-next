import { AxiosInstance } from 'axios';
import { useStore } from 'zustand';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import { UserInfoDtoType } from './UserApi.type';

export class UserApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  //프로필 조회
  getMemberInfo = async (): Promise<UserInfoDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: '/partner/member/profile',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const userApi = new UserApi();

export default userApi;
