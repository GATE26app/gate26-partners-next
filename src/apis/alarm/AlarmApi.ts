import { AxiosInstance } from 'axios';
import { useStore } from 'zustand';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import { AlarmListDtoType, AlarmListParamsType } from './AlarmApi.type';

export class AlarmApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  //알림리스트
  getAlarmList = async (
    request: AlarmListParamsType,
  ): Promise<AlarmListDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/partner/alarms?pageNo=${request?.pageNo}&pageSize=${request.pageSize}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //알림 읽음처리
  patchAlarms = async (alarmId: number): Promise<AlarmListDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'PATCH',
      url: `/partner/alarms/${alarmId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const alarmApi = new AlarmApi();

export default alarmApi;
