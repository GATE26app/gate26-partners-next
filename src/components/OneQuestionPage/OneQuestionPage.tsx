import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { Question, QuestionColumnType } from './OneQuestionPage.data';
import AnswerModal from './_fragments/AnswerModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

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

const rows: DataTableRowType<QuestionColumnType>[] = [
  {
    type: '문의 유형',
    title: '문의 제목 ',
    content: '문의 내용',
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/c466/a46b/9659838dced1c10608c2819e8ce74474?Expires=1669593600&Signature=YviggbnRkPFqpjtY-e3RZikolmQU7VcDS1IEq3GUVED20C3qU~Nfmj3kDfFy11ZqpSQA4-gS5-POiMDqkW0ladIeIXMlQ1JE3CVsph6ZoOstlLf11bqVebOq3zxJLxVmhIpCMv-asgtwrZrqsXCI~zLgN7PmGbhBScucXixo0TmdOAgh02XDm1ugsEJKns5KZCfStPICJmS0IP3jeu3pigDJfCQtssRANGNF7a6T5mNpfZaoDNZoy7Q8dseTD--GkVBmAfGoT3BZoTf1peXmYO6QA1noqyoUK6b~tmKLfOfLFdyj1TziZy37KS1XMvJF7aoIn-ld-hEXbgoAoCd8xg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    answerYn: 1,
    answer: 1,
  },
  {
    type: '문의 유형',
    title: '문의 제목 ',
    content: '문의 내용',
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/c466/a46b/9659838dced1c10608c2819e8ce74474?Expires=1669593600&Signature=YviggbnRkPFqpjtY-e3RZikolmQU7VcDS1IEq3GUVED20C3qU~Nfmj3kDfFy11ZqpSQA4-gS5-POiMDqkW0ladIeIXMlQ1JE3CVsph6ZoOstlLf11bqVebOq3zxJLxVmhIpCMv-asgtwrZrqsXCI~zLgN7PmGbhBScucXixo0TmdOAgh02XDm1ugsEJKns5KZCfStPICJmS0IP3jeu3pigDJfCQtssRANGNF7a6T5mNpfZaoDNZoy7Q8dseTD--GkVBmAfGoT3BZoTf1peXmYO6QA1noqyoUK6b~tmKLfOfLFdyj1TziZy37KS1XMvJF7aoIn-ld-hEXbgoAoCd8xg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    answerYn: 0,
    answer: 0,
  },
  {
    type: '문의 유형',
    title: '문의 제목 ',
    content: '문의 내용',
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/c466/a46b/9659838dced1c10608c2819e8ce74474?Expires=1669593600&Signature=YviggbnRkPFqpjtY-e3RZikolmQU7VcDS1IEq3GUVED20C3qU~Nfmj3kDfFy11ZqpSQA4-gS5-POiMDqkW0ladIeIXMlQ1JE3CVsph6ZoOstlLf11bqVebOq3zxJLxVmhIpCMv-asgtwrZrqsXCI~zLgN7PmGbhBScucXixo0TmdOAgh02XDm1ugsEJKns5KZCfStPICJmS0IP3jeu3pigDJfCQtssRANGNF7a6T5mNpfZaoDNZoy7Q8dseTD--GkVBmAfGoT3BZoTf1peXmYO6QA1noqyoUK6b~tmKLfOfLFdyj1TziZy37KS1XMvJF7aoIn-ld-hEXbgoAoCd8xg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    answerYn: 1,
    answer: 1,
  },
];

function QuestionPage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);

  const [listModal, setListModal] = useState<ModalProps>({ isOpen: false });
  function handleClickListBtn(row: DataTableRowType<QuestionColumnType>) {
    setListModal({
      isOpen: true,
      type: row.answerYn as number,
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

  const handleCloseModal = () => setListModal({ isOpen: false });

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
