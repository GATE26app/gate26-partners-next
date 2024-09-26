import { AxiosInstance } from 'axios';
import { useStore } from 'zustand';

import instance from '@/apis/_axios/instance';

import { getToken } from '@/utils/localStorage/token';
import {
  SendBirdChannelMessageType,
  SendBirdImageType,
  SendBirdMessageDtoType,
  SendBirdTokenDtoType,
} from './SendBirdApi.type';

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
  getSendBirdImage = async (res: SendBirdImageType): Promise<any> => {
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

  //백업 메세지 조회
  getSendBirdBackUpMessage = async (
    res: SendBirdChannelMessageType,
  ): Promise<SendBirdMessageDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/partner/chat/channels/${res.channelUrl}/backup-messages?message_id=${res.messageId}&prev_limit=${res.prevLimit}&next_limit=${res.nextLimit}&reverse=true&include_reply_type=all&with_sorted_meta_array=true&include_reactions=true&include_thread_info=true&include_parent_message_info=true&show_subchannel_message_only=false&include_poll_details=true`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const sendBirdApi = new SendBirdApi();

export default sendBirdApi;
