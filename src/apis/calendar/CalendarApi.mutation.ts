import { useMutation } from 'react-query';
import calendarApi from './CalendarApi';
import { MutationHookParams } from '../type';

//Presigned URL
export const useGetCalendarList = (
  params?: MutationHookParams<typeof calendarApi.getCalendarList> | undefined,
) => {
  return useMutation(calendarApi.getCalendarList, {
    ...params?.options,
  });
};
