import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';
import * as excel from 'xlsx';

import { Flex } from '@chakra-ui/react';

import memberManageApi from '@apis/membermanage/MemberManage';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { crypto } from '@utils/crypto';

import {
  ModalType,
  UserManageColumnType,
  UserManageColumns,
} from './UserManagePage.data';
import AirlineTicketModal from './_fragments/AirlineTicketModal';
import RetainedMileageModal from './_fragments/RetainedMileageModal';
import StamperyDialog from './_fragments/StamperyDialog/StamperyDialog';
import useExcelDown from '@hooks/useExcelDown';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  size: number;
}
interface ModalProps {
  isOpen: boolean;
  type?: ModalType;
  targetId?: string;
  total: number;
}

function UserManagePage() {
  // 검색 구분
  const searchTypeList = [
    { value: 0, label: '전체' },
    { value: 1, label: '이름' },
    { value: 2, label: '닉네임' },
    { value: 3, label: '이메일' },
  ];

  // 페이지 세팅
  const [request, setRequest] = useState<ReqLoungeProps>({
    searchType: 0,
    keyword: '',
    page: 0,
    size: 10,
  });
  const [rows, setRows] = useState<DataTableRowType<UserManageColumnType>[]>(
    [],
  );

  const [Excelrow, setExcelRow] = useState<
    DataTableRowType<UserManageColumnType>[]
  >([]);
  const [total, setTotal] = useState<number>(100);
  const [listModal, setListModal] = useState<ModalProps>({
    isOpen: false,
    total: 0,
  });

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'size') {
      newRequest.page = 0;
    }
    setRequest(newRequest);
  };

  const getMemberInfo = () => {
    memberManageApi
      .getMemberInfo(request)
      .then((response) => {
        if (response.success) {
          const { data } = response;
          setTotal(data.totalElements);
          setRows(data.content);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMemberInfo();
  }, [request]);

  function handleClickListBtn(
    row: DataTableRowType<UserManageColumnType>,
    type: ModalType,
  ) {
    setListModal({
      isOpen: true,
      targetId: row.userId as string,
      type,
      total: row[type] as number,
    });
  }
  function handleListModalClose() {
    setListModal({
      isOpen: false,
      targetId: undefined,
      type: undefined,
      total: 0,
    });
  }

  const userColumns = new UserManageColumns(
    handleClickListBtn,
    handleChangeInput,
  );

  const excelDown = () => {
    useExcelDown(rows, '회원 관리');
  };
  const excelAllDown = () => {
    const req = {
      page: 0,
      size: total,
    };
    memberManageApi
      .getMemberInfo(req)
      .then((response) => {
        const listData: DataTableRowType<UserManageColumnType>[] = [];
        if (response.success) {
          const { data } = response;
          data?.content.forEach((element) => {
            element.name = crypto.decrypt(element.name as string);
            listData.push(element);
          });
          useExcelDown(data.content, '전체 회원 관리');
          // crypto.decrypt(data.content[0].name as string);
        }
      })
      .catch((err) => console.log(err));
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
        <BreadCrumb depth={['이용자', '회원 관리']} />
        <PageTitle
          title="회원 관리"
          onClickDownload={excelDown}
          onClickAllDownload={excelAllDown}
          isDownload
          isAllDownLoad
        />

        <TableTop
          total={total}
          limit={request.size}
          search={{
            searchTypes: searchTypeList,
            searchType: request.searchType,
            keyword: request.keyword,
            onChangeLimit: (value: number) => handleChangeInput('size', value),
            onChangeSearchType: (type: number) => {
              handleChangeInput('searchType', type);
            },
            onChangeKeyword: (keyword: string) => {
              handleChangeInput('keyword', keyword);
            },
            onClickSearch: () => console.log('검색'),
          }}
        />
        <DataTable
          columns={userColumns.LIST_COLUMNS}
          rows={rows}
          paginationProps={{
            currentPage: request.page,
            limit: request.size,
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
        totalMileage={listModal.total}
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
