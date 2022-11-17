import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import RoundImage from '@components/common/RoundImage';
import TableTop from '@components/common/TableTop';

function CommunityLoungePage() {
  const columns: DataTableColumnType[] = [
    {
      key: 'title',
      name: '제목',
      width: '100px',
    },
    {
      key: 'event_content',
      name: '이벤트내용',
    },
    {
      key: 'type',
      name: '타입',
    },
    {
      key: 'start',
      name: '시작일자',
    },
    {
      key: 'end',
      name: '종료일자',
    },
    {
      key: 'banner',
      name: '배너이미지',
      render: (value: DataTableRowType) => (
        <RoundImage src={value.banner} width={'187px'} height="100px" />
      ),
    },
    {
      key: 'main',
      name: '메인이미지',
      width: '200px',
      render: (value: DataTableRowType) => (
        <RoundImage src={value.banner} width={'94px'} height="100px" />
      ),
    },
  ];

  const rows: DataTableRowType[] = [
    {
      title: '123',
      event_content: '232323',
      type: 123,
      start: '2022-10-10',
      end: '2022-10-10',
      banner:
        'https://images.pexels.com/photos/1303090/pexels-photo-1303090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      main: 'https://images.pexels.com/photos/1303090/pexels-photo-1303090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: '111111111111111111111111111',
      event_content: '232323',
      type: 123,
      start: '2022-10-10',
      end: '2022-10-10',
      banner:
        'https://images.pexels.com/photos/1303090/pexels-photo-1303090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      main: 'https://images.pexels.com/photos/1303090/pexels-photo-1303090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];
  return (
    <>
      <Head>
        <title>라운지 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['커뮤니티', '라운지 관리']} />
        <PageTitle
          title="라운지 관리"
          onClickDownload={() => console.log('다운로드 클릭')}
          isDownload
        />

        <TableTop
          total={65}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '조건1' },
            ],
            keyword: '',
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
          columns={columns}
          rows={rows}
          onEdit={(row: DataTableRowType) => console.log('edit: ', row)}
          onDelete={(row: DataTableRowType) => console.log('delete: ', row)}
          isMenu
          paginationProps={{
            currentPage: 0,
            limit: 0,
            total: 0,
            onPageNumberClicked: (page: number) => console.log('a'),
            onPreviousPageClicked: (page: number) => console.log('a'),
            onNextPageClicked: (page: number) => console.log('a'),
          }}
        />
      </Flex>
    </>
  );
}

export default withAdminLayout(CommunityLoungePage);
