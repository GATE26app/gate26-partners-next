import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import { basicDtotype } from '@apis/common/CommonApi.type';

<<<<<<< HEAD
import { getToken } from '@utils/localStorage/token';

import { InquirySendMailType } from './OneQuestionApi.type';

=======
>>>>>>> 44f6960 (chore: 🤖npm run build)
export class OneQuestionApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

<<<<<<< HEAD
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
      url: `/backoffice/users/inquires/${inquiryId}`,
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
      url: '/backoffice/users/inquires',
      data: body,
=======
  getInquiryList = async (
    urlStr: string,
  ): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      url: urlStr,
>>>>>>> 44f6960 (chore: 🤖npm run build)
    });
    return data;
  };
}

const oneQuestionApi = new OneQuestionApi();

export default oneQuestionApi;
