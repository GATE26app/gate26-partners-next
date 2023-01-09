import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export type AirPortCol = 'name' | 'code' | 'loungeId' | 'useYn';

class AirportCode {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }
  readonly AIRPORT_CODE: DataTableColumnType<AirPortCol>[] = [
    {
      key: 'name',
      name: '공항명 (국문)',
      width: '56.6%',
    },
    {
      key: 'code',
      name: '코드',
      width: '11.6%',
    },
    {
      key: 'loungeName',
      name: '라운지 위치',
      width: '16.6%',
    },

    {
      key: 'useYn',
      name: '사용여부',
      width: '8.3%',
      render: (value: DataTableRowType<AirPortCol>) => {
        return value.useYn === 'false' ? '사용안함' : '사용중';
      },
    },
  ];
}
export { AirportCode };
