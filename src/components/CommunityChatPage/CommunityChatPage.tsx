import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as excel from 'xlsx';

import { Flex } from '@chakra-ui/react';

import communityChatApi from '@apis/CommunityChat/CommunityChatApi';
import { CommunityChatParamGetType } from '@apis/CommunityChat/CommunityChatApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { CHAT_COLUMNS, ChatColumnType } from './CommunityChatPage.data';
import ChatDetailModal from './_fragments/ChatDetailModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  detail: {
    targetId: string;
    roomName: string;
    loungeId: string;
    img: string;
  } | null;
}

function CommunityChatPage() {
  const [request, setRequest] = useState<CommunityChatParamGetType>({
    searchType: 0,
    keyword: '',
    page: 0,
    size: 10,
  });
  const [total, setTotal] = useState<number>(100);
  const [rows, setRows] = useState<DataTableRowType<ChatColumnType>[]>([]);
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    detail: null,
  });

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'size') {
      newRequest.page = 0;
    }
    setRequest(newRequest);
  };

  const handleCreateRow = () =>
    setModal({ isOpen: true, type: 'create', detail: null });

  const handleEditRow = (row: DataTableRowType<ChatColumnType>) => {
    if (!row.roomId) {
      return;
    }
    setModal({
      isOpen: true,
      type: 'modify',
      detail: {
        targetId: row.roomId as string,
        roomName: row.roomName as string,
        loungeId: row.loungeId as string,
        img: row.thumbnail as string,
      },
    });
  };

  const handleCloseModal = () => setModal({ isOpen: false, detail: null });

  const handleDeleteRow = (row: DataTableRowType<ChatColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '오픈채팅',
        message: '오픈채팅을 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          communityChatApi
            .deleteCommunityChat(row.roomId as string)
            .then((response) => {
              if (response.success) getChatList();
            });
        },
      }),
    );
    openCustomModal();
  };

  const getChatList = async () => {
    const response = await communityChatApi.getCommunityChatList(request);
    if (response.success) {
      const { data } = response;
      setTotal(data.totalElements);
      setRows(data.content);
    }
  };

  useEffect(() => {
    getChatList();
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
        <title>오픈채팅 관리</title>
      </Head>
      <Flex
        className="community-chat-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['커뮤니티', '오픈채팅 관리']} />
        <PageTitle
          title="오픈채팅 관리"
          onClickDownload={excelDown}
          isDownload
        />

        <TableTop
          total={total}
          limit={request.size}
          search={{
            searchTypes: [
              { value: 1, label: '전체' },
              { value: 2, label: '채팅명' },
              { value: 3, label: '라운지 위치' },
            ],
            keyword: request.keyword,
            searchType: request.searchType,
            onChangeLimit: (value: number) => handleChangeInput('size', value),
            onChangeSearchType: (type: number) =>
              handleChangeInput('searchType', type),
            onChangeKeyword: (keyword: string) =>
              handleChangeInput('keyword', keyword),
            onClickSearch: () => console.log('검색'),
          }}
          createButton={{
            title: '오픈채팅 추가',
            width: '103px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={CHAT_COLUMNS}
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
      <ChatDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        detail={modal.detail}
        onClose={handleCloseModal}
        onComplete={() => {
          handleCloseModal();
          getChatList();
        }}
      />
    </>
  );
}

export default withAdminLayout(CommunityChatPage);
