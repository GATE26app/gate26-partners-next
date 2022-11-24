import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import Button from '@components/common/Button';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import IconButton from '@components/common/IconButton';
import TableTop from '@components/common/TableTop';

import {
  AIRLINE_TICKET_COLUMNS,
  AirlineTicketColumnType,
} from './AirlineTicketModal.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

const rows: DataTableRowType<AirlineTicketColumnType>[] = [
  {
    id: 1,
    arrivals: '김포',
    destination: '베트남',
    arrivalsAt: dayjs('2022-10-20 09:00'),
    destinationAt: dayjs('2022-10-20 09:00'),
    certifiedAt: dayjs('2022-10-20 09:00'),
  },
  {
    id: 2,
    arrivals: '김포',
    destination: '베트남',
    arrivalsAt: dayjs('2022-10-20 09:00'),
    destinationAt: dayjs('2022-10-20 09:00'),
    certifiedAt: dayjs('2022-10-20 09:00'),
  },
  {
    id: 3,
    arrivals: '김포',
    destination: '베트남',
    arrivalsAt: dayjs('2022-10-20 09:00'),
    destinationAt: dayjs('2022-10-20 09:00'),
    certifiedAt: dayjs('2022-10-20 09:00'),
  },
];

interface AirlineTicketModalProps extends Omit<ModalProps, 'children'> {
  targetId?: number;
}
const AirlineTicketModal = ({
  targetId,
  onClose,
  ...props
}: AirlineTicketModalProps) => {
  const [request, setRequest] = useState({
    page: 1,
    limit: 10,
  });

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const [total, setTotal] = useState<number>(100);
  const handleOpenDialog = () => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '보유마일리지',
        message: '보유 마일리지 내역을 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          console.log('asdasdasdsdasdas');
        },
      }),
    );
    openCustomModal();
  };
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
              { value: 1, label: '출발지' },
              { value: 2, label: '도착지' },
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
          columns={AIRLINE_TICKET_COLUMNS}
          rows={rows}
          isMenu
          onDelete={handleOpenDialog}
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
            <span>항공권 인증 내역</span>
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

export default AirlineTicketModal;
