import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import * as excel from 'xlsx';
import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { UserReportColumnType, UserReportColumns } from './UserReportPage.data';
import userReportApi from '@apis/userReport/UserReportApi';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}


function UserReportPage() {
  const excelDown = () => {
    console.log('다운로드 클릭' + excel);
    const ws = excel?.utils?.json_to_sheet(rows);
    const wb = excel?.utils?.book_new();
    excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    excel?.writeFile(wb, '신고 목록.xlsx');
  };
  const pageNumber = useRef(0);
  const setPage = (value: number) => {
    pageNumber.current = value;
  };

  const pageSize = useRef(10);
  const setPageSize = (value: number) => {
    pageSize.current = value;
  }

  const searchType = useRef('user');
  const setSearchType = (value: number) => {
    switch (value) {
      case 1:
        searchType.current = 'accompany'; // 상위 코드 검색
        return;
      case 2:
        searchType.current = 'post'; // 코드 검색
        return;
      case 3:
        searchType.current = 'tip'; // 코드 검색
        return;
      case 4:
        searchType.current = 'message'; // 코드 검색
        return;
      default:
        searchType.current = 'user'; // 전체 검색
        return;
    }
  };
  const [rows, setRows]=useState<DataTableRowType<UserReportColumnType>[]>([]);
  const keyword = useRef('');
  const setKeyword = (value: string) => {keyword.current = value};

  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 0,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);

  const userColumns = new UserReportColumns(handleChangeInput);

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'searchType') {
      setSearchType(value as number);
      getReportInfo(searchType.current);
    } 
    else {
      if(key === 'page') {
        setPage(value as number);
      } else if (key === 'limit') {
        setPage(0);
        setPageSize(value as number);
      } else if (key === 'keyword') {
        setKeyword(value as  string);
      }
      setRequest(newRequest);
      getReportInfo(searchType.current);
    }
  }
  const getTypeFromCategory = (category:string) => {
    switch(category){
      case category='user':
        return '유저 신고';
      case category='accompany':
        return '동행 신고';
      case category='post':
        return '게시물 신고';
      case category='tip':
        return '여행팁 신고';
      case category='message':
        return '채팅 메세지 신고';
      default:
        return '';
    }
  }
  const getReportInfo = useCallback((category : string) => {
    const params = { page: pageNumber.current, limit: pageSize.current,
      keyword: keyword.current
    };
    setRequest(params);
    setRows([]);
    console.log("params:",params);
    userReportApi.getReportInfo(params,category).then((response) => {
      const { success, data, message } = response;
      if (data) {
        console.log(data.content.length);
        let count = 0;
        data.content.map((iter) => {
          count++;
          const obj :DataTableRowType<UserReportColumnType> = { 
            'id': count,
            'category': getTypeFromCategory(category) , 
            'reason': iter.descText,
            'reporterEmail' : iter.reportEmailAddress,
            'reporterName' : iter.reportNickName,
            'targetEmail': iter.targetEmailAddress,
            'targetName': iter.targetNickName,
            'reportedAt': iter.createdDate
          };
          setRows(row => [...row, obj])
        })
        setTotal(data.totalElements ? data.totalElements : 0);
      } else {
        setRows([]);
        console.log(message);
      }
        }).catch((err) => console.log(err));
    },[]);
  
  
  // // useEffect 최초 호출
  useEffect(() => {
    getReportInfo(searchType.current);
  }, []);
  return (
    <>
      <Head>
        <title>신고 조회</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['이용자', '신고 조회']} />
        <PageTitle
          title="신고 조회"
          onClickDownload={() => excelDown()}
          onClickAllDownload={() => excelDown()}
          isDownload
          isAllDownLoad
        />

        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '유저' },
              { value: 1, label: '동행' },
              { value: 2, label: '게시물' },
              { value: 3, label: '여행팁' },
              { value: 4, label: '메세지' },
            ],
            keyword: request.keyword as string,
            onChangeLimit: (value: number) => handleChangeInput('limit', value),
            onChangeSearchType: (type: number) => {
              handleChangeInput('searchType', type);
            },
            onChangeKeyword: (keyword: string) => {
              handleChangeInput('keyword', keyword);
            },
            onClickSearch: () => console.log('검색'),
          }}
        />
        <DataTable
          columns={userColumns.LIST_COLUMNS}
          rows={rows}
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
}

export default withAdminLayout(UserReportPage);
