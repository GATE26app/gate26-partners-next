import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { AppVersionInfoDTO, AppVersionInfoDTOType } from './AppManageApi.type';

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
        'X-AUTH-TOKEN': `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYW5nZ2giLCJpYXQiOjE2NzE2MDc4MjksImV4cCI6MTY3MTY5NDIyOX0.ajBFndeaI_QIc1sU1hV2xgwiZdb2UuFOFePgEhZg8Hs`,
      },
      url: `http://dbackoffice.gate26.co.kr/app/version`,
      data: body,
    });
    return data;
  };
}

const appManageApi = new AppManageApi();

export default appManageApi;
