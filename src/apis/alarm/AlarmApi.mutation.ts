import { useMutation } from 'react-query';

import { MutationHookParams } from '@apis/type';

import alarmApi from './AlarmApi';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};

//알림 목록
export const useGetAlarmListMutation = (
  params?: MutationHookParams<typeof alarmApi.getAlarmList>,
) => {
  return useMutation(alarmApi.getAlarmList, {
    ...params?.options,
  });
};
//알림 읽음처리
export const usePatchAlarmMutation = (
  params?: MutationHookParams<typeof alarmApi.patchAlarms>,
) => {
  return useMutation(alarmApi.patchAlarms, {
    ...params?.options,
  });
};
