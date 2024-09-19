export type TokenType = {
  access: string;
  refresh: string;
};

export type LoginDTOType = {
  loginId: string;
  password: string;
  fcmToken: string;
};

export type LoginDTO = {
  data?: LoginInfo;
  message?: string;
  success: boolean;
  code: string;
};

export type LoginInfo = {
  accessToken: string;
  refreshToken: string;
};
