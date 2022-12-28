import { StringLocale } from 'yup/lib/locale';

export type LoginDTOType = {
  adminId: string;
  adminPwd: string;
};

export type BasicDTO = {
  code?: string;
  data?: {
    content: UserManageDTO[];
    totalElements?: number;
    totalPages?: number;
  };
  message?: string;
  count?: number;
  success: boolean;
};

export type LoginInfo = {
  adminId: number;
  adminName: string;
  adminEmail: number;
  authId: number;
  useYn: number;
  createdDate: string;
  accessToken: string;
};

export type UserManageDTO = {
  activeUser: string;
  emailAddress: string;
  name: string;
  reportedCount: number;
  stampCount: number;
  ticketAuthCount: number;
  totalMileage: number;
  userId: string;
};
export type RequestDTOType = {
  page: number;
  limit: number;
  type?: string;
  keyword?: string;
};
