import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import CommunityLoungeApi from '@apis/communityLounge/CommunityLoungeApi';
import { CommunityLoungeParamGetType } from '@apis/communityLounge/CommunityLoungeApi.type';
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
  title?: string;
  coverImg?: string;
  img?: string;
  displayOrder?: number;
  openYn?: boolean;
}

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
  const [displayMax, setDisplayMax] = useState<number>(0);

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'size') {
      newRequest.page = 0;
    }
    setRequest(newRequest);
  };

  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  const handleEditRow = (row: DataTableRowType<LoungeColumnType>) => {
    if (!row.tgId) {
      return;
    }
    setModal({
      isOpen: true,
      type: 'modify',
      targetId: row.tgId as string,
      title: row.loungeName as string,
      coverImg: row.coverImg as string,
      img: row.imagePath as string,
      displayOrder: row.displayOrder as number,
      openYn: row.isOpen as boolean,
    });
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
        getLoungeDisplayOrderMax();
      }
    });
  };

  const getLoungeDisplayOrderMax = () => {
    CommunityLoungeApi.getDisplayOrderMax().then((count) => {
      if (count > 0) {
        setDisplayMax(count);
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
          limit={request.size}
          search={{
            searchTypes: [
              { value: 1, label: '전체' },
              { value: 2, label: '라운지명' },
            ],
            searchType: request.searchType,
            keyword: request.keyword,
            onChangeLimit: (value: number) => handleChangeInput('size', value),
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
        detail={modal}
        displayMax={displayMax}
        onClose={handleCloseModal}
        onComplete={() => {
          handleCloseModal();
          getLoungeList();
        }}
      />
    </>
  );
}

export default withAdminLayout(CommunityLoungePage);
