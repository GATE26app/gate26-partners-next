import { DataTableColumnType } from '@components/common/DataTable';

export type ParticipantColumnType =
  | 'id'
  | 'name'
  | 'nickName'
  | 'gender'
  | 'birthDate'
  | 'emailAddress'
  | 'prize'
  | 'isWinner';
export const PARTICIPANT_COLUMNS: DataTableColumnType<ParticipantColumnType>[] =
  [
    {
      key: 'name',
      name: '이름',
      width: '9.1%',
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
    },
  ];
