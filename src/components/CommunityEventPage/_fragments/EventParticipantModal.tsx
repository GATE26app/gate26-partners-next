import { useEffect, useState } from 'react';

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
  PARTICIPANT_COLUMNS,
  ParticipantColumnType,
} from './EventParticipantModal.data';

const rows: DataTableRowType<ParticipantColumnType>[] = [
  {
    id: 1,
    name: '김이륙',
    gender: '남',
    age: 45,
    email: 'gate26@toktokhan.dev',
  },
  {
    id: 2,
    name: '박이륙',
    gender: '여',
    age: 21,
    email: 'gate26@toktokhan.dev',
  },
  {
    id: 3,
    name: '이이륙',
    gender: '여',
    age: 18,
    email: 'gate26@toktokhan.dev',
  },
];

interface EventParticipantModalProps extends Omit<ModalProps, 'children'> {
  targetId?: number;
}
const EventParticipantModal = ({
  targetId,
  onClose,
  ...props
}: EventParticipantModalProps) => {
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
            searchTypes: [{ value: 0, label: '전체' }],
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
          columns={PARTICIPANT_COLUMNS}
          rows={rows}
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
            <span>참가자 목록</span>
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
            type="square"
            text={'확인'}
            size={'sm'}
            width={'200px'}
            onClick={onClose}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventParticipantModal;
