import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Dayjs } from 'dayjs';
import * as excel from 'xlsx';

import { Flex } from '@chakra-ui/react';

import eventApi from '@apis/event/EventApi';
import { EventListSeqType, EventParamGetType } from '@apis/event/EventApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { CommunityEvent, EventColumnType } from './CommunityEventPage.data';
import EventDetailModal from './_fragments/EventDetailModal';
import EventParticipantModal from './_fragments/EventParticipantModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ParticipantModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: string;
}

interface ModalProps {
  isOpen: boolean;
  type?: 'create' | 'modify';
  detail: {
    targetId: string;
    title: string;
    content: string;
    contentType: string;
    startDate: Dayjs;
    endDate: Dayjs;
    img?: string;
    bannerImg?: string;
    loungeId?: string;
  } | null;
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
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    detail: null,
  });
  const [listModal, setListModal] = useState<ParticipantModalProps>({
    isOpen: false,
  });
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  useEffect(() => {
    getEventList();
  }, [request]);

  const communityEvent = new CommunityEvent(
    handleClickListBtn,
    handleChangeInput,
  );

  function handleClickListBtn(row: DataTableRowType<EventColumnType>) {
    setListModal({
      isOpen: true,
      targetId: row.eventId as string,
    });
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
    const { data, success } = response;
    const seqResponse = await eventApi.getEventListCount();
    const maxSeq = seqResponse?.data?.count;

    if (success) {
      setTotal(data.totalElements);
      const newList = response.data.content.map((item) => {
        return { ...item, maxSeq };
      });
      setList(newList);
    }
  };

  const handleCreateRow = () =>
    setModal({ isOpen: true, type: 'create', detail: null });

  const handleEditRow = (row: DataTableRowType<EventColumnType>) => {
    if (!row.eventId) {
      return;
    }
    setModal({
      isOpen: true,
      type: 'modify',
      detail: {
        targetId: row.eventId as string,
        title: row.title as string,
        content: row.content as string,
        contentType: row.contentType as string,
        startDate: row.startDate as Dayjs,
        endDate: row.endDate as Dayjs,
        img: row.imgPath as string,
        bannerImg: row.bannerImgPath as string,
        loungeId: row.loungeId as string,
      },
    });
  };

  const handleCloseModal = () => setModal({ isOpen: false, detail: null });
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
  const excelDown = () => {
    console.log('다운로드 클릭' + excel);
    const ws = excel?.utils?.json_to_sheet(list);
    const wb = excel?.utils?.book_new();
    excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    excel?.writeFile(wb, '이벤트 목록.xlsx');
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
        <PageTitle title="이벤트 관리" onClickDownload={excelDown} isDownload />

        <TableTop
          total={total}
          limit={request.size}
          search={{
            searchTypes: [
              { value: 1, label: '전체' },
              { value: 2, label: '제목' },
            ],
            keyword: request.keyword,
            searchType: request.searchType,
            onChangeLimit: (value: number) => handleChangeInput('size', value),
            onChangeSearchType: (type: number) =>
              handleChangeInput('searchType', type),
            onChangeKeyword: (keyword: string) =>
              handleChangeInput('keyword', keyword),
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
        detail={modal.detail}
        onClose={handleCloseModal}
        onComplete={() => {
          getEventList();
          handleCloseModal();
        }}
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
