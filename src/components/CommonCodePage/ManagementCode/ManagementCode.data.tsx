import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export type MenageCol = 'id' | 'code' | 'codeValue' | 'info';

class ManageCode {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }
  readonly MANAGE_COLUMNS: DataTableColumnType<MenageCol>[] = [
    {
      key: 'code',
      name: '코드',
      width: '15%',
    },
    {
      key: 'codeValue',
      name: '코드값',
      width: '21.6%',
    },
    {
      key: 'info',
      name: '설명',
      width: '31.6%',
    },
  ];
}
export { ManageCode };
