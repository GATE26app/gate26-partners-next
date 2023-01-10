export type MenuRequestDTOType = {
  type?: string;
  keyword?: string;
  page?: number;
  size?: number;
};

export type AdminMenuInfoDTOType = {
  upMenuId?: number;
  menuName?: string;
  menuPath?: string;
  depth?: number;
  sort?: number;
  useYn?: boolean;
};

export type AdminMenuModifyDTOType = {
  menuName?: string;
  menuPath?: string;
  depth?: number;
  sort?: number;
  useYn?: boolean;
};
