import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export type AirPortCol = 'id' | 'name' | 'code' | 'rounge' | 'answer';

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
      width: '15%',
    },
    {
      key: 'code',
      name: '코드',
      width: '21.6%',
    },
    {
      key: 'rounge',
      name: '라운지 위치',
      width: '31.6%',
    },

    {
      key: 'answer',
      name: '사용여부',
      width: '18.3%',
    },
  ];
}
export { AirportCode };
