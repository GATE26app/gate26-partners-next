import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

import Button from '@components/common/Button';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import IconButton from '@components/common/IconButton';
import TableTop from '@components/common/TableTop';

import {
  MILEAGE_COLUMNS,
  MileageColumnType,
} from './RetainedMileageModal.data';

const rows: DataTableRowType<MileageColumnType>[] = [
  {
    id: 1,
    reason: '김이륙',
    createdAt: dayjs('2022-10-20 09:00'),
    amount: 432411,
  },
  {
    id: 2,
    reason: '김이륙',
    createdAt: dayjs('2022-10-20 09:00'),
    amount: 432411,
  },
  {
    id: 3,
    reason: '김이륙',
    createdAt: dayjs('2022-10-20 09:00'),
    amount: 432411,
  },
];

interface RetainedMileageModalProps extends Omit<ModalProps, 'children'> {
  targetId?: number;
}
const RetainedMileageModal = ({
  targetId,
  onClose,
  ...props
}: RetainedMileageModalProps) => {
  const [request, setRequest] = useState({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    console.log('변경: ', key, value);
    setRequest(newRequest);
  };

  const renderContent = () => {
    return (
      <div>
        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '적립사유' },
            ],
            keyword: '',
            onChangeLimit: (value: number) => handleChangeInput('limit', value),
            onChangeSearchType: (type: number) => {
              console.log('타입');
            },
            onChangeKeyword: (keyword: string) => {
              console.log('키워드');
            },
            onClickSearch: () => console.log('검색'),
          }}
        />
        <DataTable
          variant={'gray'}
          columns={MILEAGE_COLUMNS}
          rows={rows}
          isMenu
          paginationProps={{
            currentPage: request.page,
            limit: request.limit,
            total: total,
            onPageNumberClicked: (page: number) =>
              handleChangeInput('page', page),
            onPreviousPageClicked: (page: number) =>
              handleChangeInput('page', page),
            onNextPageClicked: (page: number) =>
              handleChangeInput('page', page),
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    console.log('선택한 row :', targetId);
  }, [targetId]);

  return (
    <Modal
      size={'xl'}
      isCentered
      variant={'simple'}
      onClose={onClose}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent={'space-between'}>
            <span>보유 마일리지 : 432</span>
            <IconButton
              type="download"
              size="sm"
              width="120px"
              text="내보내기"
              onClick={() => console.log('내보내기')}
            />
          </Flex>
        </ModalHeader>
        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <Button
            type="square-grayscale"
            text={'취소'}
            size={'sm'}
            width={'120px'}
            onClick={onClose}
          />
          <Button
            type="square"
            text={'확인'}
            size={'sm'}
            width={'120px'}
            onClick={onClose}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RetainedMileageModal;
