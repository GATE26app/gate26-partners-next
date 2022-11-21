import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { CommunityEvent, EventColumnType } from './CommunityEventPage.data';
import EventDetailModal from './_fragments/EventDetailModal';
import EventParticipantModal from './_fragments/EventParticipantModal';

// import TipDetailModal from './_fragments/TipDetailModal';
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

const rows: DataTableRowType<EventColumnType>[] = [
  {
    id: 1,
    title: '게이트이륙 회원가입 이벤트',
    event_content: 'http://www.event.com/',
    type: 'URL',
    start: dayjs(),
    end: dayjs(),
    banner:
      'https://s3-alpha-sig.figma.com/img/af4b/91de/f5c79c9f02500423d1e862608324acde?Expires=1670198400&Signature=SKieLP4jZEQuNHL7T8d2hke96TJQAaAOekCym0g~rGBrdZw1JV2SGLJ1gORDhuHoT3dTZn~BapvcS9gTpSHmTHd1ED3qkZgXKco96ialdTVZKJgJB7pPVJovX0rI5y3kpvarOWWmAYgSc7qpzTon-0n~wMokAk5fF4M-50tbaSAiMgNc~6Va981iy3Ay4GKPmj-vzwhRvfYHROtMR6NiyYnduXOjB6WBoghaXi-EqPGj4B1mGRJWfxrFVBJk9Yt4Z0LXCGmLN01VES9E88XA1WIvBK~k2naYZ0hPCsqPV9gXn6cs-~7b4mywjqNm0mb-Nx~YFzkuZhs-o2pFw2y~QA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    main_img:
      'https://s3-alpha-sig.figma.com/img/af4b/91de/f5c79c9f02500423d1e862608324acde?Expires=1670198400&Signature=SKieLP4jZEQuNHL7T8d2hke96TJQAaAOekCym0g~rGBrdZw1JV2SGLJ1gORDhuHoT3dTZn~BapvcS9gTpSHmTHd1ED3qkZgXKco96ialdTVZKJgJB7pPVJovX0rI5y3kpvarOWWmAYgSc7qpzTon-0n~wMokAk5fF4M-50tbaSAiMgNc~6Va981iy3Ay4GKPmj-vzwhRvfYHROtMR6NiyYnduXOjB6WBoghaXi-EqPGj4B1mGRJWfxrFVBJk9Yt4Z0LXCGmLN01VES9E88XA1WIvBK~k2naYZ0hPCsqPV9gXn6cs-~7b4mywjqNm0mb-Nx~YFzkuZhs-o2pFw2y~QA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    location: '홈',
    order: 2,
  },
  {
    id: 2,
    title: '게이트이륙 회원가입 이벤트',
    event_content:
      'https://s3-alpha-sig.figma.com/img/af4b/91de/f5c79c9f02500423d1e862608324acde?Expires=1670198400&Signature=SKieLP4jZEQuNHL7T8d2hke96TJQAaAOekCym0g~rGBrdZw1JV2SGLJ1gORDhuHoT3dTZn~BapvcS9gTpSHmTHd1ED3qkZgXKco96ialdTVZKJgJB7pPVJovX0rI5y3kpvarOWWmAYgSc7qpzTon-0n~wMokAk5fF4M-50tbaSAiMgNc~6Va981iy3Ay4GKPmj-vzwhRvfYHROtMR6NiyYnduXOjB6WBoghaXi-EqPGj4B1mGRJWfxrFVBJk9Yt4Z0LXCGmLN01VES9E88XA1WIvBK~k2naYZ0hPCsqPV9gXn6cs-~7b4mywjqNm0mb-Nx~YFzkuZhs-o2pFw2y~QA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    type: 'IMAGE',
    start: dayjs(),
    end: dayjs(),
    banner:
      'https://s3-alpha-sig.figma.com/img/af4b/91de/f5c79c9f02500423d1e862608324acde?Expires=1670198400&Signature=SKieLP4jZEQuNHL7T8d2hke96TJQAaAOekCym0g~rGBrdZw1JV2SGLJ1gORDhuHoT3dTZn~BapvcS9gTpSHmTHd1ED3qkZgXKco96ialdTVZKJgJB7pPVJovX0rI5y3kpvarOWWmAYgSc7qpzTon-0n~wMokAk5fF4M-50tbaSAiMgNc~6Va981iy3Ay4GKPmj-vzwhRvfYHROtMR6NiyYnduXOjB6WBoghaXi-EqPGj4B1mGRJWfxrFVBJk9Yt4Z0LXCGmLN01VES9E88XA1WIvBK~k2naYZ0hPCsqPV9gXn6cs-~7b4mywjqNm0mb-Nx~YFzkuZhs-o2pFw2y~QA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    main_img:
      'https://s3-alpha-sig.figma.com/img/af4b/91de/f5c79c9f02500423d1e862608324acde?Expires=1670198400&Signature=SKieLP4jZEQuNHL7T8d2hke96TJQAaAOekCym0g~rGBrdZw1JV2SGLJ1gORDhuHoT3dTZn~BapvcS9gTpSHmTHd1ED3qkZgXKco96ialdTVZKJgJB7pPVJovX0rI5y3kpvarOWWmAYgSc7qpzTon-0n~wMokAk5fF4M-50tbaSAiMgNc~6Va981iy3Ay4GKPmj-vzwhRvfYHROtMR6NiyYnduXOjB6WBoghaXi-EqPGj4B1mGRJWfxrFVBJk9Yt4Z0LXCGmLN01VES9E88XA1WIvBK~k2naYZ0hPCsqPV9gXn6cs-~7b4mywjqNm0mb-Nx~YFzkuZhs-o2pFw2y~QA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    location: '유럽 라운지',
    order: 1,
  },
  {
    id: 3,
    title: '게이트이륙 회원가입 이벤트',
    event_content: `게이트 이륙이 회원가입 이벤트를 진행합니다. 앞으로 많은 관심 부탁드리며 다음과 같은 방법으로 참여 부탁드립니다!

    [참여방법]...
    `,
    type: 'TEXT',
    start: dayjs(),
    end: dayjs(),
    banner:
      'https://s3-alpha-sig.figma.com/img/af4b/91de/f5c79c9f02500423d1e862608324acde?Expires=1670198400&Signature=SKieLP4jZEQuNHL7T8d2hke96TJQAaAOekCym0g~rGBrdZw1JV2SGLJ1gORDhuHoT3dTZn~BapvcS9gTpSHmTHd1ED3qkZgXKco96ialdTVZKJgJB7pPVJovX0rI5y3kpvarOWWmAYgSc7qpzTon-0n~wMokAk5fF4M-50tbaSAiMgNc~6Va981iy3Ay4GKPmj-vzwhRvfYHROtMR6NiyYnduXOjB6WBoghaXi-EqPGj4B1mGRJWfxrFVBJk9Yt4Z0LXCGmLN01VES9E88XA1WIvBK~k2naYZ0hPCsqPV9gXn6cs-~7b4mywjqNm0mb-Nx~YFzkuZhs-o2pFw2y~QA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    main_img:
      'https://s3-alpha-sig.figma.com/img/af4b/91de/f5c79c9f02500423d1e862608324acde?Expires=1670198400&Signature=SKieLP4jZEQuNHL7T8d2hke96TJQAaAOekCym0g~rGBrdZw1JV2SGLJ1gORDhuHoT3dTZn~BapvcS9gTpSHmTHd1ED3qkZgXKco96ialdTVZKJgJB7pPVJovX0rI5y3kpvarOWWmAYgSc7qpzTon-0n~wMokAk5fF4M-50tbaSAiMgNc~6Va981iy3Ay4GKPmj-vzwhRvfYHROtMR6NiyYnduXOjB6WBoghaXi-EqPGj4B1mGRJWfxrFVBJk9Yt4Z0LXCGmLN01VES9E88XA1WIvBK~k2naYZ0hPCsqPV9gXn6cs-~7b4mywjqNm0mb-Nx~YFzkuZhs-o2pFw2y~QA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    location: '국내 라운지',
    order: 3,
  },
];

function CommunityEventPage() {
  const [request, setRequest] = useState<ReqLoungeProps>({
    page: 1,
    limit: 10,
  });
  const [list, setList] = useState<DataTableRowType<EventColumnType>[]>();
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const [listModal, setListModal] = useState<ModalProps>({ isOpen: false });

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const communityEvent = new CommunityEvent(
    handleClickListBtn,
    handleChangeInput,
  );

  function handleClickListBtn(row: DataTableRowType<EventColumnType>) {
    setListModal({ isOpen: true, targetId: row.id as number });
  }

  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'limit') {
      newRequest.page = 1;
    }
    console.log('변경: ', key, value);
    setRequest(newRequest);
  }

  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  const handleEditRow = (row: DataTableRowType<EventColumnType>) => {
    if (!row.id) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.id as number });
  };

  const handleCloseModal = () => setModal({ isOpen: false });
  const handleCloseListModal = () => setListModal({ isOpen: false });

  const handleDeleteRow = (row: DataTableRowType<EventColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '이벤트',
        message: '이벤트를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          console.log('삭제 처리:', row);
        },
      }),
    );
    openCustomModal();
  };

  useEffect(() => {
    setList(rows);
  }, []);
  return (
    <>
      <Head>
        <title>이벤트 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['커뮤니티', '이벤트 관리']} />
        <PageTitle
          title="이벤트 관리"
          onClickDownload={() => console.log('다운로드 클릭')}
          isDownload
        />

        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '제목' },
              { value: 1, label: '표시장소' },
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
            title: '이벤트 추가',
            width: '93px',
            onClickCreate: handleCreateRow,
          }}
        />
        <DataTable
          columns={communityEvent.EVENT_COLUMNS}
          rows={list}
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
      <EventDetailModal
        isOpen={modal.isOpen && modal.type !== undefined}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleCloseModal}
        onComplete={() => console.log('데이터 생성 후 처리')}
      />
      <EventParticipantModal
        isOpen={listModal.isOpen}
        targetId={listModal.targetId}
        onClose={handleCloseListModal}
      />
    </>
  );
}

export default withAdminLayout(CommunityEventPage);
