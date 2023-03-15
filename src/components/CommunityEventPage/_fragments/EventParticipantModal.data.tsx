import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

import { crypto } from '@utils/crypto';

export type ParticipantColumnType =
  | 'id'
  | 'name'
  | 'nickName'
  | 'gender'
  | 'birthDate'
  | 'phone'
  | 'emailAddress'
  | 'prize'
  | 'isWinner';

class ParticipantEvent {
  onClick?: (key: string, value: string | number) => void;
  onChange?: (id: string, isWinner: string) => void;

  constructor(
    onClick: (key: string, value: string | number) => void,
    event: (id: string, isWinner: string) => void,
  ) {
    if (event) {
      this.onChange = event;
    }
    this.onClick = onClick;
  }
  readonly PARTICIPANT_COLUMNS: DataTableColumnType<ParticipantColumnType>[] = [
    {
      key: 'name',
      name: '이름',
      width: '9.1%',
      render: (value: DataTableRowType<ParticipantColumnType>) => {
        return crypto.decrypt(value.name as string);
      },
    },
    {
      key: 'nickName',
      name: '닉네임',
      width: '9.1%',
    },

    {
      key: 'gender',
      name: '성별',
      width: '20%',
    },
    {
      key: 'birthDate',
      name: '나이',
      width: '5%',
      render: (value: DataTableRowType<ParticipantColumnType>) => {
        return crypto.decrypt(value.birthDate as string);
      },
    },
    {
      key: 'phone',
      name: '연락처',
      width: '7.5%',
      render: (value: DataTableRowType<ParticipantColumnType>) => {
        return crypto.decrypt(value.phone as string);
      },
    },
    {
      key: 'emailAddress',
      name: '이메일',
      width: '7.5%',
    },

    {
      key: 'prize',
      name: '경품',
      width: '7.5%',
    },
    {
      key: 'isWinner',
      name: '당첨여부',
      width: '7.5%',
      render: (value: DataTableRowType<ParticipantColumnType>) => (
        <CustomSelect
          width={'65px'}
          size="sm"
          items={[
            { value: 'true', label: '당첨' },
            { value: 'false', label: '미당첨' },
          ]}
          defaultValue={value.isWinner === true ? 'true' : 'false'}
          noBorder
          onChange={(isWinner) =>
            this.onChange
              ? this.onChange(value.id as string, isWinner as string)
              : undefined
          }
        />
      ),
    },
  ];
}

export { ParticipantEvent };
