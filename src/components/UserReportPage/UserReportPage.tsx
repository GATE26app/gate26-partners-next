import Head from 'next/head';
import { useState } from 'react';

import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { UserReportColumnType, UserReportColumns } from './UserReportPage.data';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

const rows: DataTableRowType<UserReportColumnType>[] = [
  {
    id: 1,
    category: '피드 신고',
    reason: '스팸홍보 / 도배글입니다',
    reporterEmail: 'gate26@toktokhan.dev',
    reporterName: '김이륙',
    targetEmail: 'gate26@toktokhan.dev',
    targetName: '박이륙',
    reportedAt: dayjs('2022-10-20 09:00'),
  },
  {
    id: 2,
    category: '피드 신고',
    reason: '스팸홍보 / 도배글입니다',
    reporterEmail: 'gate26@toktokhan.dev',
    reporterName: '김이륙',
    targetEmail: 'gate26@toktokhan.dev',
    targetName: '박이륙',
    reportedAt: dayjs('2022-10-20 09:00'),
  },
  {
    id: 3,
    category: '피드 신고',
    reason: '스팸홍보 / 도배글입니다',
    reporterEmail: 'gate26@toktokhan.dev',
    reporterName: '김이륙',
    targetEmail: 'gate26@toktokhan.dev',
    targetName: '박이륙',
    reportedAt: dayjs('2022-10-20 09:00'),
  },
];

function UserReportPage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);

  const userColumns = new UserReportColumns(handleChangeInput);

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') newRequest.page = 1;

    setRequest(newRequest);
  }

  return (
    <>
      <Head>
        <title>신고 조회</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['이용자', '신고 조회']} />
        <PageTitle
          title="신고 조회"
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
    </>
  );
}

export default withAdminLayout(UserReportPage);
