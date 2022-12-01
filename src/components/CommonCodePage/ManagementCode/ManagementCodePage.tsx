import Head from 'next/head';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { ManageCode, MenageCol } from './ManagementCode.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}
interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: number;
}

const rows: DataTableRowType<MenageCol>[] = [
  {
    id: 1,
    code: 'COM_REPORT_TYPES',
    codeValue: '-',
    info: '커뮤니티 신고 목록',
  },
  {
    id: 2,
    code: 'CRT_ABUSE',
    codeValue: '욕설/생명경시/혐오/차별적 표현입니다',
    info: '-',
  },
  {
    id: 3,
    code: 'CRT_ILLEGALITY',
    codeValue: '욕설/생명경시/혐오/차별적 표현입니다',
    info: '-',
  },
];

const ManagementCode = () => {
  const [total, setTotal] = useState<number>(100);
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const { openCustomModal } = useCustomModalHandlerContext();
  const Menage = new ManageCode(handleChangeInput);
  const handleEditRow = (row: DataTableRowType<MenageCol>) => {
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.id as number });
  };

  const dispatch = useDispatch();
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    console.log('변경: ', key, value);
    setRequest(newRequest);
  }
  const handleDeleteRow = (row: DataTableRowType<MenageCol>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '코드 관리',
        message: '코드를 삭제 하시겠습니까?',
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
        <title>코드관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['공통 코드', '코드 관리']} />
        <PageTitle
          title="코드 관리"
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
            title: '코드 추가',
            width: '83px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={Menage.MANAGE_COLUMNS}
          rows={rows}
          onEdit={handleEditRow}
          onDelete={handleDeleteRow}
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
};

export default withAdminLayout(ManagementCode);
