import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import { basicDtotype } from '@apis/common/CommonApi.type';

export class OneQuestionApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getInquiryList = async (
    urlStr: string,
  ): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'GET',
      url: urlStr,
    });
    return data;
  };
}

const oneQuestionApi = new OneQuestionApi();

export default oneQuestionApi;
