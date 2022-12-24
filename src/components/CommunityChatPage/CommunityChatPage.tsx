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

import { CHAT_COLUMNS, ChatColumnType } from './CommunityChatPage.data';
import ChatDetailModal from './_fragments/ChatDetailModal';

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

const rows: DataTableRowType<ChatColumnType>[] = [
  {
    id: 1,
    title: '이탈리아 라운지',
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/7ebf/ba66/4da17fddb067f82c8cb5e779dd5af0eb?Expires=1669593600&Signature=ZZZd7tBdWAGpOexfvcYAq3eSL1UfFJcW9jUv~2lCGw6MqJK~TeMmqOYCypt8XPoPLSx-Juh0-gz-MpWVBWObdCDJO5qTVzzJ--~yQTXH5xNd0mT724cp0f4AbPAE0acXUGQM0qv7uSh8XTsw-0rs2OFx5TrDL2Su63hBeLoIVpbqf7o2Zm57HFkJZKn~69-gyj1Eu39XizP-ZJ5vEWdNAGvcuo8ftT7vEHz81rvhD2GOVDSoFJTUUdvfL0GOyqSSg1GpzHtMs9taR3UK2tvInwhZw81VkXvg9M8frZkFYVA7FR2sqV3cIOXuAp76VG3M2i7-~t8LBLoVgHx549R0Ww__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    location: '유럽',
  },
  {
    id: 2,
    title: '네덜란드 라운지',
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/81b4/2a5f/4639b9c0568ce8f8be20a16fac2c506a?Expires=1669593600&Signature=PLM-o5W2H3gqo9nV3YOyV-43bDPXG9CDjkh~z9pKT3luqPiEgNOV9UPhOV1Jor1cUzkZ7ybxbS4wK36P96swO~XHNfz7Yv1Iu5i4zYnl2A9CnHn30hHpofVdSXF2663b-~ZabTcu-pgU7QMd5YugSEk6O4nTgg4~6bWPgsn4L0TTVLFx0Dnmo3yV8PL6Gz557TR6zJavnIYBs5VKbnf0-kcz4pzUVE0sS5gOTNjb6GEfnApk0xS6NRXG3oRrqWO5mfcCphePnJrnpZbGnDxsQiu8B5bxMkNG~48XiFeBhTfYxq61bYQ6vYtM9XbdGu~mAOuX9gXjBRebkdz564UORA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    location: '유럽',
  },
  {
    id: 1,
    title: '프랑스 라운지',
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/ba56/ae63/d2d207572cb351165db62dc4461edb5e?Expires=1669593600&Signature=dMfeMz9ygoMFNUY5kyKL~s0xX8-fqhzA5NVzxQ68cEkuqA-zsgtZk9OuDPtcjSGmZ7~onkQZebk2HHs~F4hphGUjmLKI9E0lnmEfYdngb8c9Gkv8Wooxz3-0zAHyuZANWpbWhPC2rDMHe7p3MYYwf5mDRG0K0o55DvUtqj7A-X~ZdGeTRIqCUfJgmxEtDLEH9AH12OWYb9c2KL6xHtVf59gQEgmh2JNg0JhOzcw-k1dD7V9GlhMevunSxVulSTy88VpGaY4KnOdzkCsY5cGg2AI--O~ouDseAXg6fU7gjgxttyqLI6RBPd7iQmEo8xmV1qKxqZPF3m5NbwkRp7FymA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    location: '유럽',
  },
];

function CommunityChatPage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const handleChangeInput = (key: string, value: string | number) => {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    setRequest(newRequest);
  };

  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  const handleEditRow = (row: DataTableRowType<ChatColumnType>) => {
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.id as number });
  };

  const handleCloseModal = () => setModal({ isOpen: false });

  const handleDeleteRow = (row: DataTableRowType<ChatColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '오픈채팅',
        message: '오픈채팅을 삭제 하시겠습니까?',
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
        <title>오픈채팅 관리</title>
      </Head>
      <Flex
        className="community-chat-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['커뮤니티', '오픈채팅 관리']} />
        <PageTitle
          title="오픈채팅 관리"
          onClickDownload={() => console.log('다운로드 클릭')}
          isDownload
        />

        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '채팅명' },
              { value: 2, label: '라운지 위치' },
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
            title: '오픈채팅 추가',
            width: '103px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={CHAT_COLUMNS}
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
      <ChatDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
    </>
  );
}

export default withAdminLayout(CommunityChatPage);
