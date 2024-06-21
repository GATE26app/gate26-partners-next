//알림리스트 params
export type AlarmListParamsType = {
  pageNo: number;
  pageSize: number;
};
//주문내역 request type
export type AlarmListDtoType = {
  code: string;
  count: number;
  data: {
    count: number;
    totalCount: number;
    pageCount: number;
    pageNo: number;
    pageSize: number;
    alarms: Array<AlarmListDataType>;
  };
  success: boolean;
};

export type AlarmListDataType = {
  alarmId: number;
  title: string;
  content: string;
  orderId: string;
  itemCode: string;
  target: string;
  level: number;
  levelName: string;
  type: number;
  typeName: string;
  createdDate: string;
};
