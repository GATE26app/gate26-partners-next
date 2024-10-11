export type StatusType = {
  paymentCnt: number;
  reservationCnt: number;
  dateTimeOfUseCnt: number;
  completeCnt: number;
  cancelCnt: number;
};

export type DateListType = {
  date: string;
  status: StatusType;
};

export type DataType = {
  status: StatusType;
  dates: DateListType[];
};

export type CalendarListDtoType = {
  code?: string;
  count?: number;
  data?: DataType;
  success: boolean;
  message?: string;
};

export type CalendarParamsType = {
  periodStartDate: string;
  periodEndDate: string;
};
