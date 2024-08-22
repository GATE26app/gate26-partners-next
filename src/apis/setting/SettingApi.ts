import { AxiosInstance } from 'axios';

import instance from '@/apis/_axios/instance';

import { getToken } from '@/utils/localStorage/token';
import {
  ListDtoType,
  PartnerShippingType,
  ProfileChangeReqType,
  ProfileDetailRes,
  ProfileReqType,
  ProfileResignReqType,
} from './SettingApi.type';

export class SettingApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  //프로필 - 상세조회
  postProfileDetail = async (
    body: ProfileReqType,
  ): Promise<ProfileDetailRes> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/profile/detail`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });

    return data;
  };

  //프로필 - 비밀번호 변경
  postProfileChangePw = async (
    body: ProfileReqType,
  ): Promise<ProfileDetailRes> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/change-pw`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });

    return data;
  };
  //프로필 - 프로필 수정
  patchProfileChange = async (
    body: ProfileChangeReqType,
  ): Promise<ProfileDetailRes> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/partner/member/profile`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });

    return data;
  };

  //프로필 - 탈퇴 요청
  postResign = async (
    body: ProfileResignReqType,
  ): Promise<ProfileDetailRes> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/resign`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });

    return data;
  };
  // 이미지
  postParnterImage = async (body: FormData): Promise<ListDtoType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/partner/image/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };

  // 배송비 추가/수정
  patchParnterShipping = async (
    body: PartnerShippingType,
  ): Promise<ListDtoType> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: '/partner/member/shipping',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    console.log('body', body);
    return data;
  };
}

const settingApi = new SettingApi();

export default settingApi;
