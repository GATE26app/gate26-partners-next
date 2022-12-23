import { StringLocale } from 'yup/lib/locale';

export type LoginDTOType = {
  adminId: string;
  adminPwd: string;
};

export type LoginDTO = {
  code?: string;
  data?: LoginInfo;
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
