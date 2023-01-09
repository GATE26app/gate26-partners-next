export type ResponseDTOType = {
    data?: {
      content: UserReportInfoDTO[];
      totalElements?: number;
      totalPages?: number;
    };
    count: number;
    success: boolean;
  };
  
  export type UserReportInfoDTO = {
    userId: string;
    profileImagePath: string;
    nickName: string;
    name: string;
    enLastName: string;
    enFirstName: string;
    gender: string;
    birthDate: string;
    phone: string;
    emailAddress: string;
    createdDate: string;
    lastAccessDate: string;
  };
  
  export type PagingDTOType = {
    page: number;
    size: number;
    type?: string;
    keyword?: string;
  };
  