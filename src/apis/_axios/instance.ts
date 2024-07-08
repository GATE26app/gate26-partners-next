// import axios, { AxiosError } from 'axios';
// import { useStore } from 'zustand';
// import { CONFIG } from '@config';
// import { apiLogger } from '@utils/apiLogger';
// import { getToken, setToken } from '@utils/localStorage/token';
// import styledConsole from '@utils/styledConsole';
// // import { refresh } from './refresh';
// export type BasicListDTO<T> = {
//   code?: string;
//   data?: {
//     content: T;
//     totalElements?: number;
//     totalPages?: number;
//   };
//   message?: string;
//   count?: number;
//   success: boolean;
// };
// export type AxiosResponseType<T> = {
//   count: number;
//   data: T;
//   success: boolean;
// };
// const isDev = CONFIG.ENV === 'development';
// const instance = axios.create({
//   baseURL: isDev ? '/backoffice' : '/backoffice',
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
// const setAuthHeader = (token: string) => {
//   if (token) {
//     instance.defaults.headers.common['X-AUTH-TOKEN'] = token;
//   }
// };
// const unsetAuthHeader = () => {
//   delete instance.defaults.headers.common['X-AUTH-TOKEN'];
// };
// // const userZuInfo = useStore(useUserZuInfo, (state) => state.userZuInfo);
// // console.log('userZuInfo', userZuInfo.accessToken);
// function refreshToken() {
//   return axios({
//     method: 'patch',
//     url: '/partner/member/refresh-access-token',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-AUTH-TOKEN': `${getToken().refresh}`,
//     },
//   });
// }
// instance.interceptors.request.use(
//   async (config) => {
//     const token = await getToken();
//     // 만약 토큰이 없다면
//     const isAccess = !!token;
//     //&& !!token.access;
//     if (isAccess) {
//       // setAuthHeader(token.access as string);
//       // return {
//       //   ...config,
//       //   headers: { ...config.headers, Authorization: `Bearer ${token.access}` },
//       // };
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );
// instance.interceptors.response.use(
//   (res) => {
//     const { status, config: reqData, data: resData } = res;
//     if (isDev) apiLogger({ status, reqData, resData });
//     return res;
//   },
//   async (error: AxiosError) => {
//     try {
//       const { response: res, config: reqData } = error || {};
//       const { status } = res || { status: 400 };
//       const isUnAuthError = status === 401;
//       const isExpiredToken = status === 444;
//       const originalRequest = reqData;
//       const isDev = CONFIG.ENV === 'development';
//       if (isDev)
//         apiLogger({ status, reqData, resData: error, method: 'error' });
//       if (isExpiredToken) {
//         // return refresh(reqData);
//       }
//       if (isUnAuthError) {
//         console.log('status', status);
//         console.log('isUnAuthError', isUnAuthError);
//         if (getToken().refresh === null || getToken().refresh === '') {
//           // Sentry.captureMessage(
//           //   `리프레쉬 토큰 발급 중 refresh Token ${getToken().refresh}`,
//           // );
//           return;
//         }
//         try {
//           const res = await refreshToken();
//           console.log('리프래쉬 res', res);
//           if (res.data.data.accessToken) {
//             console.log('리프레쉬 토큰 재발행 완료');
//             const param = {
//               access: res.data.data.accessToken,
//               refresh: getToken().refresh,
//             };
//             setToken(param);
//             originalRequest.headers = {
//               'X-AUTH-TOKEN': res.data.data.accessToken,
//             };
//             return axios(originalRequest);
//           }
//         } catch (err) {
//           console.log('리프레쉬 토큰 에러');
//           // Sentry.captureMessage(`리프레쉬 토큰 에러 ${getUserId()}`);
//           // Logout();
//           unsetAuthHeader();
//           // return Promise.reject(err);
//         }
//       }
//       return Promise.reject(error);
//     } catch (e) {
//       styledConsole({
//         //
//         method: 'error',
//         topic: 'UN_HANDLED',
//         title: 'axios-interceptor',
//         data: e,
//       });
//     }
//   },
// );
// export { setAuthHeader, unsetAuthHeader };
// export default instance;
import { useRouter } from 'next/navigation';

import axios, { AxiosError } from 'axios';



import { apiLogger } from '@/utils/apiLogger';
import {
  deleteErrorCode,
  deleteUserInfo,
  getToken,
  getUserId,
  setErrorCode,
  setToken,
} from '@/utils/localStorage/token';
import { CONFIG } from "../../../config";

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
  return axios({
    method: 'patch',
    url: '/partner/member/refresh-access-token',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': `${getToken().refresh}`,
    },
  });
}

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
const Logout = async () => {
  const router = useRouter();
  const param = { id: '', incorrectNum: 0 };
  // setPassCheck(param);
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
          isCalled = false; // 토큰 갱신 성공 시 플래그 리셋
          return response;
        },
        (error) => {
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
      // console.log(!getToken().refresh);
      // console.log('getToken().refresh', getToken().refresh);
      if (!getToken().refresh) {
        console.log(
          `리프레쉬 토큰 발급 중 refresh Token ${getToken().refresh}`,
        );
        if (getToken().refresh == null) {
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
// instance.interceptors.response.use(
//   (res) => {
//     const { status, config: reqData, data: resData } = res;
//     if (isDev) apiLogger({ status, reqData, resData });
//     return res;
//   },
//   async (error: AxiosError) => {
//     try {
//       const { response: res, config: reqData } = error || {};
//       const { status } = res || { status: 400 };
//       const isUnAuthError = status === 401;
//       const isExpiredToken = status === 444;
//       const originalRequest = reqData;
//       const isDev = CONFIG.ENV === 'development';

//       if (isDev)
//         apiLogger({ status, reqData, resData: error, method: 'error' });

//       if (isExpiredToken) {
//         // return refresh(reqData);
//       }

//       if (isUnAuthError) {
//         console.log('status', status);
//         console.log('isUnAuthError', isUnAuthError);
//         if (getToken().refresh === null || getToken().refresh === '') {
//           // Sentry.captureMessage(
//           //   `리프레쉬 토큰 발급 중 refresh Token ${getToken().refresh}`,
//           // );
//           return;
//         }

//         try {
//           const res = await refreshToken();
//           console.log('리프래쉬 res', res);
//           console.log('res',res.data)
//           if (res.data.data.accessToken) {
//             console.log('리프레쉬 토큰 재발행 완료');
//             const param = {
//               access: res.data.data.accessToken,
//               refresh: getToken().refresh,
//             };
//             setToken(param);
//             originalRequest.headers = {
//               'X-AUTH-TOKEN': res.data.data.accessToken,
//             };
//             return axios(originalRequest);
//           }
//         } catch (err) {
//           console.log('리프레쉬 토큰 에러');
//           // Sentry.captureMessage(`리프레쉬 토큰 에러 ${getUserId()}`);
//           // Logout();
//           unsetAuthHeader();
//           // return Promise.reject(err);
//         }
//       }

//       return Promise.reject(error);
//     } catch (e) {
//       styledConsole({
//         //
//         method: 'error',
//         topic: 'UN_HANDLED',
//         title: 'axios-interceptor',
//         data: e,
//       });
//     }
//   },
// );

export { setAuthHeader, unsetAuthHeader };
export default instance;
