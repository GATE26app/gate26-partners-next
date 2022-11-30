import { Text } from '@chakra-ui/react';

import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

export type AdminMenuColumnType =
  | 'id'
  | 'title'
  | 'path'
  | 'useStatus'
  | 'createdAt';

class AdminMenuColumns {
  readonly LIST_COLUMNS: DataTableColumnType<AdminMenuColumnType>[] = [
    {
      key: 'title',
      name: '메뉴 제목',
      width: '19.58%',
    },
    {
      key: 'path',
      name: '메뉴 경로',
      width: '46.67%',
    },
    {
      key: 'useStatus',
      name: '사용여부',
      width: '19.58%',
      render: (value: DataTableRowType<AdminMenuColumnType>) => (
        <Text
          fontSize="12px"
          textStyle="sm"
          fontFamily="body"
          fontWeight="regular"
          color="black"
        >
          {value.useStatus ? '사용' : '-'}
        </Text>
      ),
    },
    {
      key: 'createdAt',
      name: '등록일',
      width: '16.67%',
    },
  ];
}

export { AdminMenuColumns };
