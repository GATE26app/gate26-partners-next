import { useQuery } from 'react-query';

import userApi from './UserApi';
import { QueryHookParams } from '../type';

export const GOODS_API_QUERY_KEY = {
  GET_MEMBER_INFO: () => ['memeber-info'],
};

export function useGetUserQuery(
  params?: QueryHookParams<typeof userApi.getMemberInfo>,
) {
  const queryKey = GOODS_API_QUERY_KEY.GET_MEMBER_INFO();
  const query = useQuery(queryKey, userApi.getMemberInfo, params?.options);

  return { ...query, queryKey };
}
