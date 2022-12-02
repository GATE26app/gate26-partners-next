import CheckBox from '@components/common/CheckBox';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

export type MenuColumnType = 'id' | 'name' | 'status';

class MenuAuthColumns {
  onChange: (id: number, value: boolean) => void;

  constructor(onChange: (id: number, value: boolean) => void) {
    this.onChange = onChange;
  }

  readonly LIST_COLUMNS: DataTableColumnType<MenuColumnType>[] = [
    {
      key: 'name',
      name: '메뉴',
      width: '49.38%',
    },
    {
      key: 'status',
      name: '접근 권한',
      width: '45.68%',
      render: (value: DataTableRowType<MenuColumnType>) => {
        return (
          <CheckBox
            width="20px"
            height="20px"
            checked={value.status as boolean}
            onClick={() =>
              this.onChange(value.id as number, !value.status as boolean)
            }
          />
        );
      },
    },
  ];
}

export { MenuAuthColumns };
