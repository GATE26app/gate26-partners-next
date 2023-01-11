import { AxiosInstance } from 'axios';

import instance, { AxiosResponseType } from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  CommunityLoungeDeleteDTOType,
  CommunityLoungeListResponse,
  CommunityLoungeParamGetType,
  CommunityLoungePostResponse,
  CommunityLoungePostType,
} from './CommunityLoungeApi.type';

export class CommunityLoungeApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getCommunityLoungeList = async (
    params?: CommunityLoungeParamGetType,
  ): Promise<AxiosResponseType<CommunityLoungeListResponse>> => {
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

  // 라운지 등록
  postCommunityLounge = async (
    body: CommunityLoungePostType,
  ): Promise<CommunityLoungePostResponse> => {
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

  // 라운지 수정
  putCommunityLounge = async (
    body: CommunityLoungePostType,
  ): Promise<CommunityLoungePostResponse> => {
    const formData = new FormData();
    formData.append('loungeId', body.loungeId!);
    formData.append('title', body.title);
    formData.append('displayOrder', body.displayOrder.toString());
    formData.append('openYn', body.openYn ? 'T' : 'F');
    if (body.img) formData.append('img', body.img);
    if (body.coverImg) formData.append('coverImg', body.coverImg);
    if (body.deleteFile) formData.append('deleteFile', body.deleteFile);
    if (body.deleteCoverFile)
      formData.append('deleteCoverFile', body.deleteCoverFile);

    const { data } = await this.axios({
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      url: `/lounges/update`,
      data: formData,
    });
    return data;
  };
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
