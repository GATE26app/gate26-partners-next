import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  CodeDTOType,
  CommonCodeInfo,
  CommonCodeInfoDTOType,
  PagingDTOType,
  ParentCodeDTOType,
  PostCommonCodeInfo,
} from './ManagementCodeApi.type';

export class ManagementCodeApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 코드 목록 조회 페이징
  getCommonCode = async (
    params: PagingDTOType,
  ): Promise<CommonCodeInfoDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes?`,
      params,
    });
    return data;
  };

  //공통 코드 상세 조회
  getOneCommonCode = async (codeId: number): Promise<CodeDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/backoffice/common/codes/${codeId}`,
    });
    return data;
  };

  // 상위코드 목록 조회
  getParentCommonCode = async (): Promise<ParentCodeDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/parents?`,
    });
    return data;
  };

  // 공통코드 추가하기
  postCommonCode = async (
    body: PostCommonCodeInfo,
  ): Promise<CommonCodeInfoDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes`,
      data: body,
    });
    return data;
  };

  // 공통코드 수정하기
  putCommonCode = async (
    body: CommonCodeInfo,
    codeId: number,
  ): Promise<CommonCodeInfoDTOType> => {
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/${codeId}`,
      data: body,
    });
    return data;
  };

  // 공통코드 삭제하기
  deleteCommonCode = async (codeId: number): Promise<CommonCodeInfoDTOType> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes/${codeId}`,
    });
    return data;
  };
}

const managementCodeApi = new ManagementCodeApi();

export default managementCodeApi;
