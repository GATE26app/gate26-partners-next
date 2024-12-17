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
  const postReviewListMutation = usePostReviewListMutation();
  return useMutation(reviewApi.putReviewComment, {
    ...params?.options,
    onSuccess: (data: any, variables: any, context: any) => {
      // 기존 onSuccess 콜백 실행
      if (params?.options?.onSuccess) {
        params.options.onSuccess(data, variables, context);
      }
      // 리뷰 댓글 삭제 성공 시 리뷰 리스트 다시 호출
      postReviewListMutation.mutate();
    },
  });
};

//리뷰 댓글 삭제
export const useDeleteReviewCommentMutation = (
  params?: MutationHookParams<typeof reviewApi.deleteReviewComment>,
) => {
  const postReviewListMutation = usePostReviewListMutation();
  return useMutation(reviewApi.deleteReviewComment, {
    ...params?.options,
    onSuccess: (data: any, variables: any, context: any) => {
      // 기존 onSuccess 콜백 실행
      if (params?.options?.onSuccess) {
        params.options.onSuccess(data, variables, context);
      }
      // 리뷰 댓글 삭제 성공 시 리뷰 리스트 다시 호출
      postReviewListMutation.mutate();
    },
  });
};
