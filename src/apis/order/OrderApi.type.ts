//주문내역 params
export type OrderListParamsType = {
  pageNo: number;
  pageSize: number;
  searchType?: string;
  searchKeyword?: string;
  orderType?: number;
  orderStatus?: number;
  cancelStatus?: number[];
  periodType?: string;
  periodStartDate?: string;
  periodEndDate?: string;
};
//주문내역 request type
export type OrderListDtoType = {
  code: string;
  count: number;
  data: OrderListResType;
  success: boolean;
};

//주문내역 response type
export type OrderListResType = {
  count: number;
  totalCount: number;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  orders: Array<OrderListItemType>;
};

export type OrderListItemType = {
  orderId: string;
  merchantUid: string;
  itemCode: string;
  itemId: string;
  orderAmount: number;
  discountAmount: number;
  paymentAmount: number;
  paymentTaxType: number;
  paymentTaxTypeName: string;
  paymentMethod: string;
  paymentStatus: number;
  paymentStatusName: string;
  paymentDate: string;
  orderTitle: string;
  orderOptionTitle: string;
  orderDateTimeOfUse: string;
  orderCnt: number;
  orderType: number;
  orderTypeName: string;
  orderStatus: number;
  orderStatusName: string;
  orderDate: string;
  orderEmail: string;
  orderRequestDetail: string;
  orderName: string;
  orderHp: string;
  recieverName: string;
  recieverHp: string;
  postcode: string;
  address: string;
  addressDetail: string;
  shippingCompany: string;
  shippingInvoice: string;
  shippingMemo: string;
  cancelStatus: number;
  cancelStatusName: string;
  cancelType: number;
  cancelTypeName: string;
  cancelAmount: number;
  cancelRequestType: number;
  cancelRequestTypeName: string;
  cancelRequestDate: string;
  cancelRequestDetail: string;
  cancelFaultType: number;
  cancelFaultId: string;
  cancelFaultTypeName: string;
  cancelDeniedDate: string;
  cancelDeniedDetail: string;
  cancelConfirmDate: string;
  coupons: Array<couponListType>;
  payment: Array<PaymentListType>;
  orderCategoryTitle: string;
  orderLocationTitle: string;
  orderImagePath: string;
  orderThumbnailImagePath: string;
};

export type couponListType = {
  title: string;
  priceDc: number;
};

export type ImageListType = {
  sort: number;
  imagePath: string;
  thumbnailImagePath: string;
};

export type PaymentListType = {
  impUid: string;
  merchantUid: string;
  payMethod: 'card';
  bankName: null;
  cardName: string;
  cardQuota: number;
  amount: number;
  cancelAmount: number;
  currency: string;
  receiptUrl: string;
  cancelHistory: Array<CancelListType>;
};

export type CancelListType = {
  pgTid: string;
  amount: number;
  cancelledAt: number;
  reason: string;
  cancellationId: string;
  receiptUrl: string;
};

//주문상세
export type OrderDetailItemResType = {
  code: string;
  count: number;
  data: OrderDetailItemType;
  success: boolean;
  message?: string;
};
//상세
export type OrderDetailItemType = {
  orderId: string;
  merchantUid: string;
  orderAmount: number;
  discountAmount: number;
  itemCode: string;
  paymentAmount: number;
  paymentTaxType: number;
  paymentTaxTypeName: string;
  paymentMethod: string;
  paymentStatus: number;
  paymentStatusName: string;
  paymentDate: string;
  orderTitle: string;
  orderOptionTitle: string;
  orderItemId: string;
  orderItemCode: string;
  orderDateTimeOfUse: string;
  orderCnt: number;
  orderType: number;
  orderTypeName: string;
  orderStatus: number;
  orderStatusName: string;
  orderDate: string;
  orderEmail: string;
  orderRequestDetail: string;
  orderName: string;
  orderHp: string;
  recieverName: string;
  recieverHp: string;
  postcode: string;
  address: string;
  addressDetail: string;
  shippingCompany: string;
  shippingInvoice: string;
  shippingMemo: string;
  cancelStatus: number;
  cancelStatusName: string;
  cancelType: number;
  cancelTypeName: string;
  cancelAmount: number;
  cancelRequestType: number;
  cancelRequestTypeName: string;
  cancelRequestDate: string;
  cancelRequestDetail: string;
  cancelFaultType: number;
  cancelFaultId: string;
  cancelFaultTypeName: string;
  cancelDeniedDate: string;
  cancelDeniedDetail: string;
  cancelConfirmDate: string;
  coupons: Array<couponListType>;
  payment: Array<PaymentListType>;
  orderCategoryTitle: string;
  orderLocationTitle: string;
  orderImagePath: string;
  orderThumbnailImagePath: string;
  buyerEmail: string;
  buyerName: string;
  buyerHp: string;
  partnerMemo: string;
  policies: Array<policiesType>;
};

export type policiesType = {
  policyId: number;
  title: string;
  type: number;
  typeName: string;
  days: number;
  feePer: number;
  sort: number;
};

//주문 메모
export type OrderMemoParamsType = {
  orderId: string;
  body: {
    memo: string;
  };
};

//배송지 정보
export type OrderShoppingParamsType = {
  orderId: string;
  body: {
    shippingCompany: string;
    shippingInvoice: string;
    shippingMemo: string;
  };
};

//주문 취소 요청 정보
export type OrderCancelRequestParamsType = {
  orderId: string;
  type: string;
  body: {
    orderCancelRequestDetail: string;
  };
};

//주문 접수
export type OrderConfrimParamsType = {
  orderId: string;
};
//취소내역 params
export type OrderCancelListParamsType = {
  pageNo: number;
  pageSize: number;
  searchType?: string;
  searchKeyword?: string;
  orderType?: number;
  orderStatus?: number;
  cancelStatus?: number[];
  periodType?: string;
  periodStartDate?: string;
  periodEndDate?: string;
};