export type CommonCodeDTOType = {
  codeId: number;
  codeName: string;
  codeValue: string;
  parentCodeName: string;
  resource: string;
};

export type basicDtotype = {
  message: any;
  data: any;
  success: any;
};
export type ListDtoType = {
  code?: string;
  count?: number;
  data?: any;
  success: boolean;
  message?: string;
};
export type DeleteType = {
  itemCode: string;
};
export type GoodsCreateDtoType = {
  code?: string;
  count?: number;
  data?: any;
  message: string;
  success: boolean;
};
export type CategoryDtoType = {
  code?: string;
  count?: number;
  message: string;
  data?: CategoryDataType[];
  success: boolean;
};

export type CategoryDataType = {
  categoryId: number;
  title: string;
  sort: number;
  level: number;
  depth: number;
  categories: Array<CategoryDataType[]>;
};

export type LocationDtoType = {
  code?: string;
  count?: number;
  message: string;
  data?: LocationDataType[];
  success: boolean;
};
export type LocationDataType = {
  locationId: number;
  title: string;
  sort: number;
  level: number;
  depth: number;
  locations: Array<LocationDataType[]>;
};

export type RequestDTOType = {
  type?: string;
  keyword?: string;
  page?: number;
  size?: number;
};

export type GoodsListDtoType = {
  pageNo: number;
  pageSize: number;
  status?: number | null;
  level?: number;
  forSale?: number;
  orderBy?: string;
  sortBy?: string;
  searchKeyword?: string;
  searchType?: string;
  type?: number | null;
};

export type GoodsListParamGetType = {
  pageNo: number;
  pageSize: number;
  status?: number | null;
  level?: number;
  forSale?: number;
  orderBy?: string;
  sortBy?: string;
  searchKeyword?: string;
  searchType?: string;
  type?: number | null;
};
export type GoodsListItemLocationProps = {
  locationId: number;
  type: number;
  sort: number;
  level: number;
  depth: number;
  title: string;
  fullTitle: string;
};
export type GoodsListItemCategoryProps = {
  categoryId: number;
  title: string;
  sort: number;
  level: number;
  depth: number;
  fullTitle: string;
};
export type GoodsListResponseProps = {
  count: number;
  data: Array<GodsListItemDataListProps>;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  totalCount: number;
};
export type GoodsListItemImageProps = {
  sort: number;
  imagePath: string;
  thumbnailImagePath: string;
};
export type GodsListItemDataListProps = {
  itemCode: string;
  items: Array<GoodsListItemProps>;
};
export type GoodsListItemProps = {
  itemId: string;
  itemCode: string;
  status: number;
  statusName: string;
  title: string;
  sort: number;
  type: number;
  typeName: string;
  orderSameDay: number;
  level: number;
  levelName: string;
  forSale: number;
  forSaleName: string;
  priceNet: number;
  priceDcPer: number;
  priceDc: number;
  price: number;
  partnerTitle: string;
  locations: GoodsListItemLocationProps[];
  categories: GoodsListItemCategoryProps[];
  images: GoodsListItemImageProps[];
  viewStartDate: string;
  viewEndDate: string;
  requestDate: string;
  approvalDate: string;
  deniedDate: string;
  createdDate: string;
  modifiedDate: string;
};

export type GoodsItemType = {
  itemCode: string;
};

export type StatusProps = {
  forSale: number;
  level: number;
  viewStartDate: string;
  viewEndDate: string;
};
export type CategoryReqProps = {
  categoryId: number;
};
export type CategoryResProps = {
  categoryId: number;
  title: string;
  sort: number;
  level: number;
  depth: number;
  fullTitle: string;
};
export type LocationReqProps = {
  locationId: number;
};
export type LocationResProps = {
  locationId: number;
  type: number;
  level: number;
  depth: number;
  sort: number;
  title: string;
  fullTitle: string;
};

export type GoodsAttributeListProps = {
  code: number;
  codeName: string;
  sort: number;
  type: number;
  title: string;
};
export type GoodsPoliciesListProps = {
  title: string;
  type: number;
  sort: number;
  days: number;
  feePer: number;
};

export type ScheduleImageProps = {
  imagePath: string;
  thumbnailImagePath: string;
};
export type GoodsSchedulesListProps = {
  sort: number;
  startDay: string;
  startTime: string;
  durationTime: string;
  location: string;
  info: string;
  lat: string;
  lng: string;
  images: ScheduleImageProps[];
};
export type OptionProps = {
  optionId?: string;
  sort: number;
  type: number;
  depth: number;
  useDateTime: string;
  firstKey: string;
  firstValue: string;
  secondKey: string;
  secondValue: string;
  thirdKey: string;
  thirdValue: string;
  stockCnt: number;
  price: number;
};

export type OptionItemProps = {
  optionId?: string;
  sort: number;
  type: number;
  depth: number;
  useDateTime: string;
  firstKey: string;
  firstValue: string;
  secondKey: string;
  secondValue: string;
  thirdKey: string;
  thirdValue: string;
  stockCnt: number;
  price: number;
};

export type optionInputsProps = {
  sort: number;
  inputKey: string;
  inputValue: string;
};

//상품 등록시 basic body type
export type GoodsBasicProps = {
  itemId: string;
  title: string;
  basicInfo: string;
  detailInfo: string;
  content: string;
  reservationInfo: string;
  sort: number;
  type: number;
  orderSameDay: number;
  level: number;
  viewStartDate: string;
  viewEndDate: string;
  status: number;
  forSale: number;
  priceNet: number;
  priceDcPer: number;
  priceDc: number;
  price: number;
  optionType: number;
  optionInputType: number;
  optionInputStartDate: string;
  optionInputEndDate: string;
  autoConfirm: number;
  requiredPartnerCancelConfirm: number;
};
//상품등록 type
export type GoodsReqProps = {
  title: string;
  basicInfo: string;
  detailInfo: string;
  content: string;
  reservationInfo: string;
  sort: number;
  type: number;
  orderSameDay: number;
  level: number;
  viewStartDate: string;
  viewEndDate: string;
  status: number;
  forSale: number;
  priceNet: number;
  priceDcPer: number;
  priceDc: number;
  price: number;
  optionType: number;
  optionInputType: number;
  optionInputStartDate: string;
  optionInputEndDate: string;
  attributes: GoodsAttributeListProps[];
  categories: CategoryReqProps[];
  locations: LocationReqProps[];
  images: GoodsListItemImageProps[];
  schedules: GoodsSchedulesListProps[];
  policies: GoodsPoliciesListProps[];
  optionInputs: optionInputsProps[];
  options: OptionProps[];
  requiredPartnerCancelConfirm: number;
};

export type OptionStockType = {
  optionId: string;
  stockCnt: number;
};
export type PatchOptionStockType = {
  itemCode: string;
  itemId: string;
  data: {
    options: OptionStockType[];
  };
};

export type PatchGoodsStatusParmaType = {
  itemCode: string;
  itemId: string;
  data: PathGoodsType;
};

export type PatchUpdateGoodsStatusParmaType = {
  itemCode: string;
  itemId: string;
  data: GoodsReqProps;
};

export type PathGoodsType = {
  level: number;
  forSale: number;
  autoConfirm: number;
  orderSameDay: number;
  viewStartDate: string;
  viewEndDate: string;
};
//상품 상세 response data
export type GoodsItemProps = {
  itemId: string;
  itemCode: string;
  status: number;
  title: string;
  basicInfo: string;
  content: string;
  reservationInfo: string;
  sort: number;
  type: number;
  optionType: number;
  orderSameDay: number;
  level: number;
  forSale: number;
  priceNet: number;
  priceDcPer: number;
  priceDc: number;
  price: number;
  locations: GoodsListItemLocationProps[];
  categories: GoodsListItemCategoryProps[];
  images: GoodsListItemImageProps[];
  viewStartDate: string;
  viewEndDate: string;
  requestDate: string;
  requestId: string;
  approvalDate: string;
  approvalId: string;
  deniedId: string;
  deniedReason: string;
  deniedDate: string;
  createdDate: string;
  attributes: GoodsAttributeListProps[];
  policies: GoodsPoliciesListProps[];
  schedules: GoodsSchedulesListProps[];
  optionInputs: optionInputsProps[];
  options: OptionProps[];
  createdId: string;
  modifiedId: string;
  modifiedDate: string;
  typeName: string;
  statusName: string;
  forSaleName: string;
  levelName: string;
};

//상품재고수정
export type GoodsOptionStockModifyType = {
  optionId: string;
  stockCnt: number;
};
export type GoodsLogItemType = {
  itemCode: string;
};

export type LodListType = {
  createdDate: string;
  forSale: number;
  forSaleName: string;
  itemCode: string;
  itemId: string;
  level: number;
  levelName: string;
  status: number;
  statusName: string;
  version: string;
  viewEndDate: string;
  viewStartDate: string;
};
export type GoodsLogItemReqType = {
  itemCode: string;
  itemId: string;
};
export type commerceProductDataType = {
  zzimed: boolean;
  itemCode: string;
  itemId: string | null;
  partner: commercePartnerType;
  zzimCnt: number;
  orderCnt: number;
  reviewCnt: number;
  reviewAvg: number;
  coupons?: any;
  relationItems?: any;
  reviews?: any;

  data: {
    partner: commercePartnerType;
    itemId: string;
    itemCode: string;
    siteOrigin?: string;
    status: 0 | 1 | 2 | 3 | 10 | number;
    statusName: string;
    forSale: 1 | 2 | 10 | number;
    forSaleName: string;
    level: 1 | 2 | 10 | number;
    levelName: string;
    viewStartDate: string;
    viewEndDDate: string;
    title: string;
    basicInfo?: string;
    detailInfo?: string;
    content?: string;
    reservationInfo?: string;
    type: 1 | 2 | 3 | number;
    typeName: string;
    optionType: 1 | 2 | number;
    optionTypeName: string;
    optionInputType: 0 | 1 | number;
    optionInputTypeName: string;
    autoConfirm: 0 | 1 | number;
    autoConfirmName: string;
    orderSameDay: 0 | 1 | number;
    orderSameDayName: string;
    orderCloseBefore: 0 | number;
    orderCloseBeforeName: string;
    taxType: 1 | 2 | 3 | number;
    taxTypeName: string;
    priceNet: number;
    priceDcPer: number;
    price: number;
    requestId: string;
    requestDate: string;
    approvalId: string;
    approvalDate: string;
    deniedId: string | null;
    deniedReason: string | null;
    deniedDate: string | null;
    attributes?: Array<attributeType>;
    categories?: Array<categoryDTO>;
    locations?: Array<locationsDTO>;
    images?: Array<imageDTO>;
    schedules?: Array<scheduleDTO>;
    policies?: Array<policiesDTO>;
    options?: Array<detailOptionType>;
    optionsGroup?: optionsGroupType;
    createDate: string;
    modifiedDate: string;
  };
  createDate: string;
  modifiedDate: string | null;
  optionGroups?: string | null;
};

export type attributeType = {
  code: number;
  codeName: string;
  sort: number;
  type: number;
  title: string;
};

export type detailOptionType = {
  optionId: string;
  sort: number;
  type: number;
  typeName: string;
  depth: number;
  useDateTime: string;
  firstKey?: string;
  firstValue?: string;
  secondKey?: string;
  secondValue?: string;
  thirdKey?: string;
  thirdValue?: string;
  fourthKey?: string;
  fourthValue?: string;
  stockCnt: number;
  taxType: number;
  taxTypeName: string;
  price: number;
};

export type optionsGroupType = {
  title: 'DATE' | string;
  childs?: Array<optionsGroupType>;
  depth?: number;
  option?: {
    optionId?: string;
    title?: string;
    price?: number;
    stockCnt?: number;
  };
};
export type imageDTO = {
  sort?: number;
  imagePath: string;
  thumbnailImagePath: string;
};

export type locationsDTO = {
  locationId: number;
  type: 0 | 1 | 2 | number;
  typeName: string;
  level: 1 | 2 | 10 | number;
  levelName: string;
  depth: number;
  sort: number;
  title: string;
  fullTitle: string;
  locations?: Array<locationsDTO>;
};

export type categoryDTO = {
  categoryId: number;
  title: string;
  sort: number;
  level: 1 | 2 | 10 | number;
  levelName: string;
  depth: number;
  fullTitle: string;
  categories?: Array<categoryDTO>;
};

export type scheduleDTO = {
  sort: number;
  startDay: string;
  startTime: string;
  durationTime: string | null;
  location: string | null;
  info: string | null;
  lat: string;
  lng: string;
  images: Array<imageDTO>;
};

export type policiesDTO = {
  title: string;
  type: number;
  ty0peName: string;
  sort: number;
  days: number;
  feePer: number;
};
// 파트너 타입
export type commercePartnerType = {
  partnerId: string;
  title: string;
  info: string | null;
  imagePath: string | null;
  thumbnailImagePath: string | null;
  shippingType: number;
  shippingTypeName: string;
  shippingFee: number;
  shippingMinAmount: number;
};

export type commercePreviewProductDataType = {
  itemCode: string;
  itemId: string | null;
  partner: commercePartnerType;
  coupons?: any;
  relationItems?: any;
  siteOrigin?: string;
  status: 0 | 1 | 2 | 3 | 10 | number;
  statusName: string;
  forSale: 1 | 2 | 10 | number;
  forSaleName: string;
  level: 1 | 2 | 10 | number;
  levelName: string;
  viewStartDate: string;
  viewEndDDate: string;
  title: string;
  basicInfo?: string;
  detailInfo?: string;
  content?: string;
  reservationInfo?: string;
  type: 1 | 2 | 3 | number;
  typeName: string;
  optionType: 1 | 2 | number;
  optionTypeName: string;
  optionInputType: 0 | 1 | number;
  optionInputTypeName: string;
  orderSameDay: 0 | 1 | number;
  orderSameDayName: string;
  priceNet: number;
  priceDcPer: number;
  price: number;
  requestId: string;
  requestDate: string;
  approvalId: string;
  approvalDate: string;
  deniedId: string | null;
  deniedReason: string | null;
  deniedDate: string | null;
  attributes: Array<attributeType>;
  categories: Array<categoryDTO>;
  locations: Array<locationsDTO>;
  images: Array<imageDTO>;
  schedules: Array<scheduleDTO>;
  policies: Array<policiesDTO>;
  options: Array<detailOptionType>;
  optionsGroup: optionsGroupType;
};
