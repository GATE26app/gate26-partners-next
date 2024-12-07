export type ListDtoType = {
  code?: string;
  count?: number;
  data?: any;
  success: boolean;
  message?: string;
};
export type ProfileReqType = {
  password: string;
};

export type ProfileDetailRes = {
  code: string;
  count: number;
  data: ProfileBodyType;
  success: boolean;
  message: string;
};

export type ProfileBodyType = {
  partnerId: string;
  loginId: string;
  level: number;
  levelName: string;
  type: number;
  typeName: string;
  title: string;
  authEmail: string;
  hp: string;
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
  images: Array<ProfileImageArray>;
  files: Array<ProfileFilesArray>;
  shippingType: number;
  shippingTypeName: string;
  shippingFee: number;
  shippingMinAmount: number;
  serviceChargePercent: number;
};

export type ProfileImageArray = {
  imagePath: string;
  thumbnailImagePath: string;
};

export type ProfileFilesArray = {
  type: number;
  filePath: string;
  thumbnailImagePath: string;
};

export type ChangePwReqType = {
  password: string;
  newPassword: string;
};

export type ProfileChangeReqType = {
  info: string;
  images: [
    {
      imagePath: string;
      thumbnailImagePath: string;
    },
  ];
};

export type ProfileResignReqType = {
  resignRequestReason: string;
};

export type PartnerShippingType = {
  shippingType: number;
  shippingFee: number;
  shippingMinAmount: number;
};
