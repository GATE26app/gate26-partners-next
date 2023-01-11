import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import stampApis from '@apis/stamp/StampApis';
import {
  StampDTOType,
  StampListDTOType,
  StampParamGetType,
  StampUpdateDTOType,
} from '@apis/stamp/StampApis.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { Stamp, StampCol } from './MobilityStamp.data';
import MobilityStampModal from './_fragments/MobilityStampModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: number;
  modifyData?: StampUpdateDTOType;
}

const MobilityStamp = () => {
  const [total, setTotal] = useState<number>(100);
  const [request, setRequest] = useState<StampParamGetType>({
    page: 0,
    size: 10,
  });
  const [rows, setRows] = useState<StampListDTOType[]>([]);
  const { openCustomModal } = useCustomModalHandlerContext();
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const stamp = new Stamp(handleChangeInput);

  useEffect(() => {
    getStampList();
  }, []);

  const handleEditRow = (row: DataTableRowType<StampCol>) => {
    const data = { ...row };
    if (!data.stampId) return;
    if (data.stampType === 'AIRLINE') data.stampType = '1';
    else if (data.stampType === 'CHALLENGE') data.stampType = '2';
    else if (data.stampType === 'COUNTRY') data.stampType = '3';
    setModal({
      isOpen: true,
      type: 'modify',
      modifyData: data as StampUpdateDTOType,
    });
  };
  const handleCloseModal = () => {
    setModal({ isOpen: false, modifyData: undefined });
  };
  const dispatch = useDispatch();
  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'size') {
      newRequest.page = 0;
    }
    setRequest(newRequest);
    if (key === 'size' || key === 'page') getStampList(newRequest);
  }

  const getStampList = async (param?: StampParamGetType) => {
    const response = await stampApis.getStamp({ ...param });
    if (response.success) {
      setTotal(response.data?.totalElements || 0);
      setRows(response.data?.content || []);
    }
  };
  const handleStampDelete = async (stampId: string) => {
    try {
      const response = await stampApis.deleteStamp(stampId);
      if (!response.success) return alert('삭제 실패');
      const newRequest = { ...request };
      //삭제했을때 현재 페이지에 요소가 없고 첫번째 페이지가 아닐경우 페이지 -1
      if (rows && rows.length - 1 === 0 && newRequest.page)
        newRequest.page -= 1;

      setRequest(newRequest);
      getStampList(newRequest);
      alert('삭제 성공');
    } catch (e) {
      alert('삭제 실패');
    }
  };

  const handleCreateStamp = async (data: StampDTOType) => {
    try {
      const response = await stampApis.postStamp(data);
      if (response) {
        getStampList(request);
        handleCloseModal();
      }
    } catch (e: any) {
      alert('생성 실패');
    }
  };
  const handleModifyStamp = async (data: StampUpdateDTOType) => {
    try {
      const response = await stampApis.putStamp(data);
      if (response) {
        getStampList(request);
        handleCloseModal();
      }
    } catch (e: any) {
      alert('생성 실패');
    }
  };

  const handleDeleteRow = (stampId: string) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '스탬프러리 관리',
        message: '스탬프러리를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => handleStampDelete(stampId),
      }),
    );
    openCustomModal();
  };
  return (
    <>
      <Head>
        <title>스탬프러리 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['모빌리티', '스탬프러리 관리']} />
        <PageTitle
          title="스탬프러리 관리"
          onClickDownload={() => console.log('다운로드 클릭')}
          isDownload
        />
        <TableTop
          total={total}
          limit={request.size}
          search={{
            searchTypes: [
              { value: 1, label: '전체' },
              { value: 2, label: '스탬프러리 제목' },
              { value: 3, label: '스탬프러리 설명' },
            ],
            searchType: request.searchType,
            keyword: request.keyword,
            onChangeLimit: (value: number) => handleChangeInput('size', value),
            onChangeSearchType: (type: number) =>
              handleChangeInput('searchType', type),
            onChangeKeyword: (keyword: string) =>
              handleChangeInput('keyword', keyword),
            onClickSearch: () => getStampList(request),
          }}
          createButton={{
            title: '스탬프러리 추가',
            width: '113px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={stamp.STAMP_COLUMNS}
          rows={rows}
          onEdit={handleEditRow}
          onDelete={({ stampId }) => handleDeleteRow(stampId as string)}
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
      <MobilityStampModal
        isOpen={modal.isOpen}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        modifyData={modal.modifyData}
        onComplete={handleCreateStamp}
        onModify={handleModifyStamp}
      />
    </>
  );
};

export default withAdminLayout(MobilityStamp);
