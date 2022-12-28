import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import CommunityLoungeApi from '@apis/community-lounge/CommunityLoungeApi';
import { CommunityLoungeParamGetType } from '@apis/community-lounge/CommunityLoungeApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { LOUNGE_COLUMNS, LoungeColumnType } from './CommunityLoungePage.data';
import LoungeDetailModal from './_fragments/LoungeDetailModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: string;
}

// const rows: DataTableRowType<LoungeColumnType>[] = [
//   {
//     id: 1,
//     title: '유럽',
//     banner:
//       'https://s3-alpha-sig.figma.com/img/ef8f/de7d/966b0231d1c3a3f512afd35d15b82fb8?Expires=1669593600&Signature=WEpB17Xs3S0QbQhQOBO3Q6LcEuniubtw2vAZiTWTM5A1Vq89~FKdVYG4eH5r~CuBrIJP5DDLK2bdnyN5NRHRU3QUp9buLXpvdqW-lJ2Vh8QFEl94YRpgIr0gYYfR0bLCtgfAlHcJt73wtQpm7R49CXeCXSXB6aj~X0nJ7sYB8YWQVckYP81lS405qrAnWkSD8lQS0RdG9uL3nIGsTVYzolppNw7gYTM4HOfkfBpjTRgWkpngyiXVsjm2Tg24VZzLb-CTeoVCyEzBlokpzAK9xSEK0H3q-n7Dlh-Cs4BhdXMlNjDWS09hrJGrm1u1eWu2Yy-HMPioaQ52iDfxv6eXug__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
//     home: 'https://s3-alpha-sig.figma.com/img/ef8f/de7d/966b0231d1c3a3f512afd35d15b82fb8?Expires=1669593600&Signature=WEpB17Xs3S0QbQhQOBO3Q6LcEuniubtw2vAZiTWTM5A1Vq89~FKdVYG4eH5r~CuBrIJP5DDLK2bdnyN5NRHRU3QUp9buLXpvdqW-lJ2Vh8QFEl94YRpgIr0gYYfR0bLCtgfAlHcJt73wtQpm7R49CXeCXSXB6aj~X0nJ7sYB8YWQVckYP81lS405qrAnWkSD8lQS0RdG9uL3nIGsTVYzolppNw7gYTM4HOfkfBpjTRgWkpngyiXVsjm2Tg24VZzLb-CTeoVCyEzBlokpzAK9xSEK0H3q-n7Dlh-Cs4BhdXMlNjDWS09hrJGrm1u1eWu2Yy-HMPioaQ52iDfxv6eXug__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
//     order: 1,
//     enable: true,
//   },
//   {
//     id: 2,
//     title: '유럽',
//     banner:
//       'https://s3-alpha-sig.figma.com/img/7ebf/ba66/4da17fddb067f82c8cb5e779dd5af0eb?Expires=1669593600&Signature=ZZZd7tBdWAGpOexfvcYAq3eSL1UfFJcW9jUv~2lCGw6MqJK~TeMmqOYCypt8XPoPLSx-Juh0-gz-MpWVBWObdCDJO5qTVzzJ--~yQTXH5xNd0mT724cp0f4AbPAE0acXUGQM0qv7uSh8XTsw-0rs2OFx5TrDL2Su63hBeLoIVpbqf7o2Zm57HFkJZKn~69-gyj1Eu39XizP-ZJ5vEWdNAGvcuo8ftT7vEHz81rvhD2GOVDSoFJTUUdvfL0GOyqSSg1GpzHtMs9taR3UK2tvInwhZw81VkXvg9M8frZkFYVA7FR2sqV3cIOXuAp76VG3M2i7-~t8LBLoVgHx549R0Ww__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
//     home: 'https://s3-alpha-sig.figma.com/img/7ebf/ba66/4da17fddb067f82c8cb5e779dd5af0eb?Expires=1669593600&Signature=ZZZd7tBdWAGpOexfvcYAq3eSL1UfFJcW9jUv~2lCGw6MqJK~TeMmqOYCypt8XPoPLSx-Juh0-gz-MpWVBWObdCDJO5qTVzzJ--~yQTXH5xNd0mT724cp0f4AbPAE0acXUGQM0qv7uSh8XTsw-0rs2OFx5TrDL2Su63hBeLoIVpbqf7o2Zm57HFkJZKn~69-gyj1Eu39XizP-ZJ5vEWdNAGvcuo8ftT7vEHz81rvhD2GOVDSoFJTUUdvfL0GOyqSSg1GpzHtMs9taR3UK2tvInwhZw81VkXvg9M8frZkFYVA7FR2sqV3cIOXuAp76VG3M2i7-~t8LBLoVgHx549R0Ww__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
//     order: 2,
//     enable: false,
//   },
// ];

function CommunityLoungePage() {
  const [request, setRequest] = useState<CommunityLoungeParamGetType>({
    searchType: 1,
    keyword: '',
    page: 0,
    size: 10,
  });
  const [rows, setRows] = useState<DataTableRowType<LoungeColumnType>[]>([]);
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    setRequest(newRequest);
  };

  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  const handleEditRow = (row: DataTableRowType<LoungeColumnType>) => {
    if (!row.tgId) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.tgId as string });
  };

  const handleCloseModal = () => setModal({ isOpen: false });

  const handleDeleteRow = (row: DataTableRowType<LoungeColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '라운지',
        message: '라운지를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: async () => {
          const response = await CommunityLoungeApi.deleteCommunityLounge(
            row.tgId as string,
          );
          if (response.success) {
            getLoungeList();
          }
        },
      }),
    );
    openCustomModal();
  };

  const getLoungeList = () => {
    CommunityLoungeApi.getCommunityLoungeList(request).then((response) => {
      if (response.success) {
        const { data } = response;
        setTotal(data.totalElements);
        setRows(data.content);
      }
    });
  };
  useEffect(() => {
    getLoungeList();
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
              { value: 1, label: '전체' },
              { value: 2, label: '라운지명' },
            ],
            keyword: request.keyword,
            onChangeLimit: (value: number) => handleChangeInput('limit', value),
            onChangeSearchType: (type: number) =>
              handleChangeInput('searchType', type),
            onChangeKeyword: (keyword: string) =>
              handleChangeInput('keyword', keyword),
            onClickSearch: () => console.log('검색'),
          }}
          createButton={{
            title: '라운지 추가',
            width: '93px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={LOUNGE_COLUMNS}
          rows={rows}
          onEdit={handleEditRow}
          onDelete={handleDeleteRow}
          isMenu
          paginationProps={{
            currentPage: request.page!,
            limit: request.size!,
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
      <LoungeDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
    </>
  );
}

export default withAdminLayout(CommunityLoungePage);
