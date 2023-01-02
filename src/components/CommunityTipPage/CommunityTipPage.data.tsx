import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export type TipColumnType =
  | 'id'
  | 'title'
  | 'home'
  | 'banner'
  | 'show'
  | 'category';

class CommunityTip {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }

  readonly TIP_COLUMNS: DataTableColumnType<TipColumnType>[] = [
    {
      key: 'title',
      name: '제목',
      width: '29.1%',
    },
    {
      key: 'home',
      name: '홈 이미지',
      width: '25.4%',
      render: (value: DataTableRowType<TipColumnType>) => (
        <RoundImage src={value.home as string} width={'264px'} height="100px" />
      ),
    },
    {
      key: 'banner',
      name: '배너 이미지',
      width: '15%',
      render: (value: DataTableRowType<TipColumnType>) => (
        <RoundImage
          src={value.banner as string}
          width={'98px'}
          height="100px"
        />
      ),
    },

    {
      key: 'category',
      name: '카테고리',
      width: '15%',
    },
    {
      key: 'show',
      name: '노출여부',
      width: '9.4%',
      render: (value: DataTableRowType<TipColumnType>) => (
        <CustomSelect
          width={'65px'}
          size="sm"
          items={[
            { value: 1, label: '노출' },
            { value: 0, label: '비활성' },
          ]}
          defaultValue={value.show}
          noBorder
          onChange={(value) =>
            this.onChange ? this.onChange('show', value as number) : undefined
          }
        />
      ),
    },
  ];
}

export { CommunityTip };
