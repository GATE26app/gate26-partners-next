type TipListDTOType = {
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

type TipListType = TipListDTOType & {
  content: {
    tipId: string;
    tipTitle: string;
    homeImage: string;
    bannerImage: string;
    category: string;
    isOpen: boolean;
  }[];
};

type TipOpenType = {
  tipId: string;
  openYn: boolean;
};

type TipPostType = {
  tipTitle: string;
  category?: string;
  img?: File;
  bannerImg?: File;
};
type TipPutType = TipPostType & {
  tipId: string;
  deleteFile?: string;
  deleteBannerFile?: string;
  homeImage?: string;
  bannerImage?: string;
};

type TipParamGetType = {
  searchType?: number;
  keyword?: string;
  page?: number;
  size?: number;
};

export type {
  TipListType,
  TipParamGetType,
  TipListDTOType,
  TipPostType,
  TipPutType,
  TipOpenType,
};
