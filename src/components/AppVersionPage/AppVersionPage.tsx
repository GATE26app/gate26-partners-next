import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import VersionEditModal from '@components/AppVersionPage/_fragments/VersionEditModal';
import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import {
  AppVersionPageColumnType,
  AppVersionPageColumns,
} from './AppVersionPage.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ReqAppVersionProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

type ModalType = 'create' | 'modify';
interface ModalProps {
  isOpen: boolean;
  type?: ModalType;
  targetId?: number;
}
const rows: DataTableRowType<AppVersionPageColumnType>[] = [
  {
    id: 1,
    os: 'window',
    majorVer: 'Major Version',
    minorVer: 'Minor Version',
    patchVer: 'Patch Version',
    releaseContent: '업데이트 내용',
    releaseStatus: 'RS',
    modifiedAt: dayjs('2022-10-22 9:00'),
  },
  {
    id: 2,
    os: 'window',
    majorVer: 'Major Version',
    minorVer: 'Minor Version',
    patchVer: 'Patch Version',
    releaseContent: '업데이트 내용',
    releaseStatus: 'RS',
    modifiedAt: dayjs('2022-10-22 9:00'),
  },
  {
    id: 3,
    os: 'window',
    majorVer: 'Major Version',
    minorVer: 'Minor Version',
    patchVer: 'Patch Version',
    releaseContent: '업데이트 내용',
    releaseStatus: 'RS',
    modifiedAt: dayjs('2022-10-22 9:00'),
  },
];

function AppVersionPagePage() {
  const [request, setRequest] = useState<ReqAppVersionProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
  });
  const userColumns = new AppVersionPageColumns(
    handleClickListBtn,
    handleChangeInput,
  );

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const handleVersionModalOpen = (type: ModalType) => {
    setModal({ type, isOpen: true });
  };

  const handleVersionModalClose = () => {
    setModal({ isOpen: false });
  };

  const [listModal, setListModal] = useState<ModalProps>({ isOpen: false });
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') newRequest.page = 1;

    setRequest(newRequest);
  }
  function handleClickListBtn(row: DataTableRowType<AppVersionPageColumnType>) {
    setListModal({ isOpen: true, targetId: row.id as number });
  }
  function handleListModalClose() {
    setListModal({ isOpen: false, targetId: undefined });
  }

  const handleDeleteRow = (row: DataTableRowType<AppVersionPageColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '앱버전',
        message: '앱 버전을 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          console.log('삭제 처리:', row);
        },
      }),
    );
    openCustomModal();
  };
  return (
    <>
      <Head>
        <title>메뉴 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['앱 관리', '앱 버전 관리']} />
        <PageTitle
          title="앱 버전 관리"
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
          createButton={{
            title: '앱 버전 추가',
            width: '95px',
            onClickCreate: () => handleVersionModalOpen('create'),
          }}
        />
        <DataTable
          columns={userColumns.LIST_COLUMNS}
          rows={rows}
          isMenu
          onDelete={(row) => handleDeleteRow(row)}
          onEdit={() => handleVersionModalOpen('modify')}
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
      <VersionEditModal
        isOpen={modal.isOpen}
        type={modal.type}
        onClose={handleVersionModalClose}
      />
    </>
  );
}

export default withAdminLayout(AppVersionPagePage);
