import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import RoundImage from '@components/common/RoundImage';
import SmallButton from '@components/common/SmallButton';
import TableTop from '@components/common/TableTop';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

const columns: DataTableColumnType[] = [
  {
    key: 'title',
    name: '라운지명',
    width: '25.8%',
  },
  {
    key: 'banner',
    name: '배너 이미지',
    width: '28.3%',
    render: (value: DataTableRowType) => (
      <RoundImage src={value.banner} width={'187px'} height="100px" />
    ),
  },
  {
    key: 'home',
    name: '홈 이미지',
    width: '26.6%',
    render: (value: DataTableRowType) => (
      <RoundImage src={value.home} width={'94px'} height="100px" />
    ),
  },
  {
    key: 'manageBtn',
    name: '이벤트 배너 관리',
    width: '12.5%',
    render: (value: DataTableRowType) => (
      <SmallButton width="87px" text="이벤트 배너 관리" color="normal" />
    ),
  },
];

const rows: DataTableRowType[] = [
  {
    title: '유럽',
    banner:
      'https://s3-alpha-sig.figma.com/img/ef8f/de7d/966b0231d1c3a3f512afd35d15b82fb8?Expires=1669593600&Signature=WEpB17Xs3S0QbQhQOBO3Q6LcEuniubtw2vAZiTWTM5A1Vq89~FKdVYG4eH5r~CuBrIJP5DDLK2bdnyN5NRHRU3QUp9buLXpvdqW-lJ2Vh8QFEl94YRpgIr0gYYfR0bLCtgfAlHcJt73wtQpm7R49CXeCXSXB6aj~X0nJ7sYB8YWQVckYP81lS405qrAnWkSD8lQS0RdG9uL3nIGsTVYzolppNw7gYTM4HOfkfBpjTRgWkpngyiXVsjm2Tg24VZzLb-CTeoVCyEzBlokpzAK9xSEK0H3q-n7Dlh-Cs4BhdXMlNjDWS09hrJGrm1u1eWu2Yy-HMPioaQ52iDfxv6eXug__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    home: 'https://s3-alpha-sig.figma.com/img/ef8f/de7d/966b0231d1c3a3f512afd35d15b82fb8?Expires=1669593600&Signature=WEpB17Xs3S0QbQhQOBO3Q6LcEuniubtw2vAZiTWTM5A1Vq89~FKdVYG4eH5r~CuBrIJP5DDLK2bdnyN5NRHRU3QUp9buLXpvdqW-lJ2Vh8QFEl94YRpgIr0gYYfR0bLCtgfAlHcJt73wtQpm7R49CXeCXSXB6aj~X0nJ7sYB8YWQVckYP81lS405qrAnWkSD8lQS0RdG9uL3nIGsTVYzolppNw7gYTM4HOfkfBpjTRgWkpngyiXVsjm2Tg24VZzLb-CTeoVCyEzBlokpzAK9xSEK0H3q-n7Dlh-Cs4BhdXMlNjDWS09hrJGrm1u1eWu2Yy-HMPioaQ52iDfxv6eXug__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
  {
    title: '유럽',
    banner:
      'https://s3-alpha-sig.figma.com/img/7ebf/ba66/4da17fddb067f82c8cb5e779dd5af0eb?Expires=1669593600&Signature=ZZZd7tBdWAGpOexfvcYAq3eSL1UfFJcW9jUv~2lCGw6MqJK~TeMmqOYCypt8XPoPLSx-Juh0-gz-MpWVBWObdCDJO5qTVzzJ--~yQTXH5xNd0mT724cp0f4AbPAE0acXUGQM0qv7uSh8XTsw-0rs2OFx5TrDL2Su63hBeLoIVpbqf7o2Zm57HFkJZKn~69-gyj1Eu39XizP-ZJ5vEWdNAGvcuo8ftT7vEHz81rvhD2GOVDSoFJTUUdvfL0GOyqSSg1GpzHtMs9taR3UK2tvInwhZw81VkXvg9M8frZkFYVA7FR2sqV3cIOXuAp76VG3M2i7-~t8LBLoVgHx549R0Ww__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    home: 'https://s3-alpha-sig.figma.com/img/7ebf/ba66/4da17fddb067f82c8cb5e779dd5af0eb?Expires=1669593600&Signature=ZZZd7tBdWAGpOexfvcYAq3eSL1UfFJcW9jUv~2lCGw6MqJK~TeMmqOYCypt8XPoPLSx-Juh0-gz-MpWVBWObdCDJO5qTVzzJ--~yQTXH5xNd0mT724cp0f4AbPAE0acXUGQM0qv7uSh8XTsw-0rs2OFx5TrDL2Su63hBeLoIVpbqf7o2Zm57HFkJZKn~69-gyj1Eu39XizP-ZJ5vEWdNAGvcuo8ftT7vEHz81rvhD2GOVDSoFJTUUdvfL0GOyqSSg1GpzHtMs9taR3UK2tvInwhZw81VkXvg9M8frZkFYVA7FR2sqV3cIOXuAp76VG3M2i7-~t8LBLoVgHx549R0Ww__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
];

function CommunityLoungePage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    setRequest(newRequest);
  };

  useEffect(() => {
    console.log(request);
  }, [request]);
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
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '조건1' },
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
          columns={columns}
          rows={rows}
          onEdit={(row: DataTableRowType) => console.log('edit: ', row)}
          onDelete={(row: DataTableRowType) => console.log('delete: ', row)}
          isMenu
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

export default withAdminLayout(CommunityLoungePage);
