import { StringLocale } from 'yup/lib/locale';

export type AppVersionInfoDTOType = {
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
  message?: string;
  count?: number;
  success: boolean;
};

export type AppVersionInfoDTO = {
  code?: string;
  data?: AppVesionInfo;
  message?: string;
  count?: number;
  success: boolean;
};

export type AppVesionInfo = {
  id: number;
  deviceType: string;
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;
  descText: string;
  versionStatus: string;
  modifiedDate: string;
};
