import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export type StampCol = 'id' | 'type' | 'title' | 'info' | 'image' | 'answer';

class Stamp {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }
  readonly STAMP_COLUMNS: DataTableColumnType<StampCol>[] = [
    {
      key: 'type',
      name: '스탬프러리 유형',
      width: '15%',
    },
    {
      key: 'title',
      name: '스탬프러리명',
      width: '21.6%',
    },
    {
      key: 'info',
      name: '스탬프러리 설명',
      width: '31.6%',
    },

    {
      key: 'image',
      name: '이미지',
      width: '18.3%',
      render: (value: DataTableRowType<StampCol>) => (
        <RoundImage src={value.image as string} width={'90px'} height="90px" />
      ),
    },
    {
      key: 'answer',
      name: '사용여부',
      width: '6.6%',
    },
  ];
}
export { Stamp };
