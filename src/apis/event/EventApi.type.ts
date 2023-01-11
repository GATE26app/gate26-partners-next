import dayjs from 'dayjs';

type EventListDTOType = {
  content: {};
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

type EventListType = EventListDTOType & {
  content: {
    eventId: string;
    title: string;
    content: string;
    contentType: string;
    bannerImgPath: string;
    imgPath: string;
    seq: number;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    createdDate: dayjs.Dayjs;
    modifiedDate: dayjs.Dayjs;
  }[];
};

type EventParticipantList = EventListDTOType & {
  content: {
    userEventId: string;
    userId: string;
    userName: string;
    gender: string;
    age: number;
    email: string;
  }[];
};

type EventEditType = {
  noticeId: string;
  title: string;
  content: string;
  contentType: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  img: File;
  bannerImg: File;
};

type EventListSetType = {
  title: string;
  content: string;
  contentType: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  img: File;
  bannerImg: File;
  loungeId: string;
};
type EventListSeqType = {
  eventId: string;
  seq: number;
};
type EventParamGetType = {
  searchType?: number;
  keyword?: string;
  page?: number;
  size?: number;
};
type EventParticipantParamGetType = {
  eventId: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type {
  EventListType,
  EventParamGetType,
  EventListDTOType,
  EventEditType,
  EventListSetType,
  EventParticipantList,
  EventParticipantParamGetType,
  EventListSeqType,
};
