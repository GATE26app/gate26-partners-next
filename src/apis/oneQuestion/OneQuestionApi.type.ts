export type inquirePageDTOType = {
  content: [inquireDTOType] | [];
  pageable: string;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  sort: sortDTOType;
  first: boolean;
  number: number;
  numberOfElments: number;
  empty: boolean;
};

export type inquireDTOType = {
  inquireTitle: string;
  inquireContent: string;
  inquireType: number;
  inquireImageUrl: [string] | [];
  isReplyDone: string | null;
};

export type pageableDTOType = {
  sort: sortDTOType;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

export type sortDTOType = {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
};
