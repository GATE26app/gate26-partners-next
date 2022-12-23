import { CONFIG } from '@config';

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../helper';

const TOKEN_KEY = CONFIG.AUTH_TOKEN_KEY || '@token';

export type TokenType = {
  access: string;
  refresh: string;
  isRegister: boolean;
};

const GateUserDefaultKey = {
  _JWT_TOKEN: 'jwtToken',
  _USER_ID: 'userId',
};

export const getToken = () => {
  const token = getLocalStorage<string>(GateUserDefaultKey._JWT_TOKEN);
  return token;
};

export const setToken = (token: string) => {
  setLocalStorage(GateUserDefaultKey._JWT_TOKEN, token);
};

export const deleteToken = () => {
  removeLocalStorage(GateUserDefaultKey._JWT_TOKEN);
};

export const getUserId = () => {
  const token = getLocalStorage<string>(GateUserDefaultKey._USER_ID);
  return token;
};

export const setUserId = (userId: string) => {
  setLocalStorage(GateUserDefaultKey._USER_ID, userId);
};

export const deleteUserId = () => {
  removeLocalStorage(GateUserDefaultKey._USER_ID);
};
