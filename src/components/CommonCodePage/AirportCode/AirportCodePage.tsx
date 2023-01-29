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

// 기본 페이징 Props
interface ReqLoungeProps {
  keyword?: string;
  type?: string;
  page: number;
  size: number;
}

// 모달용 Props
interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: number;
}

const MobilityStamp = () => {
  // 검색 구분
  const searchTypeList = [
    { value: 0, label: '전체' },
    { value: 1, label: '공항명' },
    { value: 2, label: '코드' },
    { value: 3, label: '라운지 위치' },
    { value: 4, label: '사용여부' },
  ];

  // 총 페이지 Num
  const pageNumber = useRef(0);
  const setPage = (value: number) => {
    pageNumber.current = value;
  };

  // default 페이지 사이즈 10
  const pageSize = useRef(10);
  const setPageSize = (value: number) => {
    pageSize.current = value;
  };

  const searchType = useRef('');
  const setSearchType = (value: number) => {
    switch (value) {
      case 1:
        searchType.current = 'name'; // 이름 검색
        return;
      case 2:
        searchType.current = 'code'; // 닉네임 검색
        return;
      default: // 전체 검색
        searchType.current = '';
        return;
    }
  };

  const keyword = useRef('');
  const setKeyword = (value: string) => {
    console.log(`value ${value}`);
    keyword.current = value;
  };

  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 0,
    size: 10,
  });

  const [rows, setDataTableRow] = useState<DataTableRowType<AirPortCol>[]>([]);

  // 총 건수
  const [total, setTotal] = useState<number>(0);
  const airportCode = new AirportCode(handleChangeInput);

  const { openCustomModal } = useCustomModalHandlerContext();

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

  useEffect(() => {
    getAirportList();
  }, [modal.type]);

  const handleClickComplete = () => {
    console.log('aaaa');
    setModal({ isOpen: false, type: 'create' });
  };

  const getAirportList = useCallback(() => {
    const requestParams = {
      type: searchType.current,
      keyword: keyword.current,
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
    excel?.writeFile(wb, '공항 코드 목룍.xlsx');
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
          onClickDownload={() => excelDown()}
          isDownload
        />
        <TableTop
          total={total}
          search={{
            searchTypes: searchTypeList,
            keyword: request.keyword as string,
            onChangeLimit: (value: number) => handleChangeInput('limit', value),
            onChangeSearchType: (type: number) => {
              handleChangeInput('type', type);
            },
            onChangeKeyword: (keyword: string) => {
              handleChangeInput('keyword', keyword);
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
        onComplete={handleClickComplete}
      />
    </>
  );
};

export default withAdminLayout(MobilityStamp);
