import { DataTableColumnType } from '@components/common/DataTable';

export type AirlineTicketColumnType =
  | 'airlineTicketId'
  | 'departureAirportName'
  | 'arrivalAirportName'
  | 'departureKorDate'
  | 'arrivalKorDate'
  | 'createdDate';
export const AIRLINE_TICKET_COLUMNS: DataTableColumnType<AirlineTicketColumnType>[] =
  [
    {
      key: 'departureAirportName',
      name: '출발지',
      width: '21.67%',
    },
    {
      key: 'arrivalAirportName',
      name: '도착지',
      width: '21.67%',
    },
    {
      key: 'arrivalKorDate',
      name: '출발일자',
      width: '16.67%',
    },
    {
      key: 'departureKorDate',
      name: '도착일자',
      width: '16.67%',
    },
    {
      key: 'createdDate',
      name: '인증일자',
      width: '16.67%',
    },
  ];
