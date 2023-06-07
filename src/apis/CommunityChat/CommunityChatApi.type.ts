import { Dayjs } from 'dayjs';

type ChatDTOType = {
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

// 오픈채팅 조회
export type CommunityChatParamGetType = {
  searchType: number;
  keyword: string;
  page?: number;
  size?: number;
};

export type CommunityChatListResponse = ChatDTOType & {
  content: {
    roomId: string;
    roomName: string;
    thumbnail: string;
    loungeName: string;
    loungeId: string;
  }[];
};

// 오픈채팅 등록, 수정
export type CommunityChatPostType = {
  roomId?: string;
  roomName: string;
  loungeId?: string;
  img?: File | null;
  deleteFile?: string;
};

export type CommunityChatPostResponse = {
  createdDate: Dayjs;
  modifiedDate: Dayjs;
  roomId: string;
  roomName: string;
  coverImagePath: string;
  roomPwd: string;
  accessType: string;
  chatRoomUserList: string[];
  tagList: string[];
  boardList: string[];
  reactionList: string[];
  category: string;
  memberCount: number;
  maxMemberCount: number;
  descText: string;
  endDate: Dayjs;
  chatroomType: string;
};

// 오픈채팅 삭제
export type CommunityChatDeleteDTOType = 'T' | 'F';

export type ChatroomListInfo = {
  roomId: string;
  roomName: string;
}

// 채팅방 데이터 조회 파라미터
export type ChatMessageRequestType = {
  roomId: string;
  roomName?: string;
  startDate: string;
  endDate: string;
};

// 채팅방 데이터 응답
export type ChatMessageResponseType = {
  senderId: string;
  senderName: string;
  message: string;
  sentDate: string;
};

