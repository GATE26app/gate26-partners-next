import { UseInfiniteQueryOptions, useInfiniteQuery } from 'react-query';
import sendBirdApi from './SendBirdApi';
import {
  SendBirdChannelMessageType,
  SendBirdMessageDtoType,
} from './SendBirdApi.type';
import { AxiosError } from 'axios';

interface PagePrams {
  // page: number;
  // setPage: (page: number) => void;
  totalCount: number;
}

export const useGetBackUpChatListQuery = (
  params: SendBirdChannelMessageType,
  options?: UseInfiniteQueryOptions<
    SendBirdMessageDtoType,
    AxiosError<{ message: string }>,
    SendBirdMessageDtoType,
    SendBirdMessageDtoType,
    ['BackUpChatList', SendBirdChannelMessageType]
  >,
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['BackUpChatList', params], //query key 설정
    queryFn: async ({ pageParam: pageNum = 1 }: { pageParam?: number }) =>
      sendBirdApi.getSendBirdBackUpMessage(params),
    getNextPageParam: (nextInfo, allPages) => {
      // console.log('nextInfo', nextInfo);
      // console.log('params', params.type);
      // console.log('pageNo', nextInfo?.data.pageNo);
      // console.log('pageCount', nextInfo?.data.pageCount);
      // console.log('allPages', allPages);messages
      // console.log('settingPage', settingPage);
      if (
        nextInfo?.data.messages[nextInfo?.data.messages.length - 1]
          ?.message_id == '' &&
        nextInfo?.data.messages.length <= 30
      ) {
        return undefined;
      } else {
        return nextInfo?.data.messages[nextInfo?.data.messages.length - 1]
          ?.message_id;
      }
    },
  });
