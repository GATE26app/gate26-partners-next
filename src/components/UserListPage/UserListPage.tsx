import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { UserColumnType, UserColumns } from './UserListPage.data';
import UserListApi from '@apis/userList/UserListApi';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  size: number;
}

// let rows: DataTableRowType<UserColumnType>[] = [];

function UserListPage() {
  let pageNumber = 0;
  let pageSize = 3;
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 0,
    size: 10,
  });

  const [rows, setDataTableRow] = useState<DataTableRowType<UserColumnType>[]>([]);

  const [total, setTotal] = useState<number>(100);

  const userColumns = new UserColumns(handleChangeInput);

  useEffect(() => {
    getUserInfoList({pageNumber, pageSize});
  }, []);

  const getUserInfoList = useCallback((params) => {
    const pageRequest = { page: params['pageNumber'], size: params['pageSize'] };
    setRequest(pageRequest);
    UserListApi.getUserList(pageRequest)
      .then((response) => {
        const { data, count, success } = response;
        let listData: DataTableRowType<UserColumnType>[] = [];
        if (success) {
          data?.content.forEach((element) => {
            listData.push(element);
          });
          setTotal(data?.totalElements === undefined ? 0 : data?.totalElements);
        } else {
          listData = [];
          console.log('이용자 > 회원 목록 리스트 호출 실패');
        }
        setDataTableRow(listData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'page') {
      pageNumber = newRequest.page;
    }
    if (key === 'limit') {
      newRequest.page = 0; // 0으로 초기화
      pageSize = newRequest.size;
    }
    setRequest(newRequest);
    getUserInfoList({pageNumber, pageSize}); // 페이징 요청
  }

  return (
    <>
      <Head>
        <title>회원 목록</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['이용자', '회원 목록']} />
        <PageTitle
          title="회원 목록"
          onClickDownload={() => console.log('다운로드 클릭')}
          isDownload
        />

        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '출발지' },
              { value: 1, label: '도착지 ' },
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
    </>
  );
}

export default withAdminLayout(UserListPage);
