import React from 'react';

import dayjs from 'dayjs';

import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { Light } from '@theme/foundations/colors';
import { formatDate } from '@utils/format';

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
  variant = 'simple',
  onEdit,
  onDelete,
}: DataTableProps<T>) => {
  const renderHead = () => {
    return (
      <Tr>
        {columns.map((col: DataTableColumnType<T>, index: number) => (
          <Th
            key={`${col.key}_${index}`}
            maxW={col.width ? col.width : undefined}
          >
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
              <Td
                key={`${col.key}_${index}`}
                textAlign={col.align}
                maxW={col.width ? col.width : undefined}
                w={col.width ? col.width : undefined}
              >
                <Flex
                  w={'100%'}
                  whiteSpace={'break-spaces'}
                  justifyContent={
                    col.align === 'left'
                      ? 'flex-start'
                      : col.align === 'right'
                        ? 'flex-end'
                        : 'center'
                  }
                >
                  {col.render(row)}
                </Flex>
              </Td>
            ) : (
              <Td
                key={`${col.key}_${index}`}
                textAlign={col.align}
                maxW={col.width ? col.width : undefined}
                w={col.width ? col.width : undefined}
              >
                <Flex
                  w={'100%'}
                  whiteSpace={'break-spaces'}
                  justifyContent={
                    col.align === 'left'
                      ? 'flex-start'
                      : col.align === 'right'
                        ? 'flex-end'
                        : 'center'
                  }
                >
                  <Text
                    fontSize="12px"
                    textStyle="sm"
                    fontFamily="body"
                    fontWeight="regular"
                    color="black"
                  >
                    {row[col.key as T] instanceof dayjs
                      ? formatDate(row[col.key as T] as dayjs.Dayjs)
                      : row[col.key as T]}
                  </Text>
                </Flex>
              </Td>
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
      <Table variant={variant} colorScheme={'gray'}>
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
