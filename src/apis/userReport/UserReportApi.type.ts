export type UserReportInfoDTOType = {
    data?: {
      content: UserReportInfoDTO[];
      totalElements?: number;
      totalPages?: number;
    };
    count: number;
    message?: string;
    success: boolean;
  };
  
  export type UserReportInfoDTO = {
    descText: string,
    reportEmailAddress: string,
    reportNickName: string,
    targetEmailAddress: string,
    targetNickName: string,
    createdDate: string
  };
  
  export type PagingDTOType = {
    page: number;
    limit: number;
    type?: string;
    keyword?: string;
  };
  