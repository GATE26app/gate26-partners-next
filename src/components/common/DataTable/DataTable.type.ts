import dayjs from 'dayjs';

import { TableProps } from '@chakra-ui/react';

import { PaginationProps } from 'components/common/Pagination';

export type DataTableColumnType<T extends string> = {
  key: string;
  name: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: DataTableRowType<T>) => JSX.Element | string;
  color?: (value: DataTableRowType<T>) => string;
};
export type DataTableRowType<T extends string> = {
  [key in T]: string | number | boolean | dayjs.Dayjs;
};

export interface DataTableProps<T extends string> extends TableProps {
  children?: string | JSX.Element;
  columns: DataTableColumnType<T>[];
  rows?: DataTableRowType<T>[];
  isMenu?: boolean;
  state?: number;
  paginationProps: PaginationProps;
  onEdit?: (row: DataTableRowType<T>) => void;
  onDelete?: (row: DataTableRowType<T>) => void;
  onRefusal?: (row: DataTableRowType<T>) => void;
  onAtom?: (row: DataTableRowType<T>) => void;
  onRegister?: (row: DataTableRowType<T>) => void;
}
