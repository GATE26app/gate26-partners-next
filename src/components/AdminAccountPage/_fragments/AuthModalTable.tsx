import React from 'react';

import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import {
  DataTableColumnType,
  DataTableProps,
  DataTableRowType,
} from '@components/common/DataTable/DataTable.type';

import { Light } from '@theme/foundations/colors';

interface CustomDataTableProps
  extends Omit<DataTableProps<any>, 'paginationProps'> {}

const DataTable = <T extends string>({
  columns,
  rows,
  variant = 'simple',
}: CustomDataTableProps) => {
  const renderHead = () => {
    return (
      <Tr height="50px">
        {columns.map((col: DataTableColumnType<T>, index: number) => (
          <Th
            key={`${col.key}_${index}`}
            maxW={col.width ? col.width : undefined}
          >
            {col.name}
          </Th>
        ))}
      </Tr>
    );
  };

  const renderBody = () => {
    return rows?.map((row: DataTableRowType<T>, index: number) => {
      return (
        <Tr
          key={`${Object.keys(row)[index]}_${index}`}
          _hover={{ backgroundColor: 'gray.50' }}
          whiteSpace={'pre-wrap'}
          height="50px"
        >
          {columns.map((col: DataTableColumnType<T>, index: number) =>
            col.render ? (
              <Td
                key={`${col.key}_${index}`}
                maxW={col.width ? col.width : undefined}
              >
                <Flex justify="center">{col.render(row)}</Flex>
              </Td>
            ) : (
              <Td
                key={`${col.key}_${index}`}
                maxW={col.width ? col.width : undefined}
              >
                <span>{row[col.key as T]}</span>
              </Td>
            ),
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
      </Table>
    </TableContainer>
  );
};

export default DataTable;
