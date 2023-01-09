export type CommonCodeDTOType = {
  codeId: number;
  codeName: string;
  codeValue: string;
  parentCodeName: string;
  resource: string;
};

export type basicDtotype = {
  message: any;
  data: any;
  success: any;
};

export type AirportListDTOType = {
  code?: string;
  data?: {
    content: AirportInfo[];
    totalElements?: number;
    totalPages?: number;
  };
  message?: string;
  count?: number;
  success: boolean;
};

export type AirportInfo = {
  code: string;
  name: string;
  useYn: boolean | string;
  loungeId: string;
};

export type AirportInfoDTO = {
  code?: string;
  data?: AirportInfo;
  message?: string;
  count?: number;
  success: boolean;
};

export type RequestDTOType = {
  type?: string;
  keyword?: string;
  page?: number;
  size?: number;
};

export type RoungeDTOType = {
  code?: string;
  data?: RoungeInfo[];
  message?: string;
  count?: number;
  success: boolean;
};

export type RoungeInfo = {
  loungeId: string;
  name: string;
};

export type DefaultDTOType = {
  code?: string;
  data?: string;
  message?: string;
  count?: number;
  success: boolean;
};

export type RoungeModifyDTOType = {
  name: string;
  useYn: boolean;
  loungeId: string;
};

export type AirportPutInfo = {
  name: string;
  useYn: boolean | string;
  loungeId: string;
};
