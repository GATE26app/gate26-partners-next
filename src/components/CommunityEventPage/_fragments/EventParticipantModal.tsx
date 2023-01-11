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

import eventApi from '@apis/event/EventApi';

import Button from '@components/common/Button';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import IconButton from '@components/common/IconButton';
import TableTop from '@components/common/TableTop';

import {
  PARTICIPANT_COLUMNS,
  ParticipantColumnType,
} from './EventParticipantModal.data';

interface EventParticipantModalProps extends Omit<ModalProps, 'children'> {
  targetId: string;
}
const SEARCH_TYPE = [1, 2, 3, 4];

const EventParticipantModal = ({
  targetId,
  onClose,
  ...props
}: EventParticipantModalProps) => {
  const [request, setRequest] = useState({
    eventId: targetId,
    searchType: SEARCH_TYPE[0],
    keyword: '',
    page: 0,
    size: 10,
  });
  const [user, setUser] = useState<DataTableRowType<ParticipantColumnType>[]>(
    [],
  );
  const [total, setTotal] = useState<number>(100);

  useEffect(() => {
    getParticipantList();
  }, [request]);

  const handleChangeInput = (key: string, value: string | number) => {
    console.log(value);
    const newRequest = { ...request, [key]: value };
    if (key === 'size') {
      newRequest.page = 0;
    }
    console.log('변경: ', key, value);
    console.log(newRequest);
    setRequest(newRequest);
  };

  const getParticipantList = async () => {
    const res = await eventApi.getEventParticipantList(request);
    const { data, count, success } = res;

    if (success) {
      setTotal(count);
      setUser(data.content);
    }
  };

  const renderContent = () => {
    return (
      <div>
        <TableTop
          total={total}
          limit={request.size}
          search={{
            searchTypes: [
              { value: 0, label: '유저이름' },
              { value: 1, label: '성별' },
              { value: 2, label: '나이' },
              { value: 3, label: '이메일' },
            ],
            keyword: '',
            onChangeLimit: (value: number) => handleChangeInput('size', value),
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
          rows={user}
          maxH="270px"
          paginationProps={{
            currentPage: request.page,
            limit: request.size,
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
