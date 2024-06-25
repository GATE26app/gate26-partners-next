//주문내역 request type
export type UserInfoDtoType = {
  code: string;
  count: number;
  data: {
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
    images: Array<MemberInfoImageType>;
    files: [];
  };
  success: boolean;
};

export type MemberInfoImageType = {
  imagePath: string;
  thumbnailImagePath: string;
  createdDate: string;
};
