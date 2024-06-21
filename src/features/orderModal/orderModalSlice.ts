import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserStateType {
  isOpenModal: boolean;
  title?: string;
  message: string;
  okButtonName?: string;
  type: 'delivery' | 'cancel' | 'cancel-request';
  info?: {
    orderId: string;
    orderThumbnailImagePath: string;
    orderCategoryTitle: string;
    orderCnt: number;
    orderOptionTitle: string;
    discountAmount: number;
    orderAmount: number;
    orderTitle: string;
    shippingCompany: string;
    shippingInvoice: string;
    shippingMemo: string;
  };
  cbOk?: (data?: string) => void; // alert, confirm OK 버튼 콜백
  cbCancel?: () => void; // confirm Cancel 버튼 콜백
}

const initialState: UserStateType = {
  isOpenModal: false,
  title: 'Alert',
  message: '',
  type: 'delivery',
  okButtonName: '확인',
};

interface MessageType {
  title?: string;
  message: string;
  okButtonName?: string;
  type: 'delivery' | 'cancel' | 'cancel-request';
  info?: {
    orderId: string;
    orderThumbnailImagePath: string;
    orderCategoryTitle: string;
    orderCnt: number;
    orderOptionTitle: string;
    discountAmount: number;
    orderAmount: number;
    orderTitle: string;
    shippingCompany: string;
    shippingInvoice: string;
    shippingMemo: string;
  };
  cbOk?: () => void; // alert, confirm OK 버튼 콜백
  cbCancel?: () => void; // confirm Cancel 버튼 콜백
}
export const orderModalSlice = createSlice({
  name: 'ORDER_MODAL',
  initialState,
  reducers: {
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setMessage: (state, action: PayloadAction<MessageType>) => {
      const { title, message, type, okButtonName, info, cbOk, cbCancel } =
        action.payload;
      state.title = title;
      state.message = message;
      state.type = type;
      state.info = info;
      state.okButtonName = okButtonName;
      state.cbOk = cbOk;
      state.cbCancel = cbCancel;
    },
  },
});

export const {
  actions: orderModalSliceAction, //
  reducer: orderModalSliceReducer,
} = orderModalSlice;

export default orderModalSlice;
