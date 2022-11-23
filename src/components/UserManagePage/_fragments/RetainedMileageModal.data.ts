import { DataTableColumnType } from '@components/common/DataTable';

export type MileageColumnType = 'id' | 'reason' | 'createdAt' | 'amount';
export const MILEAGE_COLUMNS: DataTableColumnType<MileageColumnType>[] = [
  {
    key: 'reason',
    name: '적립사유',
    width: '53.33%',
  },
  {
    key: 'createdAt',
    name: '적립일',
    width: '16.67%',
  },
  {
    key: 'amount',
    name: '적립금액',
    width: '23.33%',
  },
];
