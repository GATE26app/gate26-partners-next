import { Text } from '@chakra-ui/react';

import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export type TiketCol =
  | 'id'
  | 'ocr'
  | 'airLineName'
  | 'flightName'
  | 'start'
  | 'end'
  | 'startDt'
  | 'endDt'
  | 'state';

class Tiket {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }

  readonly TIP_COLUMNS: DataTableColumnType<TiketCol>[] = [
    {
      key: 'ocr',
      name: 'OCR',
      width: '8.3%',
      render: (value: DataTableRowType<TiketCol>) => (
        <RoundImage
          src={value.airLineName as string}
          width={'67px'}
          height="80px"
        />
      ),
    },
    {
      key: 'airLineName',
      name: '항공사명',
      width: '16.6%',
    },
    {
      key: 'flightName',
      name: '항공편명',
      width: '13.3%',
    },

    {
      key: 'start',
      name: '출발공항',
      width: '10.8%',
    },
    {
      key: 'end',
      name: '도착공항',
      width: '10.8%',
    },
    {
      key: 'startDt',
      name: '출발일자',
      width: '13.3%',
    },
    {
      key: 'endDt',
      name: '도착일자',
      width: '13.3%',
    },
    {
      key: 'state',
      name: '상태',
      width: '6.6%',
      render: (value: DataTableRowType<TiketCol>) => (
        <Text
          color={
            value.state === 0
              ? 'success.500'
              : value.state === 1
              ? 'gray.500'
              : 'warning.500'
          }
        >
          {value.state === 0 ? '등록' : value.state === 1 ? '거절' : '대기'}
        </Text>
      ),
    },
  ];
}

export { Tiket };
