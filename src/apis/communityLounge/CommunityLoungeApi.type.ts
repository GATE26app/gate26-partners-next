type LoungeDTOType = {
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

// 라운지 조회
export type CommunityLoungeParamGetType = {
  searchType: number;
  keyword: string;
  page?: number;
  size?: number;
};

export type CommunityLoungeListResponse = LoungeDTOType & {
  content: {
    tgId: string;
    loungeName: string;
    imagePath: string;
    coverImg: string;
    displayOrder: number;
    isOpen: string;
  }[];
};

// 라운지 등록, 수정
export type CommunityLoungePostType = {
  loungeId?: string; // 수정일때만 사용
  title: string;
  displayOrder: number;
  openYn: boolean;
  img?: File; // 홈
  coverImg?: File; // 배너
  deleteFile?: string;
  deleteCoverFile?: string;
};

export type CommunityLoungePostResponse = {
  tgId: string;
  coverImg: string;
  createdDate: string;
  displayOrder: number;
  endDateTime: string;
  imagePath: string;
  isAuthLounge: 'T' | 'F';
  isOpen: 'T' | 'F';
  loungeName: string;
  loungeType: string;
  modifiedDate: string;
  startDateTime: string;
};

// 라운지 삭제
export type CommunityLoungeDeleteDTOType = 'T' | 'F';
