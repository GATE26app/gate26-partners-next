import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { ManageCode, MenageCol } from './ManagementCode.data';
import CodeManagementModal from './_fragments/ManagementCodeModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
import managementCodeApi from '@apis/commoncode/ManagementCodeApi';

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
  // 데이터 타입 정의 
  const pageNumber = useRef(0);
  const setPage = (value: number) => {
    pageNumber.current = value;
  };

  const pageSize = useRef(10);
  const setPageSize = (value: number) => {
    pageSize.current = value;
  }
  const [rows, setRows]=useState<DataTableRowType<MenageCol>[]>([]);

  const [total, setTotal] = useState<number>(0);
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 0,
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
  const handleCloseModal = () => setModal({ isOpen: false });
  const dispatch = useDispatch();
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      setPage(0);
      setPageSize(value as number);
      
    } else if(key === 'page') {
      setPage(value as number);
    }
    setRequest(newRequest);
    getCommonCodeInfoPagin();
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

// // 페이징 API 불러오기 
const getCommonCodeInfoPagin = useCallback(() => {
  let params = { page: pageNumber.current, size: pageSize.current

  };
  console.log("params:",params);
  managementCodeApi.getCommonCode(params).then((response) => {
        const { success, data, message } = response;
        // let listData: DataTableRowType<MenageCol>[]=[];
        setRows([]);
        if (data) {
          console.log(data.content.length);
          data.content.map((iter) => {
            const obj :DataTableRowType<MenageCol> = { 'id': iter.codeId,
            'code': iter.codeName, 
            'codeValue': iter.codeValue,'info': iter.descText
            };
            // listData.push(obj);
            setRows(row => [...row, obj])
          })
          // setRows(listData);
          setTotal(data.totalElements ? data.totalElements : 0);
        } else {
          console.log(message);
        }
      });
},[]);

// // useEffect 최초 호출
useEffect(() => {
  getCommonCodeInfoPagin();
}, []);

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
      <CodeManagementModal
        isOpen={modal.isOpen}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
    </>
  );
};

export default withAdminLayout(ManagementCode);
