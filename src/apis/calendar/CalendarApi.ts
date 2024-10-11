import { AxiosInstance } from 'axios';

import instance from '@/apis/_axios/instance';

import { getToken } from '@/utils/localStorage/token';
import { CalendarListDtoType, CalendarParamsType } from './CalendarApi.type';

export class CalendarApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  //캘린더 리스트
  getCalendarList = async (
    request: CalendarParamsType,
  ): Promise<CalendarListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/partner/calender`,
      params: {
        periodStartDate: request.periodStartDate,
        periodEndDate: request.periodEndDate,
      },
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const calendarApi = new CalendarApi();

export default calendarApi;
