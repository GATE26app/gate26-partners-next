import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

export type AlarmColumnType =
  | 'noticeId'
  | 'type'
  | 'title'
  | 'content'
  | 'noticeDate'
  | 'chatRoomId'
  | 'chatRoomName'
  | 'loungeId'
  | 'loungeName'
  | 'imagePath';

export const LIST_COLUMNS: DataTableColumnType<AlarmColumnType>[] = [
  {
    key: 'chatRoom',
    name: '푸쉬 대상',
    width: '10.8%',
    render: (value: DataTableRowType<AlarmColumnType>) => (
      <span>{value.chatRoomId ? value.chatRoomName : '전체'}</span>
    ),
  },
  {
    key: 'title',
    name: '제목',
    width: '25%',
  },
  {
    key: 'content',
    name: '푸쉬내용',
    width: '34.1%',
  },
  {
    key: 'noticeDate',
    name: '예약발송',
    width: '10%',
  },
];
