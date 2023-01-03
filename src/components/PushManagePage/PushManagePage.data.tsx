import { DataTableColumnType } from '@components/common/DataTable';

export type AlarmColumnType =
  | 'noticeId'
  // | 'target'
  | 'type'
  | 'title'
  | 'content'
  | 'noticeDate';

export const LIST_COLUMNS: DataTableColumnType<AlarmColumnType>[] = [
  {
    key: 'target',
    name: '푸쉬 대상',
    width: '10.8%',
  },
  {
    key: 'type',
    name: '푸쉬유형',
    width: '14.1%',
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
