import Head from 'next/head';
import { useState } from 'react';

import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { UserManageColumnType, UserManageColumns } from './UserManagePage.data';
import RetainedMileageModal from './_fragments/RetainedMileageModal';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}
interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: number;
}
const rows: DataTableRowType<UserManageColumnType>[] = [
  {
    id: 1,
    name: '김이륙',
    email: 'gate26@toktokhan.dev',
    status: true,
    withdrawalAt: '2022-10-20',
    withdrawalStatus: false,
    reportAccrue: 1,
    mileage: 100,
    airlineTicket: 20,
    stampery: 10,
  },
  {
    id: 2,
    name: '김이륙',
    email: 'gate26@toktokhan.dev',
    status: false,
    withdrawalAt: '2022-10-20',
    withdrawalStatus: false,
    reportAccrue: 1,
    mileage: 100,
    airlineTicket: 20,
    stampery: 10,
  },
  {
    id: 3,
    name: '김이륙',
    email: 'gate26@toktokhan.dev',
    status: true,
    withdrawalAt: '2022-10-20',
    withdrawalStatus: false,
    reportAccrue: 1,
    mileage: 100,
    airlineTicket: 20,
    stampery: 10,
  },
];

function UserManagePage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);

  const userColumns = new UserManageColumns(
    handleClickListBtn,
    handleChangeInput,
  );
  const [listModal, setListModal] = useState<ModalProps>({ isOpen: false });
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') newRequest.page = 1;

    setRequest(newRequest);
  }
  function handleClickListBtn(row: DataTableRowType<UserManageColumnType>) {
    setListModal({ isOpen: true, targetId: row.id as number });
  }
  function handleListModalClose() {
    setListModal({ isOpen: false, targetId: undefined });
  }
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
        <BreadCrumb depth={['이용자', '회원 관리']} />
        <PageTitle
          title="회원 관리"
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
        />
        <DataTable
          columns={userColumns.LIST_COLUMNS}
          rows={rows}
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
      <RetainedMileageModal
        targetId={listModal.targetId}
        isOpen={listModal.isOpen}
        onClose={handleListModalClose}
      />
    </>
  );
}

export default withAdminLayout(UserManagePage);
