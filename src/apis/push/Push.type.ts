import { Dayjs } from 'dayjs';

type PushDTOType = {
  content: {};
  pageable: {
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  size: number;
  numberOfElements: number;
};

export type PushListResponse = PushDTOType & {
  content: {
    noticeId: string;
    type: string;
    title: string;
    content: string;
    noticeDate: Dayjs;
    loungeId: string;
    loungeName: string;
    chatRoomId: string;
    chatRoomName: string;
    imagePath: string;
  }[];
};
export type PushParamGetType = {
  page?: number;
  size?: number;
  keyword: string;
  searchType: number;
};
export type PushDeleteResponse = 'T' | 'F';

// 푸시 등록
export type PushPostType = {
  noticeId?: string; // 수정일때만 사용
  type: string;
  title: string;
  chatRoom?: string;
  content: string;
  coverImg?: File;
  noticeDate: Dayjs;
  deleteFile?: string;
  deleteChatRoom?: string;
};

export type PushPostResponse = {
  tgId: string;
  title: string;
  content: string;
  createDate: Date;
  modifiedDate: Date;
  startDate: Date;
  expiredDate: Date;
};

// 푸시 - 라운지
export type PushLoungeGetType = {};
export type PushLoungeListResponse = {
  tgId: string;
  loungeName: string;
};

// 푸시 - 채팅방
export type PushChatroomGetType = {
  loungeId: string;
};
export type PushChatroomListResponse = {
  roomId: string;
  roomName: string;
};
