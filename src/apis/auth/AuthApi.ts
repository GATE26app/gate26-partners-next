import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { LoginDTO, LoginDTOType } from './AuthApi.type';

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 로그인
  postLogin = async (body: LoginDTOType): Promise<LoginDTO> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `http://dbackoffice.gate26.co.kr/admin/login`,
      data: body,
    });
    return data;
  };

  postTestLogin = async (): Promise<any> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/admin/loginTest',
    });
    return data;
  };
}

const authApi = new AuthApi();

export default authApi;
