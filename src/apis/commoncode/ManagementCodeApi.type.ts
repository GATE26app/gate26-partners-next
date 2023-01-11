import { StringLocale } from 'yup/lib/locale';

export type CommonCodeInfoDTOType = {
  code?: string;
  data?: CommonCodeInfoDTO;
  message?: StringLocale;
  count?: number;
  success: boolean;
};

export type CommonCodeInfoDTO = {
  content: CommonCodeInfo[];
  totalElements: number;
  totalPages: number;
  pageable:any;
};

export type CommonCodeInfo = {
  codeId: number;
  codeName: string;
  descText: string;
  codeValue: string;
  parentCodeName: string;
  resource?: string;
};

export type PagingDTOType = {
  page : number;
  size : number;
  type? : string;
  keyword? : string;
};

export type PostCommonCodeInfo = {
  codeName: string;
  descText: string;
  codeValue: string;
  parentCodeName?: string;
};

export type ParentCodeDTOType = {
  code?: string;
  data?: any[];
  message?: StringLocale;
  count?: number;
  success: boolean;
}