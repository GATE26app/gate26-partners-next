import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

import memberManageApi, {
  MemberManageApi,
} from '@apis/membermanage/MemberManage';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import {
  ModalType,
  UserManageColumnType,
  UserManageColumns,
} from './UserManagePage.data';
import AirlineTicketModal from './_fragments/AirlineTicketModal';
import RetainedMileageModal from './_fragments/RetainedMileageModal';
import StamperyDialog from './_fragments/StamperyDialog/StamperyDialog';

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

// const rows: DataTableRowType<UserManageColumnType>[] = [
//   {
//     id: 1,
//     name: '김이륙',
//     email: 'gate26@toktokhan.dev',
//     status: true,
//     withdrawalAt: '2022-10-20',
//     withdrawalStatus: false,
//     reportAccrue: 1,
//     mileage: 100,
//     airlineTicket: 20,
//     stampery: 10,
//   },
//   {
//     id: 2,
//     name: '김이륙',
//     email: 'gate26@toktokhan.dev',
//     status: false,
//     withdrawalAt: '2022-10-20',
//     withdrawalStatus: false,
//     reportAccrue: 1,
//     mileage: 100,
//     airlineTicket: 20,
//     stampery: 10,
//   },
//   {
//     id: 3,
//     name: '김이륙',
//     email: 'gate26@toktokhan.dev',
//     status: true,
//     withdrawalAt: '2022-10-20',
//     withdrawalStatus: false,
//     reportAccrue: 1,
//     mileage: 100,
//     airlineTicket: 20,
//     stampery: 10,
//   },
// ];

function UserManagePage() {
  const [rows, setRows] = useState<DataTableRowType<UserManageColumnType>[]>();
  // 페이지 세팅
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 0,
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
    console.log(`page ${newRequest.page}`);
    setRequest(newRequest);
    getMemberInfoPagin(newRequest.page);
  }
  function handleClickListBtn(
    row: DataTableRowType<UserManageColumnType>,
    type: ModalType,
  ) {
    setListModal({ isOpen: true, targetId: row.userId as number, type });
  }
  function handleListModalClose() {
    setListModal({ isOpen: false, targetId: undefined, type: undefined });
  }

  const getMemberInfo = useCallback(() => {
    let params = { page: request.page, size: request.limit };
    if (request.page !== 0) {
      params = { page: request.page, size: request.limit * request.page };
    }
    console.log(request.page);

    memberManageApi.getMemberInfo(params).then((response) => {
      const { success, data, message } = response;

      if (data) {
        setRows(data.content);
        console.log(data);
      }
    });
  }, []);

  const getMemberInfoPagin = useCallback((page: number) => {
    let params = { page: request.page, size: request.limit };
    if (page !== 0) {
      params = { page: page, size: request.limit * page };
    }
    console.log(request.page);

    memberManageApi.getMemberInfo(params).then((response) => {
      const { success, data, message } = response;

      if (data) {
        setRows(data.content);
        console.log(data);
      }
    });
  }, []);

  useEffect(() => {
    getMemberInfo();
  }, []);

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
        isOpen={listModal.isOpen && listModal.type === 'totalMileage'}
        onClose={handleListModalClose}
      />
      <AirlineTicketModal
        targetId={listModal.targetId}
        isOpen={listModal.isOpen && listModal.type === 'ticketAuthCount'}
        onClose={handleListModalClose}
      />
      <StamperyDialog
        targetId={listModal.targetId}
        isOpen={listModal.isOpen && listModal.type === 'stampCount'}
        onClose={handleListModalClose}
      />
    </>
  );
}

export default withAdminLayout(UserManagePage);
