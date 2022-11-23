import { Text } from '@chakra-ui/layout';

import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

export type UserManageColumnType =
  | 'id'
  | 'name'
  | 'email'
  | 'status'
  | 'withdrawalAt'
  | 'withdrawalStatus'
  | 'reportAccrue'
  | 'mileage'
  | 'airlineTicket'
  | 'stampery';

class UserManageColumns {
  onChange?: (key: string, value: string | number) => void;
  onClick: (row: DataTableRowType<UserManageColumnType>) => void;

  constructor(
    onClick: (row: DataTableRowType<UserManageColumnType>) => void,
    onChange: (key: string, value: string | number) => void,
  ) {
    this.onClick = onClick;
    this.onChange = onChange;
  }

  readonly LIST_COLUMNS: DataTableColumnType<UserManageColumnType>[] = [
    {
      key: 'name',
      name: '이름',
      width: '11.67%',
    },
    {
      key: 'email',
      name: '이메일',
      width: '19.17%',
    },
    {
      key: 'status',
      name: '회원상태',
      width: '10%',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <CustomSelect
          width={'65px'}
          size={'xs'}
          items={[
            { value: 1, label: '활성' },
            { value: 0, label: '비활성' },
          ]}
          defaultValue={Number(value.status)}
          noBorder
          onChange={(value) =>
            this.onChange ? this.onChange('status', value as number) : undefined
          }
        />
      ),
    },
    {
      key: 'withdrawalAt',
      name: '탈퇴일자',
      width: '12.50%',
    },
    {
      key: 'withdrawalStatus',
      name: '탈퇴상태',
      width: '10%',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <span>{value.withdrawalStatus ? '탈퇴' : '회원'}</span>
      ),
    },

    {
      key: 'reportAccrue',
      name: '신고누적',
      width: '8.33%',
    },
    {
      key: 'mileage',
      name: '보유 마일리지',
      width: '10%',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <Text
          cursor="pointer"
          textStyle="textActiveSm"
          onClick={() => this.onClick(value)}
        >
          {value.mileage}
        </Text>
      ),
    },
    {
      key: 'airlineTicket',
      name: '항공권 인증 내역',
      width: '8.33%',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <Text cursor="pointer" textStyle="textActiveSm">
          {value.airlineTicket}
        </Text>
      ),
    },
    {
      key: 'stampery',
      name: '스탬프러리',
      width: '8.33%',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <Text cursor="pointer" textStyle="textActiveSm">
          {value.stampery}
        </Text>
      ),
    },
  ];
}

export { UserManageColumns };
