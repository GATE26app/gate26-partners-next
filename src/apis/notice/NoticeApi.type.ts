import dayjs from 'dayjs';

export type NoticeDTOType = {
  noticeId?: string;
  title: string;
  content: string;
  startDate: dayjs.Dayjs;
  expiredDate: dayjs.Dayjs;
};
export type NoticeListDTOType = {
  noticeId: string;
  title: string;
  content: string;
  createdDate: dayjs.Dayjs;
  modifiedDate: dayjs.Dayjs;
  startDate: dayjs.Dayjs;
  expiredDate: dayjs.Dayjs;
};
export type NoticeParamGetType = {
  page?: number;
  limit?: number;
  search: string;
  filter: string;
};

export type NoticeParamPatchType = {
  id: string;
  data: Partial<NoticeDTOType>;
};
