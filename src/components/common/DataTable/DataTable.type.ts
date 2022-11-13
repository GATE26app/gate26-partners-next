import { PaginationProps } from 'components/common/Pagination';

export type DataTableColumnType = {
  key: string;
  name: string;
  width?: string;
  render?: (value: DataTableRowType) => JSX.Element;
};
export type DataTableRowType = {
  [key: string]: any;
};

export interface DataTableProps {
  children?: string | JSX.Element;
  columns: DataTableColumnType[];
  rows?: DataTableRowType[];
  isMenu?: boolean;
  paginationProps: PaginationProps;
  onEdit?: (row: DataTableRowType) => void;
  onDelete?: (row: DataTableRowType) => void;
}
