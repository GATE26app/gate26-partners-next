export type CommunityLoungeDTOType = {};
export type CommunityLoungeListDTOType = {
  content: {
    tgId: string;
    loungeName: string;
    imagePath: string;
    coverImg: string;
    displayOrder: number;
    isOpen: string;
  }[];
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
export type CommunityLoungeDeleteDTOType = "T" | "F"
export type CommunityLoungeParamGetType = {
  searchType: number;
  keyword: string;
  page?: number;
  size?: number;
};
export type CommunityLoungeParamPutType = {
  id: string;
  data: CommunityLoungeDTOType;
};
export type CommunityLoungeParamPatchType = {
  id: string;
  data: Partial<CommunityLoungeDTOType>;
};
