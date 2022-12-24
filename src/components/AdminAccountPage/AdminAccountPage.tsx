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

import {
  AdminAccountColumnType,
  AdminAccountColumns,
  ModalType,
} from './AdminAccountPage.data';
import AccountDetailModal from './_fragments/AccountDetailModal';
import AuthChangeModal from './_fragments/AuthChangeModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

// import AirlineTicketModal from './_fragments/AirlineTicketModal';
// import RetainedMileageModal from './_fragments/RetainedMileageModal';
// import StamperyDialog from './_fragments/StamperyDialog/StamperyDialog';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}
interface ModalProps {
  isOpen: boolean;
  type?: ModalType;
  targetId?: number;
}
interface AccountDetailModalProps extends Omit<ModalProps, 'type'> {
  type?: 'create' | 'modify';
}

const rows: DataTableRowType<AdminAccountColumnType>[] = [
  {
    id: 1,
    userId: 'Gate26',
    name: '김이륙',
    email: 'gate26@toktokhan.dev',
    createdAt: dayjs('2002-01-02 09:00'),
    useStatus: true,
    authority: '권한',
  },
  {
    id: 2,
    userId: 'Gate26',
    name: '김이륙',
    email: 'gate26@toktokhan.dev',
    createdAt: dayjs('2002-01-02 09:00'),
    useStatus: true,
    authority: '권한',
  },
  {
    id: 3,
    userId: 'Gate26',
    name: '김이륙',
    email: 'gate26@toktokhan.dev',
    createdAt: dayjs('2002-01-02 09:00'),
    useStatus: true,
    authority: '권한',
  },
];

function AdminAccountPage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<AccountDetailModalProps>({
    isOpen: false,
  });
  const [authModal, setAuthModal] = useState<ModalProps>({
    isOpen: false,
  });
  const userColumns = new AdminAccountColumns(handleAuthChangeModalOpen);
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') newRequest.page = 1;

    setRequest(newRequest);
  }

  function handleAuthChangeModalOpen(
    row: DataTableRowType<AdminAccountColumnType>,
  ) {
    setAuthModal({ isOpen: true });
  }
  const handleCloseModal = () => {
    setModal({ isOpen: false });
  };
  const handleAuthModalClose = () => {
    setAuthModal({ isOpen: false });
  };

  const handleEditRow = (row: DataTableRowType<AdminAccountColumnType>) => {
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.id as number });
  };

  const handleCreateRow = () => {
    setModal({ isOpen: true, type: 'create' });
  };

  const handleDeleteRow = (row: DataTableRowType<AdminAccountColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '관리자 관리',
        message: '관리자를 삭제 하시겠습니까?',
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
        <title>회원 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['관리자', '관리자 관리']} />
        <PageTitle
          title="관리자 관리"
          onClickDownload={() => console.log('다운로드 클릭')}
          isDownload
        />

        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '제목' },
              { value: 1, label: '카테고리' },
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
            title: '관리자 추가',
            width: '93px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={userColumns.LIST_COLUMNS}
          rows={rows}
          isMenu
          onDelete={(row) => handleDeleteRow(row)}
          onEdit={(row) => handleEditRow(row)}
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
      <AccountDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
      <AuthChangeModal
        isOpen={authModal.isOpen}
        onClose={handleAuthModalClose}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
    </>
  );
}

export default withAdminLayout(AdminAccountPage);
