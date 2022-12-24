import { DataTableColumnType } from '@components/common/DataTable';

export type StamperyColumnType = 'id' | 'type' | 'title' | 'savedAt';
export const STAMPERY_COLUMNS: DataTableColumnType<StamperyColumnType>[] = [
  {
    key: 'type',
    name: '스탬프러리 유형',
    width: '17.50%',
  },
  {
    key: 'title',
    name: '스탬프러리 명',
    width: '42.50%',
  },
  {
    key: 'savedAt',
    name: '적립일자',
    width: '33.33%',
  },
];
