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

export type SearchParamGetType = {
  userId: string;
  searchType?: number;
  keyword?: string;
  page?: number;
  size?: number;
};

export type HistoryParamDeleteDTOType = {
  historyId: string;
};

export type TotalCountGetDTOType = {
  userId: string;
};

export type UserManageDTO = {
  activeUser: string;
  emailAddress: string;
  name: string;
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
