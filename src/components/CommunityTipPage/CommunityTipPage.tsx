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

import { CommunityTip, TipColumnType } from './CommunityTipPage.data';
import TipDetailModal from './_fragments/TipDetailModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: number;
}

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

const rows: DataTableRowType<TipColumnType>[] = [
  {
    id: 1,
    title: '나만 아는 인생샷 스팟은 어디인가요?',
    home: 'https://s3-alpha-sig.figma.com/img/c466/a46b/9659838dced1c10608c2819e8ce74474?Expires=1669593600&Signature=YviggbnRkPFqpjtY-e3RZikolmQU7VcDS1IEq3GUVED20C3qU~Nfmj3kDfFy11ZqpSQA4-gS5-POiMDqkW0ladIeIXMlQ1JE3CVsph6ZoOstlLf11bqVebOq3zxJLxVmhIpCMv-asgtwrZrqsXCI~zLgN7PmGbhBScucXixo0TmdOAgh02XDm1ugsEJKns5KZCfStPICJmS0IP3jeu3pigDJfCQtssRANGNF7a6T5mNpfZaoDNZoy7Q8dseTD--GkVBmAfGoT3BZoTf1peXmYO6QA1noqyoUK6b~tmKLfOfLFdyj1TziZy37KS1XMvJF7aoIn-ld-hEXbgoAoCd8xg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    banner:
      'https://s3-alpha-sig.figma.com/img/1d42/1a4f/e7eb32eb24c1e40b63100bc17f00145c?Expires=1669593600&Signature=JzdsTVUFc7kxNFpgjvmZT3NRq3T4ipoEYZKvUrZwhg2o-TrlHP3oFXmp1cgYCslNEsn5dCb1hHO4rrLVldQPaEmYstcYtfRxeNsowBCjp22wC~Vuh~uJov-xDAcgByvRKEzS0PMbSTXCO6sjCAwCcI0jlgzIbSOaWlWT-T~wTgC1GsceLo0LliBO7XrmoMpnthUZBW9EoZ6w~D6WSvTbThF5LZPPy2aVsbyGi-3C2OVNVnEp0skd4nzv1L8B~fy~Syfjz4W5PQDqn-VvZwxUdPj3oiROflNFtrbpuQCD~KOWb3mq6d06wxloAwqyQrsTNzU8rWZ2r1W0dk79YRlU5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    category: '인생샷스팟',
    show: 0,
  },
  {
    id: 2,
    title: '나만 아는 인생샷 스팟은 어디인가요?',
    home: 'https://s3-alpha-sig.figma.com/img/c466/a46b/9659838dced1c10608c2819e8ce74474?Expires=1669593600&Signature=YviggbnRkPFqpjtY-e3RZikolmQU7VcDS1IEq3GUVED20C3qU~Nfmj3kDfFy11ZqpSQA4-gS5-POiMDqkW0ladIeIXMlQ1JE3CVsph6ZoOstlLf11bqVebOq3zxJLxVmhIpCMv-asgtwrZrqsXCI~zLgN7PmGbhBScucXixo0TmdOAgh02XDm1ugsEJKns5KZCfStPICJmS0IP3jeu3pigDJfCQtssRANGNF7a6T5mNpfZaoDNZoy7Q8dseTD--GkVBmAfGoT3BZoTf1peXmYO6QA1noqyoUK6b~tmKLfOfLFdyj1TziZy37KS1XMvJF7aoIn-ld-hEXbgoAoCd8xg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    banner:
      'https://s3-alpha-sig.figma.com/img/1d42/1a4f/e7eb32eb24c1e40b63100bc17f00145c?Expires=1669593600&Signature=JzdsTVUFc7kxNFpgjvmZT3NRq3T4ipoEYZKvUrZwhg2o-TrlHP3oFXmp1cgYCslNEsn5dCb1hHO4rrLVldQPaEmYstcYtfRxeNsowBCjp22wC~Vuh~uJov-xDAcgByvRKEzS0PMbSTXCO6sjCAwCcI0jlgzIbSOaWlWT-T~wTgC1GsceLo0LliBO7XrmoMpnthUZBW9EoZ6w~D6WSvTbThF5LZPPy2aVsbyGi-3C2OVNVnEp0skd4nzv1L8B~fy~Syfjz4W5PQDqn-VvZwxUdPj3oiROflNFtrbpuQCD~KOWb3mq6d06wxloAwqyQrsTNzU8rWZ2r1W0dk79YRlU5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    category: '인생샷스팟',
    show: 1,
  },
  {
    id: 3,
    title: '나만 아는 인생샷 스팟은 어디인가요?',
    home: 'https://s3-alpha-sig.figma.com/img/c466/a46b/9659838dced1c10608c2819e8ce74474?Expires=1669593600&Signature=YviggbnRkPFqpjtY-e3RZikolmQU7VcDS1IEq3GUVED20C3qU~Nfmj3kDfFy11ZqpSQA4-gS5-POiMDqkW0ladIeIXMlQ1JE3CVsph6ZoOstlLf11bqVebOq3zxJLxVmhIpCMv-asgtwrZrqsXCI~zLgN7PmGbhBScucXixo0TmdOAgh02XDm1ugsEJKns5KZCfStPICJmS0IP3jeu3pigDJfCQtssRANGNF7a6T5mNpfZaoDNZoy7Q8dseTD--GkVBmAfGoT3BZoTf1peXmYO6QA1noqyoUK6b~tmKLfOfLFdyj1TziZy37KS1XMvJF7aoIn-ld-hEXbgoAoCd8xg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    banner:
      'https://s3-alpha-sig.figma.com/img/1d42/1a4f/e7eb32eb24c1e40b63100bc17f00145c?Expires=1669593600&Signature=JzdsTVUFc7kxNFpgjvmZT3NRq3T4ipoEYZKvUrZwhg2o-TrlHP3oFXmp1cgYCslNEsn5dCb1hHO4rrLVldQPaEmYstcYtfRxeNsowBCjp22wC~Vuh~uJov-xDAcgByvRKEzS0PMbSTXCO6sjCAwCcI0jlgzIbSOaWlWT-T~wTgC1GsceLo0LliBO7XrmoMpnthUZBW9EoZ6w~D6WSvTbThF5LZPPy2aVsbyGi-3C2OVNVnEp0skd4nzv1L8B~fy~Syfjz4W5PQDqn-VvZwxUdPj3oiROflNFtrbpuQCD~KOWb3mq6d06wxloAwqyQrsTNzU8rWZ2r1W0dk79YRlU5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    category: '인생샷스팟',
    show: 1,
  },
];

function CommunityTipPage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const communityTip = new CommunityTip(handleChangeInput);

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    console.log('변경: ', key, value);
    setRequest(newRequest);
  }

  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  const handleEditRow = (row: DataTableRowType<TipColumnType>) => {
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.id as number });
  };

  const handleCloseModal = () => setModal({ isOpen: false });

  const handleDeleteRow = (row: DataTableRowType<TipColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '여행팁',
        message: '여행팁을 삭제 하시겠습니까?',
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
        <title>여행팁 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['커뮤니티', '여행팁 관리']} />
        <PageTitle
          title="여행팁 관리"
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
            title: '여행팁 추가',
            width: '93px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={communityTip.TIP_COLUMNS}
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
      <TipDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
    </>
  );
}

export default withAdminLayout(CommunityTipPage);
