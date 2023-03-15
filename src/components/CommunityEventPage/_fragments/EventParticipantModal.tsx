import { useEffect, useState } from 'react';

import * as excel from 'xlsx';

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
import useExcelDown from '@hooks/useExcelDown';

import Button from '@components/common/Button';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import FileUpload from '@components/common/ExcelUpload/ExcelUpload';
import IconButton from '@components/common/IconButton';
import TableTop from '@components/common/TableTop';

import {
  ParticipantColumnType,
  ParticipantEvent,
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
  const [excel, setExcel] = useState<string>('');

  useEffect(() => {
    setRequest({ ...request, eventId: targetId });
  }, [targetId]);

  useEffect(() => {
    if (!request.eventId) return;
    getParticipantList();
  }, [request]);

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'size') {
      newRequest.page = 0;
    }
    setRequest(newRequest);
  };

  const getParticipantList = async () => {
    console.log('request', request);
    const res = await eventApi.getEventParticipantList(request);
    const { data, count, success } = res;

    if (success) {
      setTotal(count);
      setUser(data.content);
    }
  };

  const participantEvent = new ParticipantEvent(
    handleChangeInput,
    handleChangeOpen,
  );

  const renderContent = () => {
    return (
      <div>
        <TableTop
          total={total}
          limit={request.size}
          search={{
            searchTypes: [
              { value: 1, label: '유저이름' },
              { value: 2, label: '성별' },
              { value: 3, label: '나이' },
              { value: 4, label: '이메일' },
            ],
            keyword: '',
            onChangeLimit: (value: number) => handleChangeInput('size', value),
            onChangeSearchType: (type: number) =>
              handleChangeInput('searchType', type),
            onChangeKeyword: (keyword: string) =>
              handleChangeInput('keyword', keyword),
            onClickSearch: () => console.log('검색'),
          }}
        />
        <DataTable
          variant={'gray'}
          columns={participantEvent.PARTICIPANT_COLUMNS}
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
  const excelDown = () => {
    useExcelDown(user, '이벤트 참여자');
  };

  async function handleChangeOpen(id: string, isWinner: string) {
    const response = await eventApi.putEventParicipantUpdateOpen(isWinner);
    if (response.success) {
      const newRows = [...user];
      newRows.map((row) => {
        if (row.id === id) {
          return { ...row, isWinner };
        }
        return row;
      });
      setUser(newRows);
    }
  }

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
            <Flex>
              <FileUpload
                fileValue={excel}
                onChange={(file) => handleChangeInput('xlsx', excel)}
              />
              <Flex ml="10px" />
              <IconButton
                type="download"
                size="sm"
                width="120px"
                text="내보내기"
                onClick={excelDown}
              />
            </Flex>
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
