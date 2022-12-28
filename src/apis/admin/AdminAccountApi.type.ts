export type AdminAccountInfoDTOType = {
    content: AdminAccountInfo[];
    pageable: any;
    last: boolean;
    totalPages : number;
    totalElements: number;
    sort: any;
    first : boolean;
    numberOfElements: number;
    size : number;
    empty : boolean;
};

export type DefaultDTOType = {
  code?: string;
  data?: AdminAccountInfoDTOType;
  message?: string;
  count?: number;
  success: boolean;
};

export type AdminAccountInfo = {
  adminId: string;
  adminName: string;
  adminEmail: string;
  authId: number;
  useYn: string;
  createdDate: string;
};

export type PagingDTOType = {
    page: number;
    size: number;
  };