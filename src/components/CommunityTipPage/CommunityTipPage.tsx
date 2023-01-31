import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as excel from 'xlsx';

import { Flex } from '@chakra-ui/react';

import CommunityTipApi from '@apis/communityTip/communityTipApi';
import {
  TipParamGetType,
  TipPostType,
  TipPutType,
} from '@apis/communityTip/communityTipApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { CommunityTip, TipColumnType } from './CommunityTipPage.data';
import TipDetailModal from './_fragments/TipDetailModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: number;
  modifyData?: TipPutType;
}

function CommunityTipPage() {
  const [request, setRequest] = useState<TipParamGetType>({
    page: 0,
    size: 10,
  });
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const [rows, setRows] = useState<DataTableRowType<TipColumnType>[]>([]);
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const communityTip = new CommunityTip(handleChangeOpen);
  const handleAlert = (message?: string) => {
    if (!message) return;
    dispatch(
      customModalSliceAction.setMessage({
        title: '여행팁 관리',
        message,
        type: 'alert',
      }),
    );
    openCustomModal();
  };
  useEffect(() => {
    getTipList();
  }, [request]);

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'size') {
      newRequest.page = 0;
    }
    setRequest(newRequest);
  }

  async function handleChangeOpen(tipId: string, isOpen: string) {
    const openYn = isOpen === 'T';
    const response = await CommunityTipApi.putTipUpdateOpen({ tipId, openYn });
    if (response.success) {
      const newRows = [...rows];
      newRows.map((row) => {
        if (row.tipId === tipId) {
          return { ...row, isOpen };
        }
        return row;
      });
      setRows(newRows);
    }
  }

  const getTipList = async () => {
    const response = await CommunityTipApi.getCommunityTipList(request);
    if (response.success) {
      const { content, totalElements } = response.data;
      setRows(content);
      setTotal(totalElements);
    }
  };

  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  const handleEditRow = (data: DataTableRowType<TipColumnType>) => {
    if (!data.tipId) return;

    setModal({
      isOpen: true,
      type: 'modify',
      modifyData: data as TipPutType,
    });
  };

  const handleCloseModal = () =>
    setModal({ isOpen: false, modifyData: undefined });
  const handleTipDelete = async (tipId: string) => {
    try {
      const response = await CommunityTipApi.deleteTip(tipId);
      if (!response.success) return handleAlert('삭제 실패');
      const newRequest = { ...request };
      //삭제했을때 현재 페이지에 요소가 없고 첫번째 페이지가 아닐경우 페이지 -1
      if (rows && rows.length - 1 === 0 && newRequest.page)
        newRequest.page -= 1;

      setRequest(newRequest);

      handleAlert('삭제 성공');
    } catch (e) {
      handleAlert('삭제 실패');
    }
  };
  const handleDeleteRow = (tipId: string) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '여행팁',
        message: '여행팁을 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          handleTipDelete(tipId);
        },
      }),
    );
    openCustomModal();
  };
  const handleCreateTip = async (data: TipPostType) => {
    try {
      const response = await CommunityTipApi.postTip(data);
      if (response) {
        getTipList();
        handleCloseModal();
      }
    } catch (e: any) {
      handleAlert('생성 실패');
    }
  };
  const handleModifyIip = async (data: TipPutType) => {
    try {
      const response = await CommunityTipApi.putTip(data);
      if (response) {
        getTipList();
        handleCloseModal();
      }
    } catch (e: any) {
      handleAlert('수정 실패');
    }
  };

  const handleExcelDown = () => {
    if (!rows || !rows.length) return;
    const ws = excel?.utils?.json_to_sheet(rows);
    const wb = excel?.utils?.book_new();
    excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    excel?.writeFile(wb, '여행팁 목록.xlsx');
  };
  return (
    <>
      <Head>
        <title>여행팁 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['커뮤니티', '여행팁 관리']} />
        <PageTitle
          title="여행팁 관리"
          onClickDownload={handleExcelDown}
          isDownload
        />

        <TableTop
          total={total}
          limit={request.size}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '제목' },
              { value: 2, label: '카테고리' },
            ],
            searchType: request.searchType,
            keyword: request.keyword,
            onChangeLimit: (value: number) => handleChangeInput('size', value),
            onChangeSearchType: (searchType: number) =>
              handleChangeInput('searchType', searchType),
            onChangeKeyword: (keyword: string) =>
              handleChangeInput('keyword', keyword),
          }}
          createButton={{
            title: '여행팁 추가',
            width: '93px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={communityTip.TIP_COLUMNS}
          rows={rows}
          onEdit={handleEditRow}
          onDelete={({ tipId }) => handleDeleteRow(tipId as string)}
          isMenu
          paginationProps={{
            currentPage: request.page || 0,
            limit: request.size || 10,
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
      <TipDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        targetId={modal.targetId}
        modifyData={modal.modifyData}
        onClose={handleCloseModal}
        onComplete={handleCreateTip}
        onModify={handleModifyIip}
        onOpenAlert={handleAlert}
      />
    </>
  );
}

export default withAdminLayout(CommunityTipPage);
