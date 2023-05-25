import { StringLocale } from 'yup/lib/locale';

export type ResponseDTOType = {
  data?: {
    content: UserInfoDTO[];
    totalElements?: number;
    totalPages?: number;
  };
  count: number;
  success: boolean;
};

export type UserInfoDTO = {
  userId: string;
  profileImagePath: string;
  nickName: string;
  name: string;
  enLastName: string;
  enFirstName: string;
  gender: string;
  birthDate: string;
  phone: string;
  emailAddress: string;
  recommendeeNickname: string;
  createdDate: string;
  lastAccessDate: string;
};

export type RequestDTOType = {
  page: number;
  size: number;
  type?: number;
  keyword?: string;
};
