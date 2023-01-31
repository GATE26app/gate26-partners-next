import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  AirportInfo,
  AirportInfoDTO,
  AirportListDTOType,
  AirportPutInfo,
  DefaultDTOType,
  RequestDTOType,
  RoungeDTOType,
  basicDtotype,
} from './CommonApi.type';

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
      url: `/common/codes?type=${type}&keyword=${codeName}`,
    });
    return data;
  };

  /*
  #[공항 코드] 조회(리스트)
  */
  getAirportList = async (
    params?: RequestDTOType,
  ): Promise<AirportListDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airport`,
      params,
    });
    return data;
  };

  /* #[공항 코드] 조회(상세)*/
  getAirportInfo = async (code: string): Promise<AirportInfoDTO> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airport/${code}`,
    });
    return data;
  };
  /*
  #[공항 코드] 추가  */
  postAirport = async (body: AirportInfo): Promise<AirportInfoDTO> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airport`,
      data: body,
    });
    return data;
  };

  /*
  #[공항 코드] 수정
  */
  putAlineCode = async (
    body: AirportPutInfo,
    code: string,
  ): Promise<AirportInfoDTO> => {
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airport/${code}`,
      data: body,
    });
    return data;
  };

  /*
  #[공항 코드] 삭제
  */
  deleteAlineCode = async (code: any): Promise<DefaultDTOType> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/airport/${code}`,
    });
    return data;
  };

  /* 
  #[라운지]리스트 조회 
  */
  getRoungeList = async (): Promise<RoungeDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/lounges`,
    });
    return data;
  };
}

const commonApi = new CommonApi();

export default commonApi;
