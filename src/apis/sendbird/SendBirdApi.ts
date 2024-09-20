import { AxiosInstance } from 'axios';
import { useStore } from 'zustand';

import instance from '@/apis/_axios/instance';

import { getToken } from '@/utils/localStorage/token';
import { SendBirdImageType, SendBirdTokenDtoType } from './SendBirdApi.type';

export class SendBirdApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  //알림리스트
  getSendBirdToken = async (): Promise<SendBirdTokenDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: '/partner/chat/token',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //이미지presignedUrl
  getSendBirdImage = async (
    res: SendBirdImageType,
  ): Promise<SendBirdTokenDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/partner/chat/channels/${res.ChannelUrl}/images/${res.imageId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const sendBirdApi = new SendBirdApi();

export default sendBirdApi;
