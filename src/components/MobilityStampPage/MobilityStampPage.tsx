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

import { Stamp, StampCol } from './MobilityStamp.data';

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

const rows: DataTableRowType<StampCol>[] = [
  {
    id: 1,
    type: '챌린지',
    title: '프로 여행가이드',
    info: '-',
    image:
      'https://s3-alpha-sig.figma.com/img/1d42/1a4f/e7eb32eb24c1e40b63100bc17f00145c?Expires=1669593600&Signature=JzdsTVUFc7kxNFpgjvmZT3NRq3T4ipoEYZKvUrZwhg2o-TrlHP3oFXmp1cgYCslNEsn5dCb1hHO4rrLVldQPaEmYstcYtfRxeNsowBCjp22wC~Vuh~uJov-xDAcgByvRKEzS0PMbSTXCO6sjCAwCcI0jlgzIbSOaWlWT-T~wTgC1GsceLo0LliBO7XrmoMpnthUZBW9EoZ6w~D6WSvTbThF5LZPPy2aVsbyGi-3C2OVNVnEp0skd4nzv1L8B~fy~Syfjz4W5PQDqn-VvZwxUdPj3oiROflNFtrbpuQCD~KOWb3mq6d06wxloAwqyQrsTNzU8rWZ2r1W0dk79YRlU5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    answer: '사용',
  },
  {
    id: 2,
    type: '항공사',
    title: '카고룩스 이탈리아 항공',
    info: '카고룩스 이탈리아 항공 도착 시 얻을 수 있는 스탬프러리입니다.',
    image:
      'https://s3-alpha-sig.figma.com/img/1d42/1a4f/e7eb32eb24c1e40b63100bc17f00145c?Expires=1669593600&Signature=JzdsTVUFc7kxNFpgjvmZT3NRq3T4ipoEYZKvUrZwhg2o-TrlHP3oFXmp1cgYCslNEsn5dCb1hHO4rrLVldQPaEmYstcYtfRxeNsowBCjp22wC~Vuh~uJov-xDAcgByvRKEzS0PMbSTXCO6sjCAwCcI0jlgzIbSOaWlWT-T~wTgC1GsceLo0LliBO7XrmoMpnthUZBW9EoZ6w~D6WSvTbThF5LZPPy2aVsbyGi-3C2OVNVnEp0skd4nzv1L8B~fy~Syfjz4W5PQDqn-VvZwxUdPj3oiROflNFtrbpuQCD~KOWb3mq6d06wxloAwqyQrsTNzU8rWZ2r1W0dk79YRlU5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    answer: '-',
  },
  {
    id: 3,
    type: '국가',
    title: '아랍에미리트',
    info: '아랍에미리트 도착 시 얻을 수 있는 스탬프러리입니다.',
    image:
      'https://s3-alpha-sig.figma.com/img/1d42/1a4f/e7eb32eb24c1e40b63100bc17f00145c?Expires=1669593600&Signature=JzdsTVUFc7kxNFpgjvmZT3NRq3T4ipoEYZKvUrZwhg2o-TrlHP3oFXmp1cgYCslNEsn5dCb1hHO4rrLVldQPaEmYstcYtfRxeNsowBCjp22wC~Vuh~uJov-xDAcgByvRKEzS0PMbSTXCO6sjCAwCcI0jlgzIbSOaWlWT-T~wTgC1GsceLo0LliBO7XrmoMpnthUZBW9EoZ6w~D6WSvTbThF5LZPPy2aVsbyGi-3C2OVNVnEp0skd4nzv1L8B~fy~Syfjz4W5PQDqn-VvZwxUdPj3oiROflNFtrbpuQCD~KOWb3mq6d06wxloAwqyQrsTNzU8rWZ2r1W0dk79YRlU5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
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
  const stamp = new Stamp(handleChangeInput);
  const handleEditRow = (row: DataTableRowType<StampCol>) => {
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
  const handleDeleteRow = (row: DataTableRowType<StampCol>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '스탬프러리 관리',
        message: '스탬프러리를 삭제 하시겠습니까?',
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
        <title>스탬프러리 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['모빌리티', '스탬프러리 관리']} />
        <PageTitle
          title="스탬프러리 관리"
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
            title: '스탬프러리 추가',
            width: '113px',
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
    </>
  );
};

export default withAdminLayout(MobilityStamp);
