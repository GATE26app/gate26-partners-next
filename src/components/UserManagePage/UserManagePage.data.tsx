import { Text } from '@chakra-ui/layout';

import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

import { crypto } from '@utils/crypto';

export type UserManageColumnType =
  | 'userId'
  | 'name'
  | 'emailAddress'
  | 'activeUser'
  | 'leaveDate'
  // | 'withdrawalStatus'
  | 'reportedCount'
  | 'totalMileage'
  | 'ticketAuthCount'
  | 'stampCount';

export type ModalType = 'totalMileage' | 'ticketAuthCount' | 'stampCount';

class UserManageColumns {
  onChange?: (key: string, value: string | number) => void;
  onClick: (
    row: DataTableRowType<UserManageColumnType>,
    type: ModalType,
  ) => void;

  constructor(
    onClick: (
      row: DataTableRowType<UserManageColumnType>,
      type: ModalType,
    ) => void,
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
      render: (value: DataTableRowType<UserManageColumnType>) => {
        return crypto.decrypt(value.name as string);
      },
    },
    {
      key: 'emailAddress',
      name: '이메일',
      width: '19.17%',
    },
    {
      key: 'activeUser',
      name: '회원상태',
      width: '10%',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <CustomSelect
          width={'65px'}
          size="sm"
          items={[
            { value: 'T', label: '활성' },
            { value: 'F', label: '비활성' },
          ]}
          defaultValue={String(value.activeUser)}
          noBorder
          onChange={(value) =>
            this.onChange ? this.onChange('status', value as number) : undefined
          }
        />
      ),
    },
    {
      key: 'leaveDate',
      name: '탈퇴일자',
      width: '12.50%',
    },
    {
      key: 'withdrawalStatus',
      name: '탈퇴상태',
      width: '10%',
      align: 'center',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <span>{value.leaveDate === undefined ? '회원' : '탈퇴'}</span>
      ),
    },

    {
      key: 'reportedCount',
      name: '신고누적',
      width: '8.33%',
    },
    {
      key: 'totalMileage',
      name: '보유 마일리지',
      width: '10%',
      align: 'center',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <Text
          cursor="pointer"
          textStyle="textActiveSm"
          onClick={() => this.onClick(value, 'totalMileage')}
        >
          {value.totalMileage}
        </Text>
      ),
    },
    {
      key: 'ticketAuthCount',
      name: '항공권 인증 내역',
      width: '8.33%',
      align: 'center',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <Text
          cursor="pointer"
          textStyle="textActiveSm"
          onClick={() => this.onClick(value, 'ticketAuthCount')}
        >
          {value.ticketAuthCount}
        </Text>
      ),
    },
    {
      key: 'stampCount',
      name: '스탬프러리',
      width: '8.33%',
      align: 'center',
      render: (value: DataTableRowType<UserManageColumnType>) => (
        <Text
          cursor="pointer"
          textStyle="textActiveSm"
          onClick={() => this.onClick(value, 'stampCount')}
        >
          {value.stampCount}
        </Text>
      ),
    },
  ];
}

export { UserManageColumns };
