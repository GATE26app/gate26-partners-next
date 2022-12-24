import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

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
  targetId?: number;
}

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

const rows: DataTableRowType<NoticeColumnType>[] = [
  {
    id: 1,
    title: '공지사항입니다.',
    content:
      '공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.',
    start: dayjs('2022-10-20 09:00'),
    end: dayjs('2022-10-22 09:00'),
  },
  {
    id: 2,
    title: '공지사항입니다.',
    content:
      '공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.',
    start: dayjs('2022-10-20 09:00'),
    end: dayjs('2022-10-22 09:00'),
  },
  {
    id: 3,
    title: '공지사항입니다.',
    content:
      '공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.',
    start: dayjs('2022-10-20 09:00'),
    end: dayjs('2022-10-22 09:00'),
  },
];

function NoticePage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);
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
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.id as number });
  };

  const handleCloseModal = () => setModal({ isOpen: false });

  const handleDeleteRow = (row: DataTableRowType<NoticeColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '공지사항',
        message: '공지를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          console.log('삭제 처리:', row);
        },
      }),
    );
    openCustomModal();
  };
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
              { value: 1, label: '내용' },
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
      </Flex>
      <NoticeDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
    </>
  );
}

export default withAdminLayout(NoticePage);
