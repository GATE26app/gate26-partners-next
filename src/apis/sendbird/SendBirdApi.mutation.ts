import { useMutation } from 'react-query';
import sendBirdApi from './SendBirdApi';
import { MutationHookParams } from '../type';

//Presigned URL
export const useGetImage = (
  params?: MutationHookParams<typeof sendBirdApi.getSendBirdImage> | undefined,
) => {
  return useMutation(sendBirdApi.getSendBirdImage, {
    ...params?.options,
  });
};
