import { Text } from '@chakra-ui/react';

import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import SmallButton from '@components/common/SmallButton';

export type AdminAccountColumnType =
  | 'id'
  | 'userId'
  | 'name'
  | 'email'
  | 'createdAt'
  | 'useStatus'
  | 'authority';

export type ModalType = 'mileage' | 'airlineTicket' | 'stampery';

class AdminAccountColumns {
  onClick: (row: DataTableRowType<AdminAccountColumnType>) => void;

  constructor(
    onClick: (row: DataTableRowType<AdminAccountColumnType>) => void,
  ) {
    this.onClick = onClick;
  }

  readonly LIST_COLUMNS: DataTableColumnType<AdminAccountColumnType>[] = [
    {
      key: 'userId',
      name: 'ID',
      width: '18.33%',
    },
    {
      key: 'name',
      name: '이름',
      width: '12.50%',
    },
    {
      key: 'email',
      name: '이메일',
      width: '30%',
    },
    {
      key: 'createdAt',
      name: '등록일',
      width: '11.67%',
    },
    {
      key: 'useStatus',
      name: '사용여부',
      width: '11.67%',
      render: (value: DataTableRowType<AdminAccountColumnType>) => (
        <Text
          fontSize="12px"
          textStyle="sm"
          fontFamily="body"
          fontWeight="regular"
          color="black"
        >
          {value.useStatus==='T' ? '사용' : '-'}
        </Text>
      ),
    },
    {
      key: 'authority',
      name: '권한',
      width: '10%',
      render: (value: DataTableRowType<AdminAccountColumnType>) => (
        <SmallButton
          onClick={() => this.onClick(value)}
          color="normal"
          text="권한"
          width="31px"
          height="18px"
        />
      ),
    },
  ];
}

export { AdminAccountColumns };
