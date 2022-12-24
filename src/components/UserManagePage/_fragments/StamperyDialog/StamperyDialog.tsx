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

import { STAMPERY_COLUMNS, StamperyColumnType } from './StamperyDialog.data';
import StamperyAddDialog from './_fragments/StamperyAddDialog';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

const rows: DataTableRowType<StamperyColumnType>[] = [
  {
    id: 1,
    type: '챌린지',
    title: '이륙 뉴비',
    savedAt: dayjs('2022-10-20 09:00'),
  },
  {
    id: 2,
    type: '챌린지',
    title: '이륙 뉴비',
    savedAt: dayjs('2022-10-20 09:00'),
  },
  {
    id: 3,
    type: '챌린지',
    title: '이륙 뉴비',
    savedAt: dayjs('2022-10-20 09:00'),
  },
];

interface StamperyDialogProps extends Omit<ModalProps, 'children'> {
  targetId?: number;
}
const StamperyDialog = ({
  targetId,
  onClose,
  ...props
}: StamperyDialogProps) => {
  const [request, setRequest] = useState({
    page: 1,
    limit: 10,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();
  const [total, setTotal] = useState<number>(100);
  const handleOpenDialog = () => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '스탬프러리',
        message: '스탬프러리를 삭제 하시겠습니까?',
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

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const renderContent = () => {
    return (
      <div>
        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '스탬프러리 유형' },
              { value: 2, label: '스탬프러리 명 ' },
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
          createButton={{
            title: '스탬프러리 추가',
            width: '113px',
            onClickCreate: () => {
              setIsOpen(true);
            },
          }}
        />
        <DataTable
          variant={'gray'}
          columns={STAMPERY_COLUMNS}
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
    <>
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
              <span>스탬프러리</span>
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
      <StamperyAddDialog isOpen={isOpen} onClose={handleModalClose} />
    </>
  );
};

export default StamperyDialog;
