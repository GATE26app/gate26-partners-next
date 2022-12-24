import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { UserColumnType, UserColumns } from './UserListPage.data';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

const rows: DataTableRowType<UserColumnType>[] = [
  {
    id: 1,
    profile:
      'https://s3-alpha-sig.figma.com/img/ef8f/de7d/966b0231d1c3a3f512afd35d15b82fb8?Expires=1669593600&Signature=WEpB17Xs3S0QbQhQOBO3Q6LcEuniubtw2vAZiTWTM5A1Vq89~FKdVYG4eH5r~CuBrIJP5DDLK2bdnyN5NRHRU3QUp9buLXpvdqW-lJ2Vh8QFEl94YRpgIr0gYYfR0bLCtgfAlHcJt73wtQpm7R49CXeCXSXB6aj~X0nJ7sYB8YWQVckYP81lS405qrAnWkSD8lQS0RdG9uL3nIGsTVYzolppNw7gYTM4HOfkfBpjTRgWkpngyiXVsjm2Tg24VZzLb-CTeoVCyEzBlokpzAK9xSEK0H3q-n7Dlh-Cs4BhdXMlNjDWS09hrJGrm1u1eWu2Yy-HMPioaQ52iDfxv6eXug__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    name: '김이륙',
    nickname: '게이트이륙',
    enName: 'Gate26',
    gender: '여',
    email: 'gate26@toktokhan.dev',
    phoneNumber: '010-1234-5678',
    birthday: '2002-01-02',
    signupPath: '이메일',
    createdAt: '2002-01-02',
    lastedAt: '2002-01-02',
  },
  {
    id: 2,
    profile:
      'https://s3-alpha-sig.figma.com/img/ef8f/de7d/966b0231d1c3a3f512afd35d15b82fb8?Expires=1669593600&Signature=WEpB17Xs3S0QbQhQOBO3Q6LcEuniubtw2vAZiTWTM5A1Vq89~FKdVYG4eH5r~CuBrIJP5DDLK2bdnyN5NRHRU3QUp9buLXpvdqW-lJ2Vh8QFEl94YRpgIr0gYYfR0bLCtgfAlHcJt73wtQpm7R49CXeCXSXB6aj~X0nJ7sYB8YWQVckYP81lS405qrAnWkSD8lQS0RdG9uL3nIGsTVYzolppNw7gYTM4HOfkfBpjTRgWkpngyiXVsjm2Tg24VZzLb-CTeoVCyEzBlokpzAK9xSEK0H3q-n7Dlh-Cs4BhdXMlNjDWS09hrJGrm1u1eWu2Yy-HMPioaQ52iDfxv6eXug__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    name: '김이륙',
    nickname: '게이트이륙',
    enName: 'Gate26',
    gender: '여',
    email: 'gate26@toktokhan.dev',
    phoneNumber: '010-1234-5678',
    birthday: '2002-01-02',
    signupPath: '이메일',
    createdAt: '2002-01-02',
    lastedAt: '2002-01-02',
  },
  {
    id: 3,
    profile:
      'https://s3-alpha-sig.figma.com/img/ef8f/de7d/966b0231d1c3a3f512afd35d15b82fb8?Expires=1669593600&Signature=WEpB17Xs3S0QbQhQOBO3Q6LcEuniubtw2vAZiTWTM5A1Vq89~FKdVYG4eH5r~CuBrIJP5DDLK2bdnyN5NRHRU3QUp9buLXpvdqW-lJ2Vh8QFEl94YRpgIr0gYYfR0bLCtgfAlHcJt73wtQpm7R49CXeCXSXB6aj~X0nJ7sYB8YWQVckYP81lS405qrAnWkSD8lQS0RdG9uL3nIGsTVYzolppNw7gYTM4HOfkfBpjTRgWkpngyiXVsjm2Tg24VZzLb-CTeoVCyEzBlokpzAK9xSEK0H3q-n7Dlh-Cs4BhdXMlNjDWS09hrJGrm1u1eWu2Yy-HMPioaQ52iDfxv6eXug__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    name: '김이륙',
    nickname: '게이트이륙',
    enName: 'Gate26',
    gender: '여',
    email: 'gate26@toktokhan.dev',
    phoneNumber: '010-1234-5678',
    birthday: '2002-01-02',
    signupPath: '이메일',
    createdAt: '2002-01-02',
    lastedAt: '2002-01-02',
  },
];

function UserListPage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);

  const userColumns = new UserColumns(handleChangeInput);

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') newRequest.page = 1;

    setRequest(newRequest);
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

export default withAdminLayout(UserListPage);
