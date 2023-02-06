import dayjs from 'dayjs';

type MemberDTOType = {
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

export type BasicDTO = {
  code?: string;
  data?: {
    content: UserManageDTO[];
    totalElements?: number;
    totalPages?: number;
  };
  message?: string;
  count?: number;
  success: boolean;
};

export type BasicGetListDTOType = {
  content: [];
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

export type SearchGetDTOType = {
  userId: string;
  searchType?: number;
  keyword?: string;
  page?: number;
  size?: number;
};

export type StampListGetDTOType = {
  type: string;
};

export type StampHistoryCreateDTOType = {
  stampId: string;
  userId: string;
};

export type StampHistoryInfoDTOType = {
  createdDate: dayjs.Dayjs;
  modifiedDate: dayjs.Dayjs;
  tgId: string;
  stamp: {
    createdDate: dayjs.Dayjs;
    modifiedDate: dayjs.Dayjs;
    stampId: string;
    stampName: string;
    descText: string;
    imagePath: string;
    stampType: string;
    useYn: string;
  };
};

export type MileageSearchGetDTOType = {
  userId: string;
  historyType?: number;
  keyword?: string;
  page?: number;
  size?: number;
};

export type HistoryDeleteDTOType = {
  historyId: string;
};

export type StmaperyHitoryListDTOType = Omit<BasicGetListDTOType, 'content'> & {
  content: {
    tgId: string;
    stampName: string;
    stampType: string;
    createdDate: string;
  }[];
};
export type StampListDTOType = {
  data: StampInfoDTOType[];
  count?: number;
  success: boolean;
};

export type StampInfoDTOType = {
  stampId: string;
  stampName: string;
  imagePath: string;
};

export type ActivitHitoryListDTOType = Omit<BasicGetListDTOType, 'content'> & {
  content: {
    airlineTicketId: string;
    departureAirportName: string;
    arrivalAirportName: string;
    departureKorDate: string;
    arrivalKorDate: string;
    createdDate: string;
  }[];
};
export type MileageHitoryListDTOType = Omit<BasicGetListDTOType, 'content'> & {
  content: {
    historyId: string;
    point: number;
    action: string;
    createdDate: string;
  }[];
};

export type UserManageDTO = {
  activeUser: string;
  emailAddress: string;
  name: string;
  leaveDate: string;
  reportedCount: number;
  stampCount: number;
  ticketAuthCount: number;
  totalMileage: number;
  userId: string;
};
export type RequestDTOType = {
  page: number;
  size: number;
  type?: string;
  keyword?: string;
};

export type UserManageListResponse = MemberDTOType & {
  content: {
    activeUser: string;
    emailAddress: string;
    name: string;
    leaveDate: string;
    reportedCount: number;
    stampCount: number;
    ticketAuthCount: number;
    totalMileage: number;
    userId: string;
  }[];
};
