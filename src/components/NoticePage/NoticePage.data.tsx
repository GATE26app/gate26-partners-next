import { DataTableColumnType } from '@components/common/DataTable';

export type NoticeColumnType =
  | 'noticeId'
  | 'title'
  | 'content'
  | 'startDate'
  | 'expiredDate';

export const LIST_COLUMNS: DataTableColumnType<NoticeColumnType>[] = [
  {
    key: 'title',
    name: '제목',
    width: '30%',
  },
  {
    key: 'content',
    name: '내용',
    width: '44.1%',
  },
  {
    key: 'startDate',
    name: '시작일자',
    width: '10%',
  },
  {
    key: 'expiredDate',
    name: '종료일자',
    width: '10%',
  },
];
