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
      url: `/lounge/list`,
      params,
    });
    return data;
  };

  getCommunityLoungeById = async (
    id: string,
  ): Promise<CommunityLoungeDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/v1/community-lounge/${id}`,
    });
    return data;
  };

  // postCommunityLounge = async (
  //   body: CommunityLoungeDTOType,
  // ): Promise<CommunityLoungeDTOType> => {
  //   const { data } = await this.axios({
  //     method: 'POST',
  //     url: `/v1/community-lounge`,
  //     data: body,
  //   });
  //   return data;
  // };

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
      url: `/lounge`,
      params: { tgId },
    });
    return data;
  };
}

const communityLoungeApi = new CommunityLoungeApi();

export default communityLoungeApi;
