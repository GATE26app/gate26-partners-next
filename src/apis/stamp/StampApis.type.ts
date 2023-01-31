export type StampDTOType = {
  stampName: string;
  descText: string;
  stampType: string;
  useYn: string;
  img?: File;
};
export type StampUpdateDTOType = {
  stampId: string;
  stampName?: string;
  descText?: string;
  stampType?: string;
  useYn?: string;
  imagePath?: string;
  deleteFile?: string;
  img?: File;
};
export type StampListDTOType = {
  stampId: string;
  stampType: string;
  stampName: string;
  descText: string;
  imagePath: string;
  useYn: string;
};

export type StampParamGetType = {
  filterType?: number;
  searchType?: number;
  page?: number;
  size?: number;
  keyword?: string;
};

export type NoticeParamPatchType = {
  id: string;
  data: Partial<StampDTOType>;
};
