import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import { basicDtotype } from '@apis/common/CommonApi.type';

import { InquirySendMailType } from './OneQuestionApi.type';

export class OneQuestionApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getInquiryList = async (urlStr: string): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      url: urlStr,
    });
    return data;
  };

  getInquiry = async (inquiryId?: string): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/backoffice/users/inquires/${inquiryId}`,
    });
    return data;
  };

  postInquirySendMail = async (
    body: InquirySendMailType,
  ): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/backoffice/users/inquires',
      data: body,
    });
    return data;
  };
}

const oneQuestionApi = new OneQuestionApi();

export default oneQuestionApi;
