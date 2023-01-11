import React, { useEffect } from 'react';

import dayjs from 'dayjs';

import {
  Box,
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

const getAlignStyle = ({ align }: { align?: string }) => {
  if (align === 'left') return 'flex-start';
  if (align === 'right') return 'flex-end';
  else return 'center';
};

const DataTable = <T extends string>({
  columns,
  rows,
  isMenu,
  paginationProps,
  variant = 'simple',
  onEdit,
  onDelete,
  onRefusal,
  onAtom,
  onRegister,
  maxH,
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
          whiteSpace={'pre-wrap'}
        >
          {columns.map((col: DataTableColumnType<T>, index: number) =>
            col.render ? (
              <Td
                key={`${col.key}_${index}`}
                textAlign={col.align}
                maxW={col.width ? col.width : undefined}
              >
                <Flex justifyContent={getAlignStyle({ align: col.align })}>
                  {col.render(row)}
                </Flex>
              </Td>
            ) : (
              <Td
                key={`${col.key}_${index}`}
                textAlign={col.align}
                maxW={col.width ? col.width : undefined}
                textColor={col.color ? String(col.color) : undefined}
              >
                <Text textStyle="textSm">
                  {row[col.key as T] instanceof dayjs
                    ? formatDate(row[col.key as T] as dayjs.Dayjs)
                    : row[col.key as T]}
                </Text>
              </Td>
            ),
          )}
          {isMenu && (
            <Td key={`${Object.keys(row)[index]}_${index}_menu`}>
              <MenuSelect
                state={row['state' as T]}
                onClickEdit={onEdit && (() => onEdit(row))}
                onClickDelete={onDelete && (() => onDelete(row))}
                onClickRegister={onRegister && (() => onRegister(row))}
                onClickRefusal={onRefusal && (() => onRefusal(row))}
                onClickAtom={onAtom && (() => onAtom(row))}
              />
            </Td>
          )}
        </Tr>
      );
    });
  };
  return (
    <Flex
      direction="column"
      width="100%"
      border="1px solid"
      borderColor={Light.gray[300]}
      borderRadius="5px"
    >
      <Box maxH={maxH} overflowY="auto">
        <TableContainer
          width="100%"
          height="fit-content"
          style={{
            boxShadow: '0 0 0 1px ' + Light.gray[300],
            borderRadius: '5px',
          }}
        >
          <Table variant={variant} colorScheme={'gray'}>
            <Thead>{renderHead()}</Thead>
            <Tbody>{renderBody()}</Tbody>
            {/* {paginationProps && (
          <Tfoot>
            <Tr> */}
            {/* <Th colSpan={columns.length + Number(isMenu || false)}> */}

            {/* </Th> */}
            {/* </Tr>
          </Tfoot> */}
            {/* )} */}
          </Table>
        </TableContainer>
      </Box>
      {paginationProps && (
        <Flex justifyContent="center" alignItems="center">
          <Pagination
            currentPage={paginationProps.currentPage}
            limit={paginationProps.limit}
            total={paginationProps.total}
            onPageNumberClicked={paginationProps.onPageNumberClicked}
            onPreviousPageClicked={paginationProps.onPreviousPageClicked}
            onNextPageClicked={paginationProps.onNextPageClicked}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default DataTable;
