import Head from 'next/head';
import { useState } from 'react';

import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

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

  const userColumns = new AdminAccountColumns(
    handleClickListBtn,
    handleChangeInput,
  );
  const [listModal, setListModal] = useState<ModalProps>({ isOpen: false });
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') newRequest.page = 1;

    setRequest(newRequest);
  }
  function handleClickListBtn(
    row: DataTableRowType<AdminAccountColumnType>,
    type: ModalType,
  ) {
    setListModal({ isOpen: true, targetId: row.id as number, type });
  }
  function handleListModalClose() {
    setListModal({ isOpen: false, targetId: undefined, type: undefined });
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
            // onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={userColumns.LIST_COLUMNS}
          rows={rows}
          isMenu
          onDelete={() => console.log('onDelete')}
          onEdit={() => console.log('onEdit')}
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
    </>
  );
}

export default withAdminLayout(AdminAccountPage);
