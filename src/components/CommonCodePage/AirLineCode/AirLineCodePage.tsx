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

import { AirLineCode, AirLineCol } from './AirLineCode.data';

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

const rows: DataTableRowType<AirLineCol>[] = [
  {
    id: 1,
    nameKr: '대한항공',
    nameEng: 'Korean Air',
    iata: 'KE',
    icao: 'KAL',
    airportUrl: 'http://www.koreanair.com',
    pageUrl: 'http://www.koreanair.com',
    selfUrl: 'http://www.koreanair.com',
    dutyUrl: 'http://www.koreanair.com',
    repNum: '02-2656-2001',
    korYn: '국내',
    answer: '사용',
  },
  {
    id: 2,
    nameKr: '대한항공',
    nameEng: 'Korean Air',
    iata: 'KE',
    icao: 'KAL',
    airportUrl: 'http://www.koreanair.com',
    pageUrl: 'http://www.koreanair.com',
    selfUrl: 'http://www.koreanair.com',
    dutyUrl: 'http://www.koreanair.com',
    repNum: '02-2656-2001',
    korYn: '국내',
    answer: '사용',
  },
  {
    id: 3,
    nameKr: '대한항공',
    nameEng: 'Korean Air',
    iata: 'KE',
    icao: 'KAL',
    airportUrl: 'http://www.koreanair.com',
    pageUrl: 'http://www.koreanair.com',
    selfUrl: 'http://www.koreanair.com',
    dutyUrl: 'http://www.koreanair.com',
    repNum: '02-2656-2001',
    korYn: '국내',
    answer: '사용',
  },
];

const MobilityStamp = () => {
  const [total, setTotal] = useState<number>(100);
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const { openCustomModal } = useCustomModalHandlerContext();
  const stamp = new AirLineCode(handleChangeInput);
  const handleEditRow = (row: DataTableRowType<AirLineCol>) => {
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
  const handleDeleteRow = (row: DataTableRowType<AirLineCol>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '공항사 코드',
        message: '공항사 코드를 삭제 하시겠습니까?',
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
        <title>공항사 코드</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['공통 코드', '공항사 코드']} />
        <PageTitle
          title="공항사 코드"
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
            title: '공항사 코드 추가',
            width: '116px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={stamp.TIP_COLUMNS}
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

export default withAdminLayout(MobilityStamp);
