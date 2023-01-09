import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as excel from 'xlsx';

import { Flex } from '@chakra-ui/react';

import commonApi from '@apis/common/CommonApi';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { AirPortCol, AirportCode } from './AirportCode.data';
import AirportCodeModal from './_fragments/AirportCodeModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ReqLoungeProps {
  type?: string;
  keyword?: string;
  page: number;
  size: number;
}
interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: number;
}

const MobilityStamp = () => {
  const [total, setTotal] = useState<number>(0);
  const [request, setRequest] = useState<ReqLoungeProps>({
    type: '',
    keyword: '',
    page: 1,
    size: 10,
  });

  // 검색 용

  const searchTypeList = [
    { value: 0, label: '전체' },
    { value: 1, label: 'OS' },
    { value: 2, label: 'MAJOR VERSION' },
    { value: 3, label: 'MINOR VERSION' },
  ];
  const pageNumber = useRef(0);
  const setPage = (value: number) => {
    pageNumber.current = value;
  };

  const pageSize = useRef(10);
  const setPageSize = (value: number) => {
    pageSize.current = value;
  };

  const searchType = useRef('');
  const setSearchType = (value: number) => {
    switch (value) {
      case 1:
        searchType.current = 'OS'; // 이름 검색
        return;
      case 2:
        searchType.current = 'MAJOR VERSION'; // 닉네임 검색
        return;
      case 3:
        searchType.current = 'MINOR VERSION'; // 이메일 검색
        return;
      default: // 전체 검색
        searchType.current = '';
        return;
    }
  };

  const keyword = useRef('');
  const setKeyword = (value: string) => {
    keyword.current = value;
  };

  const [rows, setDataTableRow] = useState<DataTableRowType<AirPortCol>[]>([]);

  const { openCustomModal } = useCustomModalHandlerContext();
  const airportCode = new AirportCode(handleChangeInput);
  const handleEditRow = (row: DataTableRowType<AirPortCol>) => {
    if (!row.code) {
      return;
    }
    console.log(`codecodecode ${row.code}`);
    setModal({ isOpen: true, type: 'modify', targetId: row.code as any });
  };
  const handleCloseModal = () => setModal({ isOpen: false });
  const dispatch = useDispatch();
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });

  // 공항 코드 추가하기
  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'page') {
      setPage(value as number);
    } else if (key === 'size') {
      setPage(0);
      setPageSize(value as number);
    } else if (key === 'type') {
      setSearchType(value as number);
    } else if (key === 'keyword') {
      setKeyword(value as string);
    }
    setRequest(newRequest);
    getAirportList(); // 페이징 요청
  }

  /**
   * 최초 공항코드 리스트 불러오기
   * */
  useEffect(() => {
    getAirportList();
  }, []);

  const getAirportList = useCallback(() => {
    const requestParams = {
      type: '',
      keyword: '',
      page: pageNumber.current,
      size: pageSize.current,
    };
    setRequest(requestParams);
    commonApi
      .getAirportList(requestParams)
      .then((response) => {
        const { data, count, success } = response;
        let listData: DataTableRowType<AirPortCol>[] = [];
        if (success) {
          data?.content.forEach((element) => {
            listData.push(element);
          });
          setTotal(data?.totalElements === undefined ? 0 : data?.totalElements);
        } else {
          listData = [];
          console.log(`앱 버전 리스트 조회 실패`);
        }
        setDataTableRow(listData);
      })
      .catch((err) => console.log(err));
  }, []);

  const excelDown = () => {
    console.log('다운로드 클릭' + excel);
    const ws = excel?.utils?.json_to_sheet(rows);
    const wb = excel?.utils?.book_new();
    excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    excel?.writeFile(wb, '앱 버전 목록.xlsx');
  };

  const handleDeleteRow = (row: DataTableRowType<AirPortCol>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '공항 코드',
        message: '공항 코드를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          deleteAirlineCode(row);
        },
      }),
    );
    openCustomModal();
  };

  // 공항코드 삭제하기
  const deleteAirlineCode = (row: DataTableRowType<AirPortCol>) => {
    const code = row.code;
    commonApi.deleteAlineCode(code).then((response) => {
      const { success } = response;

      alert(`${success}`);
    });
  };
  return (
    <>
      <Head>
        <title>공항 코드</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['공통 코드', '공항 코드']} />
        <PageTitle
          title="공항 코드"
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
            title: '공항코드 추가',
            width: '106px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={airportCode.AIRPORT_CODE}
          rows={rows}
          onEdit={handleEditRow}
          onDelete={handleDeleteRow}
          isMenu
          paginationProps={{
            currentPage: request.page,
            limit: request.size,
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
      <AirportCodeModal
        isOpen={modal.isOpen}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
    </>
  );
};

export default withAdminLayout(MobilityStamp);
