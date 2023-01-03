import { Dayjs } from 'dayjs';

export type PushListDTOType = {
  content: {
    noticeId: string;
    type: string;
    title: string;
    content: string;
    noticeDate: Dayjs;
  }[];
  pageable: {
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  size: number;
  numberOfElements: number;
};
export type PushParamGetType = {
  page?: number;
  size?: number;
  keyword: string;
  searchType: number;
};
export type PushDeleteDTOType = 'T' | 'F';
