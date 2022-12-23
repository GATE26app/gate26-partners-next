import { StringLocale } from 'yup/lib/locale';

export type CommonCodeInfoDTOType = {
  deviceType: string;
  majorVersion: string;
  minorVersion: string;
  patchVersion: string;
  descText: string;
  versionStatus: string;
};

export type DefaultDTOType = {
  code?: string;
  data?: string;
  message?: StringLocale;
  count?: number;
  success: boolean;
};

export type CommonCodeInfoDTO = {
  code?: string;
  data?: CommonCodeInfo;
  message?: StringLocale;
  count?: number;
  success: boolean;
};

export type CommonCodeInfo = {
  id: number;
  deviceType: string;
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;
  descText: string;
  versionStatus: string;
  modifiedDate: string;
};