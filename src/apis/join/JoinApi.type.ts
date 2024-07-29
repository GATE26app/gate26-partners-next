//회원가입 - 아이디 중복확인
export type JoinIdCheckType = {
  code: string;
  message: string;
  count: number;
  data: string;
  success: boolean;
};
//회원가입 - 본인인증 키
export type JoinAuthKeyType = {
  code: string;
  message: string;
  count: number;
  data: {
    authId: string;
    phone: string;
    pg: string;
    merchantUid: string;
  };
  success: boolean;
};

//회원가입 - 본인인증 확인
export type JoinAuthCheckBody = {
  authId: string;
  impUid: string;
};

//회원가입 - 이메일 확인
export type JoinAuthEmailCheckBody = {
  authId: string;
  authCode: string;
};

//회원가입 - 이미지 등록 res
export type JoinImageResType = {
  code: string;
  message: string;
  count: number;
  data: {
    imagePath: string;
    thumbnailImagePath: string;
    createdDate: string;
  };
  success: boolean;
};

//회원가입 - pdf 등록 res
export type JoinPdfResType = {
  code: string;
  message: string;
  count: number;
  data: {
    filePath: string;
    thumbnailImagePath: string;
  };
  success: boolean;
};

//회원가입 request type
export type JoinDtoType = {
  code: string;
  count: number;
  data: any;
  success: boolean;
};
//회원가입 body
export type JoinBody = {
  type: number;
  authId: string;
  loginId: string;
  password: string;
  title: string;
  tel: string;
  info: string;
  bank: string;
  accountNumber: string;
  accountHolder: string;
  nameOfCompany: string;
  businessRegistrationNumber: string;
  nameOfRepresentative: string;
  registrationNumber: string;
  address: string;
  addressDetail: string;
  businessType: string;
  businessItem: string;
  businessTel: string;
  mailOrderSalesRegistrationNo: string;
  images: Array<JoinImageArray>;
  files: Array<JoinFilesArray>;
};

export type JoinImageArray = {
  imagePath: string;
  thumbnailImagePath: string;
};

export type JoinFilesArray = {
  type: number;
  filePath: string;
  thumbnailImagePath: string;
};
//아이디 찾기 - 본인인증 키
export type FindIdAuthKeyType = {
  code: string;
  message: string;
  count: number;
  data: {
    loginId: string;
    partnerId: string;
  };
  success: boolean;
};
//비밀번호 찾기 - 이메일 확인
export type FindPwResetBody = {
  authId: string;
  password: string;
};
