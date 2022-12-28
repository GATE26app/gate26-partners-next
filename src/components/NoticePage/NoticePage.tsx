import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import noticeApi from '@apis/notice/NoticeApi';
import { NoticeParamGetType } from '@apis/notice/NoticeApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { LIST_COLUMNS, NoticeColumnType } from './NoticePage.data';
import NoticeDetailModal from './_fragments/NoticeDetailModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: string;
}

const SEARCH_TYPE = ['ALL', 'TITLE', 'CONTENT'];

function NoticePage() {
  const [request, setRequest] = useState<NoticeParamGetType>({
    page: 1,
    limit: 10,
    search: '',
    filter: SEARCH_TYPE[0],
  });
  const [total, setTotal] = useState<number>(100);
  const [rows, setRows] = useState<DataTableRowType<NoticeColumnType>[]>([]);
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    console.log('변경: ', key, value);
    setRequest(newRequest);
  }

  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  const handleEditRow = (row: DataTableRowType<NoticeColumnType>) => {
    if (!row.noticeId) {
      return;
    }
    setModal({
      isOpen: true,
      type: 'modify',
      targetId: row.noticeId as string,
    });
  };

  const handleCloseModal = () => setModal({ isOpen: false });

  const handleDeleteRow = (row: DataTableRowType<NoticeColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '공지사항',
        message: '공지를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: async () => {
          const response = await noticeApi.deleteNotice(row.noticeId as string);
          if (response.success) {
            console.log('삭제 처리:', row);
          }
        },
      }),
    );
    openCustomModal();
  };

  const getNoticeList = async () => {
    const response = await noticeApi.getNoticeList(request);
    if (response.success) {
      setTotal(response.count);
      setRows(response.data);
    }
  };

  useEffect(() => {
    getNoticeList();
  }, [request]);

  return (
    <>
      <Head>
        <title>공지사항</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['공지사항']} />
        <PageTitle
          title="공지사항"
          onClickDownload={() => console.log('다운로드 클릭')}
          isDownload
        />

        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '제목' },
              { value: 2, label: '내용' },
            ],
            keyword: '',
            onChangeLimit: (value: number) => handleChangeInput('limit', value),
            onChangeSearchType: (type: number) =>
              handleChangeInput('filter', SEARCH_TYPE[type]),
            onChangeKeyword: (keyword: string) =>
              handleChangeInput('search', keyword),
            onClickSearch: () => console.log('검색'),
          }}
          createButton={{
            title: '공지 추가',
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
            limit: request.limit!,
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
      <NoticeDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={getNoticeList}
      />
    </>
  );
}

export default withAdminLayout(NoticePage);
