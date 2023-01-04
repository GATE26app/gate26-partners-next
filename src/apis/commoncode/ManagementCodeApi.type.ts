import { StringLocale } from 'yup/lib/locale';

export type CommonCodeInfoDTOType = {
  content: CommonCodeInfo[];
  totalElements: number;
  totalPages: number;
  pageable:any;
};

export type CommonCodeInfoDTO = {
  code?: string;
  data?: CommonCodeInfoDTOType;
  message?: StringLocale;
  count?: number;
  success: boolean;
};

export type CommonCodeInfo = {
  codeId: number;
  codeName: string;
  descText: string;
  codeValue: string;
};

export type PagingDTOType = {
  page : number;
  size : number;
  type? : string;
  keyword? : string;
};