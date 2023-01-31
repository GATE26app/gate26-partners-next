import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as excel from 'xlsx';

import { Flex, useToast } from '@chakra-ui/react';

import airlineCodeApi, { AirlineCodeApi } from '@apis/airline/AirlineCodeApi';
import { AirlineRequestDTOType } from '@apis/airline/AirlineCodeApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { AirLineCode, AirLineCol } from './AirLineCode.data';
import AirLineCodeModal from './_fragments/AirLineCodeModal';

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

let rows: DataTableRowType<AirLineCol>[] = [];

const AirlineCodePage = () => {
  const toast = useToast();
  const [total, setTotal] = useState<number>(100);
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 0,
    limit: 10,
  });
  const { openCustomModal } = useCustomModalHandlerContext();
  const stamp = new AirLineCode(handleChangeInput);
  const handleEditRow = (row: DataTableRowType<AirLineCol>) => {
    console.log(row.id);
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.id as number });
  };
  const handleCloseModal = () => setModal({ isOpen: false });
  const dispatch = useDispatch();
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  const handleDeleteRow = (row: DataTableRowType<AirLineCol>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '항공사 코드',
        message: '항공사 코드를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          console.log('삭제 처리:', row);
          handleAirlineCodeDelete(row?.id);
        },
      }),
    );
    openCustomModal();
  };

  const handleAirlineCodeDelete = (tgId: any) => {
    airlineCodeApi
      .deleteAirlineCode(tgId)
      .then(({ success }) => {
        const newRequest = { ...request };
        if (success) {
          //삭제했을때 현재 페이지에 요소가 없고 첫번째 페이지가 아닐경우 페이지 -1
          if (rows && rows.length - 1 === 0 && newRequest.page)
            newRequest.page -= 1;

          loadData();
          toast({
            description: '삭제 성공',
          });
        } else {
          toast({ description: '삭제 실패' });
        }
      })
      .catch(() => {
        toast({ description: '삭제 실패' });
      });
  };

  const [keyword, setKeyword] = useState<string>('');

  const [type, setType] = useState<number>();

  const [lastPage, setLastPage] = useState<number>(0);

  const [typeList, setTypeList] = useState<any>([
    {
      label: '전체',
      value: undefined,
    },
    {
      label: '코드',
      value: 'code',
    },
    {
      label: '이름',
      value: 'name',
    },
  ]);

  useEffect(() => {
    //첫 로드
    loadData();
  }, []);

  const loadData = () => {
    const params: AirlineRequestDTOType = {
      type: type,
      keyword: keyword,
      page: request?.page,
      size: request?.limit,
    };

    airlineCodeApi
      .getAirlineCodeList(params)
      .then((response) => {
        const { message, data, success } = response;
        console.log(response);
        if (success) {
          console.log(data);
          console.log('항공사 불러오기 성공');
          //총 개수
          setTotal(data?.totalElements);
          setLastPage(data?.totalPages);
          rows = [];
          const codeList: any = data?.content;
          codeList.forEach((element: any) => {
            rows.push({
              id: element?.airlineId,
              nameKr: element?.name,
              nameEng: element?.englishName,
              iata: element?.airlineId,
              icao: element?.airlineCode,
              imageUrl: element?.imageUrl,
              pageUrl: element?.homepageUrl,
              selfUrl: element?.selfCheckInUrl,
              dutyUrl: element?.dutyFreeShopUrl,
              repNum: element?.phoneNumber,
              korYn: element?.domestic,
              answer: element?.useYn,
            });
          });
        } else {
          toast({ description: '항공사 불러오기 실패' });
        }
      })
      .catch(() => {
        toast({ description: '항공사 불러오기 실패' });
      });
  };

  function handleChangeInput(key: string, value: string | number | boolean) {
    const newRequest = { ...request, [key]: value };

    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.page = 0;
    }

    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.page < 0) {
      newRequest.page = 0;
    }

    //페이지가 마지막 페이지보다 큰 경우 마지막 페이지로 세팅
    if (newRequest.page >= lastPage - 1) {
      newRequest.page = lastPage - 1;
    }
    console.log('변경: ', key, value);
    setRequest(newRequest);
  }

  useEffect(() => {
    //페이징 카운트 & 조회 조건 변경 시 재조회
    loadData();
  }, [request]);

  const excelDown = () => {
    console.log('다운로드 클릭' + excel);
    const ws = excel?.utils?.json_to_sheet(rows);
    const wb = excel?.utils?.book_new();
    excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    excel?.writeFile(wb, '항공사코드.xlsx');
  };

  return (
    <>
      <Head>
        <title>항공사 코드</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['공통 코드', '항공사 코드']} />
        <PageTitle
          title="항공사 코드"
          onClickDownload={() => excelDown()}
          isDownload
        />
        <TableTop
          total={total}
          search={{
            searchTypes: typeList,
            keyword: keyword,
            onChangeLimit: (value: number) => handleChangeInput('limit', value),
            onChangeSearchType: (type: number) => {
              setType(type);
            },
            onChangeKeyword: (keyword: string) => {
              console.log('키워드');
              setKeyword(keyword);
            },
            onClickSearch: () => {
              console.log('검색');
              loadData();
            },
          }}
          createButton={{
            title: '항공사 코드 추가',
            width: '116px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={stamp.STAMP_COLUMNS}
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
      <AirLineCodeModal
        isOpen={modal.isOpen}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={() => loadData()}
      />
    </>
  );
};

export default withAdminLayout(AirlineCodePage);
