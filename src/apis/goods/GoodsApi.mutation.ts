import { useMutation } from 'react-query';

import { MutationHookParams } from '@/apis/type';

import goodsApi from './GoodsApi';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};
export const usePostListMutation = (
  params?: MutationHookParams<typeof goodsApi.getGoodsList>,
) => {
  return useMutation(goodsApi.getGoodsList, {
    ...params?.options,
  });
};
export const usePostItemCodeMutation = (
  params?: MutationHookParams<typeof goodsApi.postItemCode>,
) => {
  return useMutation(goodsApi.postItemCode, {
    ...params?.options,
  });
};

export const usePostImageMutation = (
  params?: MutationHookParams<typeof goodsApi.postImage>,
) => {
  return useMutation(goodsApi.postImage, {
    ...params?.options,
  });
};

export const usePutCreateItemMutation = (
  params?: MutationHookParams<typeof goodsApi.putCreateGoods>,
) => {
  return useMutation(goodsApi.putCreateGoods, {
    ...params?.options,
  });
};

export const usePatchGoodsStatusMutation = (
  params?: MutationHookParams<typeof goodsApi.patchStatus>,
) => {
  return useMutation(goodsApi.patchStatus, {
    ...params?.options,
  });
};

export const usePatchUpdateGoodsStatusMutation = (
  params?: MutationHookParams<typeof goodsApi.putUpdateGoods>,
) => {
  return useMutation(goodsApi.putUpdateGoods, {
    ...params?.options,
  });
};

export const usePatchOptionModifyMutation = (
  params?: MutationHookParams<typeof goodsApi.patchOptionStockModify>,
) => {
  return useMutation(goodsApi.patchOptionStockModify, {
    ...params?.options,
  });
};
export const useGoodsDeleteMutation = (
  params?: MutationHookParams<typeof goodsApi.getGoodsDelete>,
) => {
  return useMutation(goodsApi.getGoodsDelete, {
    ...params?.options,
  });
};

export const useLogItemutation = (
  params?: MutationHookParams<typeof goodsApi.getGoodsLogItem>,
) => {
  return useMutation(goodsApi.getGoodsLogItem, {
    ...params?.options,
  });
};
