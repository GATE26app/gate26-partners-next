import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { CommonCodeInfoDTO, CommonCodeInfoDTOType } from './ManagementCodeApi.type';

export class ManagementCodeApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getCommonCode =async (
    body : CommonCodeInfoDTOType,
  ): Promise<CommonCodeInfoDTO> => {
    const { data } = await this.axios({
        method: 'GET',
        headers: {
          'X-AUTH-TOKEN': `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaG9pamgxNSIsImlhdCI6MTY3MTc1OTYzOCwiZXhwIjoxNjcxODQ2MDM4fQ.pGus_N7j0D_Nwqgvz7CQp2eD9XfGW8V6SOCNh7FDiPY`,
        },
        url: `http://dbackoffice.gate26.co.kr/common/codes`,
        data: body,
      });
      return data;
  }


  // 앱 버전 추가하기
  postCommonCode = async (
    body: CommonCodeInfoDTOType,
  ): Promise<CommonCodeInfoDTO> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaG9pamgxNSIsImlhdCI6MTY3MTc1OTYzOCwiZXhwIjoxNjcxODQ2MDM4fQ.pGus_N7j0D_Nwqgvz7CQp2eD9XfGW8V6SOCNh7FDiPY`,
      },
      url: `http://dbackoffice.gate26.co.kr/common/codes`,
      data: body,
    });
    return data;
  };
}

const appManageApi = new ManagementCodeApi();

export default appManageApi;
