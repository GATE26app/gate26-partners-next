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

import { AlarmColumnType, LIST_COLUMNS } from './PushManagePage.data';
import NoticeDetailModal from './_fragments/PushDetailModal';

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

const rows: DataTableRowType<AlarmColumnType>[] = [
  {
    id: 1,
    target: '전체',
    push_type: '모빌리티-공항정보',
    title: '제목',
    content: '푸쉬내용',
    reserve: dayjs('2022-10-22 09:00'),
  },
  {
    id: 2,
    target: '특정 채팅방',
    push_type: '채팅_라운지',
    title: '제목',
    content: '푸쉬내용',
    reserve: dayjs('2022-10-22 09:00'),
  },
  {
    id: 3,
    target: '특정 채팅방',
    push_type: '모빌리티_항공',
    title: '제목',
    content: '푸쉬내용',
    reserve: dayjs('2022-10-22 09:00'),
  },
];

function PushManagePage() {
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

  const handleEditRow = (row: DataTableRowType<AlarmColumnType>) => {
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.id as number });
  };

  const handleCloseModal = () => setModal({ isOpen: false });

  const handleDeleteRow = (row: DataTableRowType<AlarmColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '푸쉬 알림 관리',
        message: '푸쉬를 삭제 하시겠습니까?',
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
          onClickDownload={() => console.log('다운로드 클릭')}
          isDownload
        />

        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '푸쉬대상' },
              { value: 1, label: '제목' },
              { value: 1, label: '푸쉬내용' },
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

export default withAdminLayout(PushManagePage);
