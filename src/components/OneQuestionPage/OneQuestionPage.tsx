import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as excel from 'xlsx';

import { Flex } from '@chakra-ui/react';

import CommonApi from '@apis/common/CommonApi';
import OneQuestionApi from '@apis/oneQuestion/OneQuestionApi';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import Question, { QuestionColumnType } from './OneQuestionPage.data';
import AnswerModal from './_fragments/AnswerModal';

import { List } from 'reselect/es/types';

interface ModalProps {
  isOpen: boolean;
  type?: number;
  targetId?: number;
}

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

let rows: DataTableRowType<QuestionColumnType>[] = [];

function QuestionPage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 0,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(0);

  const [listModal, setListModal] = useState<ModalProps>({ isOpen: false });

  const [keyword, setKeyword] = useState<string>('');

  const [type, setType] = useState<number>();

  const [inquiryTypeList, setInquiryTypeList] = useState<any>([
    {
      label: '전체',
      value: '',
    },
  ]);
  useEffect(() => {
    //첫 로드
    CommonApi.getCommonCodeById('parentCode', 'INQUIRY_TYPES')
      .then((response) => {
        const { message, data, success } = response;
        console.log(response);
        console.log(success);
        if (success) {
          console.log('commoncode');
          console.log(data);
          const typeList: any = [];
          const codeList: any = data?.content;
          typeList.push({
            label: '전체',
            value: undefined,
          });
          codeList.forEach((element: any) => {
            typeList.push({
              label: element?.codeValue,
              value: element?.codeId,
            });
          });
          console.log('>>>>>>>>>>>>>>' + typeList);
          setInquiryTypeList(typeList);
        }
      })
      .catch((err) => console.log(err));

    loadData();
  }, []);

  const loadData = () => {
    //데이터 초기화
    rows = [];

    let urlStr = `/backoffice/users/inquires?page=${request.page}&size=${request.limit}`;
    if (type == undefined && keyword !== '') {
      urlStr = `/backoffice/users/inquires?page=${request.page}&size=${request.limit}&keyword=${keyword}`;
    } else if (type !== undefined && keyword === '') {
      urlStr = `/backoffice/users/inquires?page=${request.page}&size=${request.limit}&inquireType=${type}`;
    }

    OneQuestionApi.getInquiryList(urlStr)
      .then((response) => {
        const { message, data, success } = response;
        console.log(response);
        if (success) {
          console.log(data);
          // setVisible(true);
          console.log('1:1문의 불러오기 성공');
          setTotal(data?.totalElements);
          const codeList: any = data?.content;
          rows = [];
          codeList.forEach((element: any, idx: number) => {
            console.log(element?.inquireImageUrl?.first);
            rows.push({
              id: idx,
              type: element?.inquireType,
              title: element?.inquireTitle,
              thumbnail: element?.inquireImageUrl?.first,
              isReplyDone: element?.isReplyDone,
              content: element?.inquireContent,
              answer: '',
            });
          });
        } else {
          // setVisible(false);
          console.log('1:1문의 불러오기 실패');
        }
      })
      .catch((err) => console.log(err));
  };

  function handleClickListBtn(row: DataTableRowType<QuestionColumnType>) {
    setListModal({
      isOpen: true,
      type: row.isReplyDone as number,
      targetId: row.id as number,
    });
  }
  const oneQuestion = new Question(handleClickListBtn);

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    console.log('변경: ', key, value);
    setRequest(newRequest);
  }

  useEffect(() => {
    //페이징 카운트 변경 시 재조회
    loadData();
  }, [request, type]);

  const handleCloseModal = () => setListModal({ isOpen: false });

  const excelDown = () => {
    console.log('다운로드 클릭' + excel);
    const ws = excel?.utils?.json_to_sheet(rows);
    const wb = excel?.utils?.book_new();
    excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    excel?.writeFile(wb, '문의목록.xlsx');
  };
  return (
    <>
      <Head>
        <title>1:1 문의</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['1:1 문의']} />
        <PageTitle
          title="1:1 문의"
          onClickDownload={() => excelDown()}
          isDownload
        />

        <TableTop
          total={total}
          search={{
            searchTypes: inquiryTypeList,
            keyword: '',
            onChangeLimit: (value: number) => handleChangeInput('limit', value),
            onChangeSearchType: (type: number) => {
              setType(type);
            },
            onChangeKeyword: (keyword: string) => {
              console.log('키워드');
              setKeyword(keyword);
            },
            onClickSearch: () => console.log('검색'),
          }}
        />
        <DataTable
          columns={oneQuestion.QUESTION_COL}
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
      <AnswerModal
        isOpen={listModal.isOpen}
        type={listModal.type}
        targetId={listModal.targetId}
        onClose={handleCloseModal}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
    </>
  );
}

export default withAdminLayout(QuestionPage);
