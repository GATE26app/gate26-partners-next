import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import MenuEditModal from '@components/AdminMenuPage/_fragments/MenuEditModal';
import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { AdminMenuColumnType, AdminMenuColumns } from './AdminMenuPage.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ReqMenuProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

type ModalType = 'create' | 'modify';
interface ModalProps {
  isOpen: boolean;
  type?: ModalType;
  targetId?: number;
}
const rows: DataTableRowType<AdminMenuColumnType>[] = [
  {
    id: 1,
    title: '메뉴 관리',
    path: '/admin/list',
    useStatus: true,
    createdAt: dayjs('2002-01-02 09:00'),
  },
  {
    id: 2,
    title: '메뉴 관리',
    path: '/admin/list',
    useStatus: true,
    createdAt: dayjs('2002-01-02 09:00'),
  },
  {
    id: 3,
    title: '메뉴 관리',
    path: '/admin/list',
    useStatus: true,
    createdAt: dayjs('2002-01-02 09:00'),
  },
];

function AdminMenuPage() {
  const [request, setRequest] = useState<ReqMenuProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
  });
  const userColumns = new AdminMenuColumns();
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') newRequest.page = 1;

    setRequest(newRequest);
  }

  const handleMenuModalOpen = (type: ModalType) => {
    setModal({ type, isOpen: true });
  };

  const handleMenuModalClose = () => {
    setModal({ isOpen: false });
  };

  const handleDeleteRow = (row: DataTableRowType<AdminMenuColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '메뉴 관리',
        message: '메뉴를 삭제 하시겠습니까?',
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
        <title>메뉴 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['관리자', '메뉴 관리']} />
        <PageTitle
          title="메뉴 관리"
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
            title: '메뉴 추가',
            width: '83px',
            onClickCreate: () => handleMenuModalOpen('create'),
          }}
        />
        <DataTable
          columns={userColumns.LIST_COLUMNS}
          rows={rows}
          isMenu
          onDelete={(row) => handleDeleteRow(row)}
          onEdit={() => handleMenuModalOpen('modify')}
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
      <MenuEditModal
        isOpen={modal.isOpen}
        type={modal.type}
        onClose={handleMenuModalClose}
      />
    </>
  );
}

export default withAdminLayout(AdminMenuPage);
