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

import memberManageApi from '@apis/membermanage/MemberManage';
import { SearchGetDTOType } from '@apis/membermanage/MemberManage.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import Button from '@components/common/Button';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import IconButton from '@components/common/IconButton';
import TableTop from '@components/common/TableTop';

import {
  MILEAGE_COLUMNS,
  MileageColumnType,
} from './RetainedMileageModal.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface SearchParam extends Omit<SearchGetDTOType, 'userId'> {}

interface RetainedMileageModalProps extends Omit<ModalProps, 'children'> {
  targetId?: string;
  totalMileage: number;
}
const RetainedMileageModal = ({
  targetId,
  onClose,
  isOpen,
  totalMileage,
  ...props
}: RetainedMileageModalProps) => {
  const [request, setRequest] = useState<SearchParam>({
    page: 1,
    size: 10,
    searchType: 1,
  });
  const [rows, setRows] = useState<DataTableRowType<MileageColumnType>[]>([]);
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const [total, setTotal] = useState<number>(100);

  useEffect(() => {
    if (!isOpen) {
      setRequest({} as SearchParam);
      setRows([]);
    }

    if (isOpen && targetId) getMileageHistory(request);
  }, [targetId, isOpen]);

  const handleOpenDialog = (historyId: string) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '보유마일리지',
        message: '보유 마일리지 내역을 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          handleHistoryDelete(historyId);
        },
      }),
    );
    openCustomModal();
  };

  const handleHistoryDelete = (historyId: string) => {
    memberManageApi
      .deleteMileageHistory({ historyId })
      .then(({ success }) => {
        const newRequest = { ...request };
        if (success) {
          //삭제했을때 현재 페이지에 요소가 없고 첫번째 페이지가 아닐경우 페이지 -1
          if (rows && rows.length - 1 === 0 && newRequest.page)
            newRequest.page -= 1;

          getMileageHistory(newRequest);
          alert('삭제 성공');
        } else {
          alert('삭제 실패');
        }
      })
      .catch(() => {
        alert('삭제 실패');
      });
  };

  const getMileageHistory = (param: SearchParam) => {
    if (targetId) {
      memberManageApi
        .getMileageHistory({
          userId: targetId,
          ...param,
        })
        .then(({ data, success }) => {
          if (data && success) {
            setRows(data.content);
            setTotal(data.totalElements);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') newRequest.page = 1;

    setRequest(newRequest);
    if (key === 'limit' || key === 'page') getMileageHistory(newRequest);
  };

  const renderContent = () => {
    return (
      <div>
        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 1, label: '전체' },
              { value: 2, label: '적립사유' },
            ],
            keyword: request.keyword,
            onChangeLimit: (value: number) => {
              handleChangeInput('limit', value);
            },
            onChangeSearchType: (value: number) => {
              handleChangeInput('searchType', value);
            },
            onChangeKeyword: (value: string) => {
              handleChangeInput('keyword', value);
            },
            onClickSearch: () => getMileageHistory(request),
          }}
        />
        <DataTable
          variant={'gray'}
          columns={MILEAGE_COLUMNS}
          rows={rows}
          isMenu
          onDelete={({ historyId }) => handleOpenDialog(historyId as string)}
          paginationProps={{
            currentPage: request.page || 0,
            limit: request.size || 10,
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

  return (
    <Modal
      size={'xl'}
      isCentered
      variant={'simple'}
      onClose={onClose}
      isOpen={isOpen}
      // styleConfig={{conta}}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent={'space-between'}>
            <span>보유 마일리지 : {totalMileage}</span>
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
