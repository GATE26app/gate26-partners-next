import { DataTableColumnType } from '@components/common/DataTable';

export type ParticipantColumnType = 'id' | 'name' | 'gender' | 'age' | 'email';
export const PARTICIPANT_COLUMNS: DataTableColumnType<ParticipantColumnType>[] =
  [
    {
      key: 'name',
      name: '참가자 이름',
      width: '9.1%',
    },
    {
      key: 'gender',
      name: '성별',
      width: '20%',
    },
    {
      key: 'age',
      name: '나이',
      width: '5%',
    },

    {
      key: 'email',
      name: '메일',
      width: '7.5%',
    },
  ];
