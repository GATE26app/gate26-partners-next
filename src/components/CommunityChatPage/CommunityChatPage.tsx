import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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
import MessageDownloadModal from './_fragments/MessageDownloadModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
import useExcelDown from '@hooks/useExcelDown';

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

  const handleDownloadBtn = () =>
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
    useExcelDown(rows, '오픈채팅');
  };
  const excelAllDown = () => {
    const req = {
      searchType : request.searchType,
      keyword : request.keyword,
      page: 0,
      size: total,
    };
    communityChatApi
      .getCommunityChatList(req)
      .then((response) => {
        if (response.success) {
          const { data } = response;
          useExcelDown(data.content, '전체 오픈채팅');
        }
      })
      .catch((err) => console.log(err));
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
          onClickAllDownload={excelAllDown}
          isDownload
          isAllDownLoad
        />

        <TableTop
          total={total}
          limit={request.size}
          search={{
            searchTypes: [
              { value: 1, label: '전체' },
              { value: 2, label: '채팅명' },
              { value: 3, label: '라운지' },
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
          extraButton={{
            title: '대화 다운받기',
            width: '120px',
            onClickOpen: handleDownloadBtn,
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
      <MessageDownloadModal
        isOpen={modal.isOpen && modal.type !== undefined}
        detail={modal.detail}
        onClose={handleCloseModal}
        onComplete={() => {
          handleCloseModal();
        }}
      />
    </>
  );
}

export default withAdminLayout(CommunityChatPage);
