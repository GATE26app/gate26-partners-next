import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  ActivitHitoryListDTOType,
  BasicDTO,
  HistoryDeleteDTOType,
  MileageHitoryListDTOType,
  MileageSearchGetDTOType,
  RequestDTOType,
  SearchGetDTOType,
  StampHistoryCreateDTOType,
  StampHistoryInfoDTOType,
  StampListDTOType,
  StampListGetDTOType,
  StmaperyHitoryListDTOType,
} from './MemberManage.type';

export class MemberManageApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 회원 관리 조회
  getMemberInfo = async (params?: RequestDTOType): Promise<BasicDTO> => {
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
  getStampHistory = async (
    params: SearchGetDTOType,
  ): Promise<AxiosResponseType<StmaperyHitoryListDTOType>> => {
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
  //유저 스탬프러리 내역 조회
  getStampList = async (
    params: StampListGetDTOType,
  ): Promise<AxiosResponseType<StampListDTOType>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/stamp/list`,
      params,
    });
    return data;
  };
  //유저 스탬프러리 내역 생성
  postStampHistory = async (
    body: StampHistoryCreateDTOType,
  ): Promise<AxiosResponseType<StampHistoryInfoDTOType>> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/stamp`,
      data: body,
    });
    return data;
  };
  //유저 스탬프러리 내역 삭제
  deleteStampHistory = async (
    params: HistoryDeleteDTOType,
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

  //유저 항공권 인증 내역 조회
  getActivityHistory = async (
    params: SearchGetDTOType,
  ): Promise<AxiosResponseType<ActivitHitoryListDTOType>> => {
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

  //유저 항공권 인증내역 삭제
  deleteActivityHistory = async (
    params: HistoryDeleteDTOType,
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
  getMileageHistory = async (
    params: MileageSearchGetDTOType,
  ): Promise<AxiosResponseType<MileageHitoryListDTOType>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/mileage/history`,
      params,
    });
    return data;
  };
  //유저 마일리지 적립 내역 삭제
  deleteMileageHistory = async (
    params: HistoryDeleteDTOType,
  ): Promise<BasicDTO> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/users/mileage`,
      params,
    });
    return data;
  };
}

const memberManageApi = new MemberManageApi();

export default memberManageApi;
