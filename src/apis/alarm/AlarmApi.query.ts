import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from 'react-query';

import { AxiosError } from 'axios';

import { InfiniteQueryHookParams } from '@apis/type';

import alarmApi from './AlarmApi';
import { AlarmListDtoType, AlarmListParamsType } from './AlarmApi.type';

export const COMMERCE_API_QUERY_KEY = {
  COMMERCE_HOME_LIST: () => ['alarmList'],
};

interface PagePrams {
  totalCount: number;
}

export const useGetAlarmLitQuery = (
  params: AlarmListParamsType,
  options?: UseInfiniteQueryOptions<
    AlarmListDtoType,
    AxiosError<{ message: string }>,
    AlarmListDtoType,
    AlarmListDtoType,
    ['alarmList', AlarmListParamsType]
  >,
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['alarmList', params], //query key 설정
    queryFn: async ({ pageParam: pageNum = 1 }: { pageParam?: number }) =>
      alarmApi.getAlarmList(params),
    getNextPageParam: (nextInfo, allPages) => {
      if (nextInfo.data.totalCount !== 0) {
        if (nextInfo?.data.pageNo >= nextInfo.data.pageCount) {
          return undefined;
        } else {
          params.pageNo + 1;
          return allPages.length + 1;
        }
      }
    },
  });
