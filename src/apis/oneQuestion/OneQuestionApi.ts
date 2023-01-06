import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import { basicDtotype } from '@apis/common/CommonApi.type';

import { getToken } from '@utils/localStorage/token';

import { InquirySendMailType } from './OneQuestionApi.type';

export class OneQuestionApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getInquiryList = async (urlStr: string): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: urlStr,
    });
    return data;
  };

  getInquiry = async (inquiryId?: string): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `http://dbackoffice.gate26.co.kr/users/inquires/${inquiryId}`,
    });
    return data;
  };

  postInquirySendMail = async (
    body: InquirySendMailType,
  ): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: 'http://dbackoffice.gate26.co.kr/users/inquires',
      data: body,
    });
    return data;
  };
}

const oneQuestionApi = new OneQuestionApi();

export default oneQuestionApi;
