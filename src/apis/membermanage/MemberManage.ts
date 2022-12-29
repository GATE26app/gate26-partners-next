import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import { BasicDTO, PagingDTOType } from './MemberManage.type';

export class MemberManageApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 회원 관리 조회
  getMemberInfo = async (params?: PagingDTOType): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/users/all`,
      params,
    });
    return data;
  };
}

const memberManageApi = new MemberManageApi();

export default memberManageApi;
