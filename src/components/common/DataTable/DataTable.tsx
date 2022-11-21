import React from 'react';

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { Light } from '@theme/foundations/colors';

import Pagination from '../Pagination';
import {
  DataTableColumnType,
  DataTableProps,
  DataTableRowType,
} from './DataTable.type';
import MenuSelect from './_fragments/MenuSelect';

const DataTable = <T extends string>({
  columns,
  rows,
  isMenu,
  paginationProps,
  onEdit,
  onDelete,
}: DataTableProps<T>) => {
  const renderHead = () => {
    return (
      <Tr>
        {columns.map((col: DataTableColumnType<T>, index: number) => (
          <Th key={`${col.key}_${index}`} w={col.width ? col.width : undefined}>
            {col.name}
          </Th>
        ))}
        {isMenu && <Th> </Th>}
      </Tr>
    );
  };

  const renderBody = () => {
    return rows?.map((row: DataTableRowType<T>, index: number) => {
      return (
        <Tr
          key={`${Object.keys(row)[index]}_${index}`}
          _hover={{ backgroundColor: 'gray.50' }}
        >
          {columns.map((col: DataTableColumnType<T>, index: number) =>
            col.render ? (
              <Td key={`${col.key}_${index}`}>{col.render(row)}</Td>
            ) : (
              <Td key={`${col.key}_${index}`}>{row[col.key as T]}</Td>
            ),
          )}
          {isMenu && (
            <Td key={`${Object.keys(row)[index]}_${index}_menu`}>
              <MenuSelect
                onClickEdit={onEdit && (() => onEdit(row))}
                onClickDelete={onDelete && (() => onDelete(row))}
              />
            </Td>
          )}
        </Tr>
      );
    });
  };
  return (
    <TableContainer
      style={{
        boxShadow: '0 0 0 1px ' + Light.gray[300],
        borderRadius: '5px',
      }}
    >
      <Table variant="simple" colorScheme={'gray'}>
        <Thead>{renderHead()}</Thead>
        <Tbody>{renderBody()}</Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={columns.length}>
              <Pagination
                currentPage={paginationProps.currentPage}
                limit={paginationProps.limit}
                total={paginationProps.total}
                onPageNumberClicked={paginationProps.onPageNumberClicked}
                onPreviousPageClicked={paginationProps.onPreviousPageClicked}
                onNextPageClicked={paginationProps.onNextPageClicked}
              />
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
