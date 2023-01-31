import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  TipListType,
  TipOpenType,
  TipParamGetType,
  TipPostType,
  TipPutType,
} from './communityTipApi.type';

export class CommunityTipApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getCommunityTipList = async (
    params: TipParamGetType,
  ): Promise<AxiosResponseType<TipListType>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: '/tip/list',
      params,
    });
    return data;
  };

  // 이벤트 수정
  putTip = async (body: TipPutType): Promise<AxiosResponseType<any>> => {
    const formData = new FormData();
    formData.append('tipTitle', body.tipTitle);
    formData.append('tipId', body.tipId);
    if (body.category) formData.append('category', body.category);
    if (body.img) formData.append('img', body.img);
    if (body.bannerImg) formData.append('bannerImg', body.bannerImg);
    if (body.deleteBannerFile) formData.append('deleteBannerFile', 'y');
    if (body.deleteFile) formData.append('deleteFile', 'y');
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: '/tip/update',
      data: formData,
    });
    return data;
  };

  // 이벤트 등록
  postTip = async (body: TipPostType): Promise<AxiosResponseType<any>> => {
    const formData = new FormData();
    formData.append('tipTitle', body.tipTitle);
    if (body.category) formData.append('category', body.category);
    if (body.img) formData.append('img', body.img);
    if (body.bannerImg) formData.append('bannerImg', body.bannerImg);

    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: '/tip/create',
      data: formData,
    });
    return data;
  };

  deleteTip = async (tipId: string): Promise<AxiosResponseType<boolean>> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/tip/delete`,
      params: { tipId },
    });
    return data;
  };

  putTipUpdateOpen = async (
    body: TipOpenType,
  ): Promise<AxiosResponseType<boolean>> => {
    const { tipId, openYn } = body;
    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/tip/update/open`,
      data: { tipId, openYn },
    });
    return data;
  };
}

const communityTipApi = new CommunityTipApi();

export default communityTipApi;
