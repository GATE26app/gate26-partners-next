import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  CommunityLoungeDTOType,
  CommunityLoungeDeleteDTOType,
  CommunityLoungeListDTOType,
  CommunityLoungeParamGetType,
  CommunityLoungeParamPatchType,
  CommunityLoungeParamPutType,
  CommunityLoungeResponseType,
} from './CommunityLoungeApi.type';

export class CommunityLoungeApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getCommunityLoungeList = async (
    params?: CommunityLoungeParamGetType,
  ): Promise<AxiosResponseType<CommunityLoungeListDTOType>> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/lounges/list`,
      params,
    });
    return data;
  };

  getDisplayOrderMax = async (): Promise<number> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/lounges/display/count`,
    });
    return data?.count;
  };

  postCommunityLounge = async (
    body: CommunityLoungeDTOType,
  ): Promise<CommunityLoungeResponseType> => {
    const formData = new FormData();
    formData.append('title', body.title);
    formData.append('displayOrder', body.displayOrder.toString());
    formData.append('openYn', body.openYn ? 'T' : 'F');
    if (body.img) formData.append('img', body.img);
    if (body.coverImg) formData.append('coverImg', body.coverImg);

    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: `/lounges/create`,
      data: formData,
    });
    return data;
  };

  // putCommunityLounge = async (
  //   req: CommunityLoungeParamPutType,
  // ): Promise<CommunityLoungeDTOType> => {
  //   const { data } = await this.axios({
  //     method: 'PUT',
  //     url: `/v1/community-lounge/${req.id}`,
  //     data: req.data,
  //   });
  //   return data;
  // };
  // patchCommunityLounge = async (
  //   req: CommunityLoungeParamPatchType,
  // ): Promise<CommunityLoungeDTOType> => {
  //   const { data } = await this.axios({
  //     method: 'PATCH',
  //     url: `/v1/community-lounge/${req.id}`,
  //     data: req.data,
  //   });
  //   return data;
  // };

  deleteCommunityLounge = async (
    tgId: string,
  ): Promise<AxiosResponseType<CommunityLoungeDeleteDTOType>> => {
    const { data } = await this.axios({
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/lounges`,
      params: { tgId },
    });
    return data;
  };
}

const communityLoungeApi = new CommunityLoungeApi();

export default communityLoungeApi;
