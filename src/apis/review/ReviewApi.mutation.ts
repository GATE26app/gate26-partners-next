import { useMutation } from 'react-query';

import { MutationHookParams } from '@/apis/type';

import reviewApi from './ReviewApi';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};

//주문 목록
export const usePostReviewListMutation = (
  params?: MutationHookParams<typeof reviewApi.getReviewList>,
) => {
  return useMutation(reviewApi.getReviewList, {
    ...params?.options,
  });
};

//리뷰 댓글 작성
export const usePutReviewCommentMutation = (
  params?: MutationHookParams<typeof reviewApi.putReviewComment>,
) => {
  return useMutation(reviewApi.putReviewComment, {
    ...params?.options,
  });
};

//리뷰 댓글 삭제
export const useDeleteReviewCommentMutation = (
  params?: MutationHookParams<typeof reviewApi.deleteReviewComment>,
) => {
  return useMutation(reviewApi.deleteReviewComment, {
    ...params?.options,
  });
};
