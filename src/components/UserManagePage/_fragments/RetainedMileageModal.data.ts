import { DataTableColumnType } from '@components/common/DataTable';

export type MileageColumnType =
  | 'historyId'
  | 'action'
  | 'createdDate'
  | 'point';
export const MILEAGE_COLUMNS: DataTableColumnType<MileageColumnType>[] = [
  {
    key: 'action',
    name: '적립사유',
    width: '53.33%',
  },
  {
    key: 'createdDate',
    name: '적립일',
    width: '16.67%',
  },
  {
    key: 'point',
    name: '적립금액',
    width: '23.33%',
  },
];
