import { AxiosInstance } from 'axios';

import instance from '@/apis/_axios/instance';

import { getToken } from '@/utils/localStorage/token';
import {
  FindIdAuthKeyType,
  FindPwResetBody,
  JoinAuthCheckBody,
  JoinAuthEmailCheckBody,
  JoinAuthKeyType,
  JoinBody,
  JoinDtoType,
  JoinHpBody,
  JoinIdCheckType,
  JoinImageResType,
  JoinPdfResType,
} from './JoinApi.type';
import { crypto } from '@/utils/crypto';

export class JoinApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  //회원가입 - 아이디 중복확인
  postJoinIdCheck = async (id: string): Promise<JoinIdCheckType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/join/duplicate/id/${id}`,
    });
    return data;
  };

  //회원가입 - 본인인증키 발급
  postJoinAuthHpKey = async (phone: string): Promise<JoinAuthKeyType> => {
    let encryptedPhone = crypto.encrypt(phone);
    const body : JoinHpBody = { hp : encryptedPhone };
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/join/auth`,
      data: body
    });
    return data;
  };
  //회원가입 - 본인인증 확인
  postJoinAuthCheck = async (
    body: JoinAuthCheckBody,
  ): Promise<JoinAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/join/auth/hp`,

      data: body,
    });
    return data;
  };
  //회원가입 - 이메일 인증코드 발금
  postJoinAuthEmail = async (email: string): Promise<JoinAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/join/auth/email/${email}`,
    });
    return data;
  };

  //회원가입 - 이메일 인증코드 확인
  postJoinAuthCheckEmail = async (
    body: JoinAuthEmailCheckBody,
  ): Promise<JoinAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/join/auth/email`,
      data: body,
    });

    return data;
  };

  //회원가입 - 프로필 이미지 등록
  postJoinImage = async (body: FormData): Promise<JoinImageResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/join/image/upload`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: body,
    });

    return data;
  };

  //회원가입 - pdf 등록
  postJoinPdf = async (body: FormData): Promise<JoinPdfResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/join/file/upload`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: body,
    });

    return data;
  };
  //회원가입
  putJoin = async (req: JoinBody): Promise<JoinDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PUT',
      url: `/partner/member/join`,

      data: req,
    });
    return data;
  };
  //아이디 찾기 - 본인인증키 발급
  postFindIdAuthHpKey = async (phone: string): Promise<JoinAuthKeyType> => {
    let encryptedPhone = crypto.encrypt(phone);
    const body : JoinHpBody = { hp : encryptedPhone };
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/find-id/auth/hp`,
      data: body
    });
    return data;
  };
  //아이디 찾기 - 본인인증 확인
  postFindIdAuthCheck = async (
    body: JoinAuthCheckBody,
  ): Promise<FindIdAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/find-id/auth/hp`,

      data: body,
    });
    return data;
  };
  //아이디 찾기  - 이메일 인증코드 발금
  postFindIdAuthEmail = async (email: string): Promise<JoinAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/find-id/auth/email/${email}`,
    });
    return data;
  };

  //아이디 찾기  - 이메일 인증코드 확인
  postFindIdAuthCheckEmail = async (
    body: JoinAuthEmailCheckBody,
  ): Promise<FindIdAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/find-id/auth/email`,
      data: body,
    });

    return data;
  };

  //비밀번호 찾기 - 본인인증키 발급
  postFindPWAuthHpKey = async (phone: string): Promise<JoinAuthKeyType> => {
    let encryptedPhone = crypto.encrypt(phone);
    const body : JoinHpBody = { hp : encryptedPhone };
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/find-pw/auth/hp/${phone}`,
      data: body
    });
    return data;
  };
  //비밀번호 찾기 - 본인인증 확인
  postFindPwAuthCheck = async (
    body: JoinAuthCheckBody,
  ): Promise<FindIdAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/find-pw/auth/hp`,

      data: body,
    });
    return data;
  };
  //비밀번호 찾기  - 이메일 인증코드 발금
  postFindPwAuthEmail = async (email: string): Promise<JoinAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/find-pw/auth/email/${email}`,
    });
    return data;
  };

  //비밀번호 찾기  - 이메일 인증코드 확인
  postFindPwAuthCheckEmail = async (
    body: JoinAuthEmailCheckBody,
  ): Promise<FindIdAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/find-pw/auth/email`,
      data: body,
    });

    return data;
  };

  //비밀번호 찾기  - 비밀번호 변경
  postFindPwResetPw = async (
    body: FindPwResetBody,
  ): Promise<JoinAuthKeyType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/member/find-pw/reset-pw`,
      data: body,
    });

    return data;
  };
}

const joinApi = new JoinApi();

export default joinApi;
