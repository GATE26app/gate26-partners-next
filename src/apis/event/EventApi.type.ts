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
    loungeId: string;
    loungeName: string;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    createdDate: dayjs.Dayjs;
    modifiedDate: dayjs.Dayjs;
  }[];
};

type EventParticipantList = EventListDTOType & {
  content: {
    id: string;
    name: string;
    nickName: string;
    gender: string;
    birthDate: number;
    emailAddress: string;
    prize: string;
    isWinner: boolean;
  }[];
};

type EventPostType = {
  eventId?: string;
  title: string;
  content: string;
  contentType: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  img?: File;
  bannerImg?: File;
  loungeId?: string;
  deleteFile?: string;
  deleteBannerFile?: string;
};

type EventPostResponse = {
  bannerImgPath: string;
  content: string;
  contentType: string;
  createdDate: string;
  endDate: Date;
  eventId: string;
  imgPath: string;
  modifiedDate: Date;
  regUserId: null;
  seq: number;
  startDate: Date;
  title: string;
  useYn: 'T' | 'F';
  validDate: boolean;
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
  searchType?: number | any;
  keyword?: string;
  page?: number;
  size?: number;
};
export type {
  EventListType,
  EventParamGetType,
  EventListDTOType,
  EventPostType,
  EventParticipantList,
  EventParticipantParamGetType,
  EventListSeqType,
  EventPostResponse,
};
