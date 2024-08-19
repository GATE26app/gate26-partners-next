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
    images: Array<MemberInfoImageType>;
    shippingType: number;
    shippingTypeName: string;
    shippingFee: number;
    shippingMinAmount: number;
  };
  success: boolean;
};

export type MemberInfoImageType = {
  imagePath: string;
  thumbnailImagePath: string;
  createdDate: string;
};
