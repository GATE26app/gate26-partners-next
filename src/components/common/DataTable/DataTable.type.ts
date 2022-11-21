import dayjs from 'dayjs';

import { PaginationProps } from 'components/common/Pagination';

export type DataTableColumnType<T extends string> = {
  key: string;
  name: string;
  width?: string;
  render?: (value: DataTableRowType<T>) => JSX.Element;
};
export type DataTableRowType<T extends string> = {
  [key in T]: string | number | boolean | dayjs.Dayjs;
};

export interface DataTableProps<T extends string> {
  children?: string | JSX.Element;
  columns: DataTableColumnType<T>[];
  rows?: DataTableRowType<T>[];
  isMenu?: boolean;
  paginationProps: PaginationProps;
  onEdit?: (row: DataTableRowType<T>) => void;
  onDelete?: (row: DataTableRowType<T>) => void;
}
