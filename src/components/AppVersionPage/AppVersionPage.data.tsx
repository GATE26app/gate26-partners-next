import { Text } from '@chakra-ui/react';

import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

export type AppVersionPageColumnType =
  | 'id'
  | 'os'
  | 'majorVer'
  | 'minorVer'
  | 'patchVer'
  | 'releaseContent'
  | 'releaseStatus'
  | 'modifiedAt';

class AppVersionPageColumns {
  onChange?: (key: string, value: string | number) => void;
  onClick: (row: DataTableRowType<AppVersionPageColumnType>) => void;

  constructor(
    onClick: (row: DataTableRowType<AppVersionPageColumnType>) => void,
    onChange: (key: string, value: string | number) => void,
  ) {
    this.onClick = onClick;
    this.onChange = onChange;
  }

  readonly LIST_COLUMNS: DataTableColumnType<AppVersionPageColumnType>[] = [
    {
      key: 'os',
      name: 'OS',
      width: '6.67%',
    },
    {
      key: 'majorVer',
      name: 'Major Version',
      width: '10%',
    },
    {
      key: 'minorVer',
      name: 'Minor Version',
      width: '10%',
    },
    {
      key: 'patchVer',
      name: 'Patch Version',
      width: '10%',
    },
    {
      key: 'releaseContent',
      name: '업데이트 내용 ',
      width: '38.33%',
    },
    {
      key: 'releaseStatus',
      name: '릴리즈 상태',
      width: '8.33%',
    },
    {
      key: 'modifiedAt',
      name: '최종수정일',
      width: '10%',
    },
  ];
}

export { AppVersionPageColumns };
