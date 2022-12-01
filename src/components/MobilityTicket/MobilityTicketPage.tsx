import Head from 'next/head';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { min } from 'lodash';

import { Flex } from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { Tiket, TiketCol } from './MobilityTicketPage.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}
interface ModalProps {
  isOpen: boolean;
  type?: 'atom' | 'regi' | 'refusal';
  targetId?: number;
}

const MobilityTicketPage = () => {
  const rows: DataTableRowType<TiketCol>[] = [
    {
      id: 1,
      ocr: 'https://s3-alpha-sig.figma.com/img/1d42/1a4f/e7eb32eb24c1e40b63100bc17f00145c?Expires=1669593600&Signature=JzdsTVUFc7kxNFpgjvmZT3NRq3T4ipoEYZKvUrZwhg2o-TrlHP3oFXmp1cgYCslNEsn5dCb1hHO4rrLVldQPaEmYstcYtfRxeNsowBCjp22wC~Vuh~uJov-xDAcgByvRKEzS0PMbSTXCO6sjCAwCcI0jlgzIbSOaWlWT-T~wTgC1GsceLo0LliBO7XrmoMpnthUZBW9EoZ6w~D6WSvTbThF5LZPPy2aVsbyGi-3C2OVNVnEp0skd4nzv1L8B~fy~Syfjz4W5PQDqn-VvZwxUdPj3oiROflNFtrbpuQCD~KOWb3mq6d06wxloAwqyQrsTNzU8rWZ2r1W0dk79YRlU5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      airLineName: 'OZ 400',
      flightName: '프로 여행가이드',
      start: '인천',
      end: '런던',
      startDt: '2022-07-10 오전 11:50',
      endDt: '2022-07-11 오후 18:50',
      state: 0,
    },
    {
      id: 1,
      ocr: 'https://s3-alpha-sig.figma.com/img/1d42/1a4f/e7eb32eb24c1e40b63100bc17f00145c?Expires=1669593600&Signature=JzdsTVUFc7kxNFpgjvmZT3NRq3T4ipoEYZKvUrZwhg2o-TrlHP3oFXmp1cgYCslNEsn5dCb1hHO4rrLVldQPaEmYstcYtfRxeNsowBCjp22wC~Vuh~uJov-xDAcgByvRKEzS0PMbSTXCO6sjCAwCcI0jlgzIbSOaWlWT-T~wTgC1GsceLo0LliBO7XrmoMpnthUZBW9EoZ6w~D6WSvTbThF5LZPPy2aVsbyGi-3C2OVNVnEp0skd4nzv1L8B~fy~Syfjz4W5PQDqn-VvZwxUdPj3oiROflNFtrbpuQCD~KOWb3mq6d06wxloAwqyQrsTNzU8rWZ2r1W0dk79YRlU5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      airLineName: 'OZ 400',
      flightName: '프로 여행가이드',
      start: '인천',
      end: '런던',
      startDt: '2022-07-10 오전 11:50',
      endDt: '2022-07-11 오후 18:50',
      state: 1,
    },
    {
      id: 1,
      ocr: 'https://s3-alpha-sig.figma.com/img/1d42/1a4f/e7eb32eb24c1e40b63100bc17f00145c?Expires=1669593600&Signature=JzdsTVUFc7kxNFpgjvmZT3NRq3T4ipoEYZKvUrZwhg2o-TrlHP3oFXmp1cgYCslNEsn5dCb1hHO4rrLVldQPaEmYstcYtfRxeNsowBCjp22wC~Vuh~uJov-xDAcgByvRKEzS0PMbSTXCO6sjCAwCcI0jlgzIbSOaWlWT-T~wTgC1GsceLo0LliBO7XrmoMpnthUZBW9EoZ6w~D6WSvTbThF5LZPPy2aVsbyGi-3C2OVNVnEp0skd4nzv1L8B~fy~Syfjz4W5PQDqn-VvZwxUdPj3oiROflNFtrbpuQCD~KOWb3mq6d06wxloAwqyQrsTNzU8rWZ2r1W0dk79YRlU5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      airLineName: 'OZ 400',
      flightName: '프로 여행가이드',
      start: '인천',
      end: '런던',
      startDt: '2022-07-10 오전 11:50',
      endDt: '2022-07-11 오후 18:50',
      state: 2,
    },
  ];
  const [total, setTotal] = useState<number>(100);
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const tiket = new Tiket(handleChangeInput);
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const { openCustomModal } = useCustomModalHandlerContext();
  const [isMenuState, setMenuState] = useState();
  const dispatch = useDispatch();
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    console.log('변경: ', key, value);
    setRequest(newRequest);
  }
  //대기
  const handleAtom = (row: DataTableRowType<TiketCol>) => {
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'atom', targetId: row.id as number });
  };

  //거절
  const handleRefusal = (row: DataTableRowType<TiketCol>) => {
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'regi', targetId: row.id as number });
  };

  //등록
  const handleRegi = (row: DataTableRowType<TiketCol>) => {
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'refusal', targetId: row.id as number });
  };
  return (
    <>
      <Head>
        <title>스탬프러리 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['모빌리티', '항공권 인증']} />
        <PageTitle
          title="항공권 인증"
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
          columns={tiket.TIP_COLUMNS}
          rows={rows}
          isMenu
          onRegister={handleRegi}
          onRefusal={handleRefusal}
          onAtom={handleAtom}
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

export default withAdminLayout(MobilityTicketPage);
