import { Text } from '@chakra-ui/react';

import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

export type AppVersionPageColumnType =
  | 'id'
  | 'deviceType'
  | 'majorVersion'
  | 'minorVersion'
  | 'patchVersion'
  | 'descText'
  | 'versionStatus'
  | 'modifiedDate';

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
      key: 'id',
      name: 'id',
      width: '0%',
    },
    {
      key: 'deviceType',
      name: 'OS',
      width: '6.67%',
    },
    {
      key: 'majorVersion',
      name: 'Major Version',
      width: '10%',
    },
    {
      key: 'minorVersion',
      name: 'Minor Version',
      width: '10%',
    },
    {
      key: 'patchVersion',
      name: 'Patch Version',
      width: '10%',
    },
    {
      key: 'versionStatus',
      name: '업데이트 내용 ',
      width: '38.33%',
    },
    {
      key: 'releaseStatus',
      name: '',
      width: '8.33%',
    },
    {
      key: 'modifiedDate',
      name: '최종수정일',
      width: '10%',
    },
  ];
}

export { AppVersionPageColumns };
