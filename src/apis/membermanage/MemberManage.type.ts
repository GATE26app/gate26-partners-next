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
  limit: number;
  type?: string;
  keyword?: string;
};
