export type BasicDTO = {
  code?: string;
  data?: any;
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

export type PagingDTOType = {
  page: number;
  size: number;
};
