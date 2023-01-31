export type AirlineRequestDTOType = {
  type?: number;
  keyword?: string;
  page?: number;
  size?: number;
};

export type AirlineInfoDTOType = {
  airlineId?: string;
  airlineCode?: string;
  name?: string;
  englishName?: string;
  imageUrl?: string;
  homepageUrl?: string;
  selfCheckInUrl?: string;
  dutyFreeShopUrl?: string;
  phoneNumber?: string;
  domestic?: boolean;
  useYn?: boolean;
};

export type AirlineModifyDTOType = {
  airlineCode?: string;
  name?: string;
  englishName?: string;
  imageUrl?: string;
  homepageUrl?: string;
  selfCheckInUrl?: string;
  dutyFreeShopUrl?: string;
  phoneNumber?: string;
  domestic?: boolean;
  useYn?: boolean;
};
