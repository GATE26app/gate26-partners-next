import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';
import * as excel from 'xlsx';

import { Flex } from '@chakra-ui/react';

import memberManageApi from '@apis/membermanage/MemberManage';

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

  const pageNumber = useRef(0);
  const setPage = (value: number) => {
    pageNumber.current = value;
  };

  const pageSize = useRef(10);
  const setPageSize = (value: number) => {
    pageSize.current = value;
  };

  const searchType = useRef('');
  const setSearchType = (value: number) => {
    switch (value) {
      case 1:
        searchType.current = 'name'; // 이름 검색
        return;
      case 2:
        searchType.current = 'nickName'; // 닉네임 검색
        return;
      case 3:
        searchType.current = 'emailAddress'; // 이메일 검색
        return;
      default: // 전체 검색
        searchType.current = '';
        return;
    }
  };

  const keyword = useRef('');
  const setKeyword = (value: string) => {
    keyword.current = value;
  };

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

  // 최초 조회
  useEffect(() => {
    getMemberInfo();
  }, []);

  const [listModal, setListModal] = useState<ModalProps>({
    isOpen: false,
    total: 0,
  });
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'page') {
      setPage(value as number);
    } else if (key === 'limit') {
      setPage(0);
      setPageSize(value as number);
    } else if (key === 'searchType') {
      setSearchType(value as number);
    } else if (key === 'keyword') {
      setKeyword(value as string);
    }
    setRequest(newRequest);
    getMemberInfo(); // 페이징 요청
  }
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

  const getMemberInfo = useCallback(() => {
    const requestParams = {
      page: pageNumber.current,
      limit: pageSize.current,
      keyword: '',
      type: '',
    };
    setRequest(requestParams);
    memberManageApi
      .getMemberInfo(requestParams)
      .then((response) => {
        const { success, data, message } = response;
        let listData: DataTableRowType<UserManageColumnType>[] = [];
        if (data) {
          data?.content.forEach((element) => {
            listData.push(element);
          });
          setTotal(data?.totalElements === undefined ? 0 : data?.totalElements);
        } else {
          listData = [];
          console.log('이용자 > 회원 목록 리스트 호출 실패');
        }
        setRows(listData);
      })
      .catch((err) => console.log(err));
  }, []);

  const Excelrows: DataTableRowType<UserManageColumnType>[] = [];

  const excelDown = () => {
    // console.log('다운로드 클릭' + excel);
    // const ws = excel?.utils?.json_to_sheet(rows);
    // const wb = excel?.utils?.book_new();
    // excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    // excel?.writeFile(wb, '회원관리 목록.xlsx');
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
          onClickDownload={() => excelDown()}
          isDownload
        />

        <TableTop
          total={total}
          search={{
            searchTypes: searchTypeList,
            keyword: request.keyword as string,
            onChangeLimit: (value: number) => handleChangeInput('limit', value),
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
