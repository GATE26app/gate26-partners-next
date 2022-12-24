import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  BasicDTO,
  HistoryParamDeleteDTOType,
  PagingDTOType,
  SearchParamGetType,
  TotalCountGetDTOType,
} from './MemberManage.type';

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
  //유저 스탬프러리 내역 조회
  getStampHistory = async (params: SearchParamGetType): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/stamp/history`,
      params,
    });
    return data;
  };
  //유저 스탬프러리 내역 삭제
  deleteStampHistory = async (
    params: HistoryParamDeleteDTOType,
  ): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/stamp`,
      params,
    });
    return data;
  };
  //유저 총 스탬프러리 카운트 조회
  getStampHistoryTotalCount = async (
    params: TotalCountGetDTOType,
  ): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/stamp`,
      params,
    });
    return data;
  };
  //유저 항공권 인증 내역 조회
  getActivityHistory = async (
    params: SearchParamGetType,
  ): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/activity/history`,
      params,
    });
    return data;
  };
  //유저 총 항공권 인증 내역 카운트 조회
  getActivityHistoryTotalCount = async (
    params: SearchParamGetType,
  ): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/activity`,
      params,
    });
    return data;
  };
  //유저 항공권 인증내역 삭제
  deleteActivityHistory = async (
    params: HistoryParamDeleteDTOType,
  ): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/activity`,
      params,
    });
    return data;
  };
  //유저 마일리지 적립 내역 조회
  getMileageHistory = async (params: SearchParamGetType): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/activity/history`,
      params,
    });
    return data;
  };
  //유저 총 적립 마일리지  조회
  getMileageHistoryTotalCount = async (
    params: SearchParamGetType,
  ): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/activity`,
      params,
    });
    return data;
  };
  //유저 마일리지 적립 내역 삭제
  deleteMileageHistory = async (
    params: HistoryParamDeleteDTOType,
  ): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/activity`,
      params,
    });
    return data;
  };
}

const memberManageApi = new MemberManageApi();

export default memberManageApi;
