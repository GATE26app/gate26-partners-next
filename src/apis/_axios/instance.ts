import axios, { AxiosError } from 'axios';

import { CONFIG } from '@config';

import { apiLogger } from '@utils/apiLogger';
import { getToken } from '@utils/localStorage/token';
import styledConsole from '@utils/styledConsole';

// import { refresh } from './refresh';
export type BasicListDTO<T> = {
  code?: string;
  data?: {
    content: T;
    totalElements?: number;
    totalPages?: number;
  };
  message?: string;
  count?: number;
  success: boolean;
};
export type AxiosResponseType<T> = {
  count: number;
  data: T;
  success: boolean;
};

const isDev = CONFIG.ENV === 'development';

const instance = axios.create({
  baseURL: isDev
    ? 'http://dbackoffice.gate26.co.kr'
    : 'http://dbackoffice.gate26.co.kr',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthHeader = (token: string) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const unsetAuthHeader = () => {
  delete instance.defaults.headers.common['Authorization'];
};

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    // 만약 토큰이 없다면
    const isAccess = !!token;
    //&& !!token.access;
    if (isAccess) {
      // setAuthHeader(token.access as string);
      // return {
      //   ...config,
      //   headers: { ...config.headers, Authorization: `Bearer ${token.access}` },
      // };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    const { status, config: reqData, data: resData } = res;
    if (isDev) apiLogger({ status, reqData, resData });
    return res;
  },
  async (error: AxiosError) => {
    try {
      const { response: res, config: reqData } = error || {};
      const { status } = res || { status: 400 };
      const isUnAuthError = status === 401;
      const isExpiredToken = status === 444;
      const isDev = CONFIG.ENV === 'development';

      if (isDev)
        apiLogger({ status, reqData, resData: error, method: 'error' });

      if (isExpiredToken) {
        // return refresh(reqData);
      }

      if (isUnAuthError) {
        // deleteToken();
        // if (isClient) Router.push(ROUTE.LOGIN);
        // return Promise.reject(error);
      }

      return Promise.reject(error);
    } catch (e) {
      styledConsole({
        //
        method: 'error',
        topic: 'UN_HANDLED',
        title: 'axios-interceptor',
        data: e,
      });
    }
  },
);

export { setAuthHeader, unsetAuthHeader };
export default instance;
