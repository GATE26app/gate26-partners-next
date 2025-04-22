import { useRouter } from 'next/navigation';

import axios from 'axios';

import { apiLogger } from '@/utils/apiLogger';
import {
  deleteErrorCode,
  deleteUserInfo,
  getToken,
  getUserId,
  setErrorCode,
  setToken,
} from '@/utils/localStorage/token';
import { sanitizeInput } from '@/utils/sanitizeInput';
import { CONFIG } from '../../../config';

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
  baseURL: isDev ? '/api/backoffice' : '/api/backoffice',
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthHeader = (token: string) => {
  if (token) {
    instance.defaults.headers.common['X-AUTH-TOKEN'] = token;
  }
};

const unsetAuthHeader = () => {
  delete instance.defaults.headers.common['X-AUTH-TOKEN'];
};

// const userZuInfo = useStore(useUserZuInfo, (state) => state.userZuInfo);

// console.log('userZuInfo', userZuInfo.accessToken);
function refreshToken() {
  const axiosOption = {
    method: 'patch',
    url: '/api/backoffice/partner/member/refresh-access-token',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': `${getToken().refresh}`,
    },
  }
  console.log('axiosOption', axiosOption);
  return axios(axiosOption);
}

// 객체의 모든 문자열 값에 대해 sanitize를 수행하는 함수
const sanitizeObject = (obj: any): any => {
  // FormData나 Blob 객체는 sanitize하지 않음
  if (obj instanceof FormData || obj instanceof Blob) {
    return obj;
  }

  if (typeof obj === 'string') {
    return sanitizeInput(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (typeof obj === 'object' && obj !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'content') {
        sanitized[key] = value;
      } else {
        sanitized[key] = sanitizeObject(value);
      }
    }
    return sanitized;
  }

  return obj;
};

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    const isAccess = !!token;

    // 요청 데이터 sanitize 처리
    if (config.data) {
      config.data = sanitizeObject(config.data);
    }
    if (config.params) {
      config.params = sanitizeObject(config.params);
    }

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
const Logout = async () => {
  const router = useRouter();
  const param = { id: '', incorrectNum: 0 };
  // setPassCheck(param);
  document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  deleteUserInfo();
  router.push('/login');
};
const refreshExpiredTokenClosure = () => {
  let isCalled = false;
  let runningPromise: any = undefined;

  return () => {
    if (isCalled) {
      return runningPromise;
    } else {
      isCalled = true;
      runningPromise = refreshToken().then(
        (response) => {
          console.log('call refreshToken success', response)
          isCalled = false; // 토큰 갱신 성공 시 플래그 리셋
          return response;
        },
        (error) => {
          console.log('call refreshToken error', error)
          isCalled = false; // 토큰 갱신 실패 시 플래그 리셋
          return Promise.reject(error);
        },
      );
      return runningPromise;
    }
  };
};

const refreshExpiredToken = refreshExpiredTokenClosure();
instance.interceptors.response.use(
  (res) => {
    const { status, config: reqData, data: resData } = res;
    if (isDev) apiLogger({ status, reqData, resData });
    return res;
  },
  async (error) => {
    const { response: res, config: originalRequest } = error || {};
    const { status } = res || {};
    const isUnAuthError = status === 401;
    const code = res?.data?.code;
    setErrorCode(code);

    if (isDev) {
      apiLogger({
        status,
        reqData: originalRequest,
        resData: error,
        method: 'error',
      });
    }

    if (isUnAuthError) {
      // console.log('getToken()', getToken());
      // console.log('getToken().refresh', getToken().refresh);
      if (!getToken().refresh) {
        // console.log(
        //   `리프레쉬 토큰 발급 중 refresh Token ${getToken().refresh}`,
        // );
        if (getToken().refresh == null) {
          document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          window.location.href = '/login';
        }
        // Sentry.captureMessage(
        //   `리프레쉬 토큰 발급 중 refresh Token ${getToken().refresh}`,
        // );
        Logout();
        return Promise.reject(error);
      }

      try {
        const res = await refreshExpiredToken();
        // console.log('refreshExpiredToken', res);

        if (res.data.data.accessToken) {
          const param = {
            access: res.data.data.accessToken,
            refresh: getToken().refresh,
          };
          setToken(param);
          deleteErrorCode();
          originalRequest.headers['X-AUTH-TOKEN'] = res.data.data.accessToken;
          return instance(originalRequest);
        }
      } catch (err) {
        document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        console.log(`리프레쉬 토큰 에러 ${getUserId()}`);
        window.location.href = '/login';
        // Sentry.captureMessage(`리프레쉬 토큰 에러 ${getUserId()}`);
        Logout();
        unsetAuthHeader();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export { setAuthHeader, unsetAuthHeader };
export default instance;
