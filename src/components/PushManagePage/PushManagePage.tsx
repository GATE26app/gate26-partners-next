import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Dayjs } from 'dayjs';
import * as excel from 'xlsx';

import { Flex } from '@chakra-ui/react';

import { PushParamGetType } from '@apis/push/Push.type';
import pushApi from '@apis/push/PushApi';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { AlarmColumnType, LIST_COLUMNS } from './PushManagePage.data';
import PushDetailModal from './_fragments/PushDetailModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  detail: {
    targetId: string;
    fcmType: string;
    chatRoomId: string;
    loungeId: string;
    title: string;
    content: string;
    coverImg?: string;
    noticeDate: Dayjs;
  } | null;
}

function PushManagePage() {
  const [request, setRequest] = useState<PushParamGetType>({
    page: 0,
    size: 10,
    keyword: '',
    searchType: 1,
  });
  const [total, setTotal] = useState<number>(100);
  const [rows, setRows] = useState<DataTableRowType<AlarmColumnType>[]>([]);
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    detail: null,
  });

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'size') {
      newRequest.page = 0;
    }
    setRequest(newRequest);
  }

  const handleCreateRow = () =>
    setModal({ isOpen: true, type: 'create', detail: null });

  const handleEditRow = (row: DataTableRowType<AlarmColumnType>) => {
    if (!row.noticeId) {
      return;
    }
    setModal({
      isOpen: true,
      type: 'modify',
      detail: {
        targetId: row.noticeId as string,
        fcmType: row.type as string,
        loungeId: row.loungeId as string,
        chatRoomId: row.chatRoomId as string,
        noticeDate: row.noticeDate as Dayjs,
        coverImg: row.imagePath ? (row.imagePath as string) : undefined,
        title: row.title as string,
        content: row.content as string,
      },
    });
  };

  const handleCloseModal = () => setModal({ isOpen: false, detail: null });

  const handleDeleteRow = (row: DataTableRowType<AlarmColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '푸쉬 알림 관리',
        message: '푸쉬를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          pushApi.deletePush(row.noticeId as string).then((response) => {
            if (response.success) getPushList();
          });
        },
      }),
    );
    openCustomModal();
  };

  const getPushList = async () => {
    const response = await pushApi.getPushList(request);
    if (response.success) {
      const { data } = response;
      setTotal(data.totalElements);
      setRows(data.content);
    }
  };

  useEffect(() => {
    getPushList();
  }, [request]);

  const excelDown = () => {
    console.log('다운로드 클릭' + excel);
    const ws = excel?.utils?.json_to_sheet(rows);
    const wb = excel?.utils?.book_new();
    excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    excel?.writeFile(wb, '공지사항 목록.xlsx');
  };

  return (
    <>
      <Head>
        <title>푸쉬알림 관리</title>
      </Head>
      <Flex
        className="community-push-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['푸쉬알림 관리', '푸쉬알림 관리']} />
        <PageTitle
          title="푸쉬알림 관리"
          onClickDownload={excelDown}
          isDownload
        />

        <TableTop
          total={total}
          limit={request.size}
          search={{
            searchTypes: [
              { value: 1, label: '전체' },
              { value: 2, label: '제목' },
              { value: 3, label: '푸쉬내용' },
            ],
            searchType: request.searchType,
            keyword: request.keyword,
            onChangeLimit: (value: number) => handleChangeInput('size', value),
            onChangeSearchType: (type: number) =>
              handleChangeInput('searchType', type),
            onChangeKeyword: (keyword: string) =>
              handleChangeInput('keyword', keyword),
            onClickSearch: () => console.log('검색'),
          }}
          createButton={{
            title: '푸쉬 추가',
            width: '93px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={LIST_COLUMNS}
          rows={rows}
          onEdit={handleEditRow}
          onDelete={handleDeleteRow}
          isMenu
          paginationProps={{
            currentPage: request.page!,
            limit: request.size!,
            total: total,
            onPageNumberClicked: (page: number) =>
              handleChangeInput('page', page),
            onPreviousPageClicked: (page: number) =>
              handleChangeInput('page', page),
            onNextPageClicked: (page: number) =>
              handleChangeInput('page', page),
          }}
        />
      </Flex>
      <PushDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        detail={modal.detail}
        onClose={handleCloseModal}
        onComplete={() => {
          handleCloseModal();
          getPushList();
        }}
      />
    </>
  );
}

export default withAdminLayout(PushManagePage);
