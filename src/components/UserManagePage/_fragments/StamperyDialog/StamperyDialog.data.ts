import { DataTableColumnType } from '@components/common/DataTable';

export type StamperyColumnType =
  | 'tgId'
  | 'stampType'
  | 'stampName'
  | 'createdDate';
export const STAMPERY_COLUMNS: DataTableColumnType<StamperyColumnType>[] = [
  {
    key: 'stampType',
    name: '스탬프러리 유형',
    width: '17.50%',
  },
  {
    key: 'stampName',
    name: '스탬프러리 명',
    width: '42.50%',
  },
  {
    key: 'createdDate',
    name: '적립일자',
    width: '33.33%',
  },
];
