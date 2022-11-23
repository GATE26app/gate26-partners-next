import { DataTableColumnType } from '@components/common/DataTable';

export type AirlineTicketColumnType =
  | 'id'
  | 'arrivals'
  | 'destination'
  | 'arrivalsAt'
  | 'destinationAt'
  | 'certifiedAt';
export const AIRLINE_TICKET_COLUMNS: DataTableColumnType<AirlineTicketColumnType>[] =
  [
    {
      key: 'arrivals',
      name: '출발지',
      width: '21.67%',
    },
    {
      key: 'destination',
      name: '도착지',
      width: '21.67%',
    },
    {
      key: 'arrivalsAt',
      name: '출발일자',
      width: '16.67%',
    },
    {
      key: 'destinationAt',
      name: '도착일자',
      width: '16.67%',
    },
    {
      key: 'certifiedAt',
      name: '인증일자',
      width: '16.67%',
    },
  ];
