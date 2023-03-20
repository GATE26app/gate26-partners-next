import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import UserListApi from '@apis/userList/UserListApi';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { UserColumnType, UserColumns } from './UserListPage.data';
import userListApi from '@apis/userList/UserListApi';
import useExcelDown from '@hooks/useExcelDown';
import { crypto } from '@utils/crypto';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  size: number;
}

function UserListPage() {
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

  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 0,
    size: 10,
  });

  const [rows, setDataTableRow] = useState<DataTableRowType<UserColumnType>[]>(
    [],
  );
  const [total, setTotal] = useState<number>(100);
  const userColumns = new UserColumns(handleChangeInput);

  useEffect(() => {
    getUserInfoList();
  }, []);

  const getUserInfoList = useCallback(() => {
    const requestParams = {
      page: pageNumber.current,
      size: pageSize.current,
      keyword: keyword.current,
      type: searchType.current,
    };
    setRequest(requestParams);
    UserListApi.getUserList(requestParams)
      .then((response) => {
        const { data, count, success } = response;
        let listData: DataTableRowType<UserColumnType>[] = [];
        if (success) {
          data?.content.forEach((element) => {
            element.birthDate = crypto.decrypt(element.birthDate);
            element.name = crypto.decrypt(element.name as string);
            element.phone = crypto.decrypt(element.phone as string);
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
    getUserInfoList(); // 페이징 요청
  }

  const excelDown = () => {
    useExcelDown(rows, '회원');
  };
  const excelAllDown = () => {
    const req = {
      page: 0,
      size: total,
    };
    userListApi
      .getUserList(req)
      .then((response) => {
        if (response.success) {
          const { data } = response;
          data?.content.forEach((element) => {
            element.birthDate = crypto.decrypt(element.birthDate);
            element.name = crypto.decrypt(element.name as string);
            element.phone = crypto.decrypt(element.phone as string);
          });
          useExcelDown(data?.content, '전체 회원');
          // crypto.decrypt(data.content[0].name as string);
        }
      })
      .catch((err) => console.log(err));
  };
  

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
          onClickDownload={excelDown}
          onClickAllDownload={excelAllDown}
          isDownload
          isAllDownLoad
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
