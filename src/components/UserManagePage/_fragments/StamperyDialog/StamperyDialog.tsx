import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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
import {
  SearchGetDTOType,
  StampHistoryCreateDTOType,
} from '@apis/membermanage/MemberManage.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import Button from '@components/common/Button';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import IconButton from '@components/common/IconButton';
import TableTop from '@components/common/TableTop';

import { STAMPERY_COLUMNS, StamperyColumnType } from './StamperyDialog.data';
import StamperyAddDialog from './_fragments/StamperyAddDialog';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface StamperyDialogProps extends Omit<ModalProps, 'children'> {
  targetId?: string;
}

interface SearchParam extends Omit<SearchGetDTOType, 'userId'> {}

const StamperyDialog = ({
  targetId,
  onClose,
  isOpen,
  ...props
}: StamperyDialogProps) => {
  const [request, setRequest] = useState<SearchParam>({
    page: 0,
    size: 10,
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<DataTableRowType<StamperyColumnType>[]>();
  const [total, setTotal] = useState<number>(0);

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  useEffect(() => {
    if (!isOpen) setRequest({} as SearchParam);

    if (isOpen && targetId) getStampHistory(request);
  }, [targetId, isOpen]);

  const handleAlert = (message?: string) => {
    if (!message) return;
    dispatch(
      customModalSliceAction.setMessage({
        title: '스탬프러리',
        message,
        type: 'alert',
      }),
    );
    openCustomModal();
  };

  const handleOpenDialog = (tgId: string) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '스탬프러리',
        message: '스탬프러리를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          handleHistoryDelete(tgId);
        },
      }),
    );
    openCustomModal();
  };

  const handleHistoryDelete = (tgId: string) => {
    memberManageApi
      .deleteStampHistory({ historyId: tgId })
      .then(({ success }) => {
        const newRequest = { ...request };
        if (success) {
          //삭제했을때 현재 페이지에 요소가 없고 첫번째 페이지가 아닐경우 페이지 -1
          if (rows && rows.length - 1 === 0 && newRequest.page)
            newRequest.page -= 1;

          getStampHistory(newRequest);
          handleAlert('삭제 성공');
        } else {
          handleAlert('삭제 실패');
        }
      })
      .catch(() => {
        handleAlert('삭제 실패');
      });
  };

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'size') newRequest.page = 0;

    setRequest(newRequest);
    if (key === 'size' || key === 'page') getStampHistory(newRequest);
  };

  const getStampHistory = (param: SearchParam) => {
    if (targetId) {
      memberManageApi
        .getStampHistory({
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

  const handleModalClose = () => {
    setIsAddDialogOpen(false);
    getStampHistory(request);
  };

  const handleCreate = async (stampId: string) => {
    if (targetId) {
      const param: StampHistoryCreateDTOType = {
        userId: targetId,
        stampId,
      };

      const response = await memberManageApi.postStampHistory(param);
      if (response.success) {
        getStampHistory(request);
        handleModalClose();
      }
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
              { value: 1, label: '전체' },
              { value: 2, label: '스탬프러리 유형' },
              { value: 3, label: '스탬프러리 명 ' },
            ],
            keyword: request.keyword,
            searchType: request.searchType,
            onChangeLimit: (value: number) => {
              handleChangeInput('size', value);
            },
            onChangeSearchType: (value: number) => {
              handleChangeInput('searchType', value);
            },
            onChangeKeyword: (value: string) => {
              handleChangeInput('keyword', value);
            },
            onClickSearch: () => getStampHistory(request),
          }}
          createButton={{
            title: '스탬프러리 추가',
            width: '113px',
            onClickCreate: () => {
              setIsAddDialogOpen(true);
            },
          }}
        />
        <DataTable
          maxH="260px"
          variant={'gray'}
          columns={STAMPERY_COLUMNS}
          rows={rows}
          isMenu
          onDelete={({ tgId }) => handleOpenDialog(tgId as string)}
          paginationProps={{
            currentPage: request.page || 0,
            limit: request.size || 10,
            total,
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
    <>
      <Modal
        size={'xl'}
        isCentered
        variant={'simple'}
        onClose={onClose}
        isOpen={isOpen}
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
      <StamperyAddDialog
        isOpen={isAddDialogOpen}
        onClose={handleModalClose}
        handleCreate={handleCreate}
      />
    </>
  );
};

export default StamperyDialog;
