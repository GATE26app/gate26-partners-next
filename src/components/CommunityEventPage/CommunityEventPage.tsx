import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import { Flex } from '@chakra-ui/react';

import eventApi from '@apis/event/EventApi';
import {
  EventListSeqType,
  EventListType,
  EventParamGetType,
} from '@apis/event/EventApi.type';
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
  targetId?: string;
}

const SEARCH_TYPE = [1, 2];

function CommunityEventPage() {
  const [request, setRequest] = useState<EventParamGetType>({
    searchType: SEARCH_TYPE[0],
    keyword: '',
    page: 0,
    size: 10,
  });

  const [list, setList] = useState<DataTableRowType<EventColumnType>[]>([]);
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const [listModal, setListModal] = useState<ModalProps>({ isOpen: false });
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();
  const [seqData, setSeqData] = useState<EventListSeqType>();

  useEffect(() => {
    getEventList();
  }, [request]);

  const communityEvent = new CommunityEvent(
    handleClickListBtn,
    handleChangeInput,
  );

  function handleClickListBtn(row: DataTableRowType<EventColumnType>) {
    setListModal({ isOpen: true, targetId: row.eventId as string });
  }

  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };
    if (key === 'size') {
      newRequest.page = 0;
    }
    if (key === 'seq') {
      updateSeq(id as string, value as number);
    }
    setRequest(newRequest);
  }
  const updateSeq = async (id: string, value: number) => {
    const res = await eventApi.putEventListSeq(id, value);
    if (res.success) {
      getEventList();
    }
  };
  const getEventList = async () => {
    const response = await eventApi.getEventList(request);
    const { data, count, success } = response;
    const seqResponse = await eventApi.getEventListCount();
    const maxSeq = seqResponse?.data?.count;
    console.log('maxSeq', maxSeq);
    if (success) {
      setTotal(count);
      const newList = response.data.content.map((item) => {
        return { ...item, maxSeq };
      });
      setList(newList);
    }
  };

  const handleCreateRow = () => setModal({ isOpen: true, type: 'create' });

  const handleEditRow = (row: DataTableRowType<EventColumnType>) => {
    if (!row.eventId) {
      return;
    }
    setModal({ isOpen: true, type: 'modify', targetId: row.eventId as string });
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
        cbOk: async () => {
          await eventApi.deleteEventList(row.eventId as string);
          getEventList();
        },
      }),
    );
    openCustomModal();
  };

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
          limit={request.size}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '제목' },
            ],
            keyword: '',
            onChangeLimit: (value: number) => handleChangeInput('size', value),
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
            currentPage: request.page!,
            limit: request.size!,
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
        targetId={listModal.targetId as string}
        onClose={handleCloseListModal}
      />
    </>
  );
}

export default withAdminLayout(CommunityEventPage);
