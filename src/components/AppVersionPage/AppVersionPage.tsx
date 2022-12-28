import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';
import * as excel from 'xlsx';

import { Flex } from '@chakra-ui/react';

import appManageApi from '@apis/appmanage/AppManageApi';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import VersionEditModal from '@components/AppVersionPage/_fragments/VersionEditModal';
import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import {
  AppVersionPageColumnType,
  AppVersionPageColumns,
} from './AppVersionPage.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ReqAppVersionProps {
  keyword?: string;
  searchType?: number;
  page: number;
  size: number;
  deviceType: string;
}

type ModalType = 'create' | 'modify';
interface ModalProps {
  isOpen: boolean;
  type?: ModalType;
  targetId?: number;
}

function AppVersionPagePage() {
  const [request, setRequest] = useState<ReqAppVersionProps>({
    deviceType: '',
    keyword: '',
    page: 0,
    size: 10,
  });
  const [total, setTotal] = useState<number>(0);
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
  });
  const userColumns = new AppVersionPageColumns(
    handleClickListBtn,
    handleChangeInput,
  );

  const searchTypeList = [
    { value: 0, label: '전체' },
    { value: 1, label: 'OS' },
    { value: 2, label: 'MAJOR VERSION' },
    { value: 3, label: 'MINOR VERSION' },
  ];
  const pageNumber = useRef(0);
  const setPage = (value: number) => {
    pageNumber.current = value;
  };

  const pageSize = useRef(10);
  const setPageSize = (value: number) => {
    pageSize.current = value;
  };

  const searchType = useRef('');
  const setSearchType = (value: number) => {
    switch (value) {
      case 1:
        searchType.current = 'OS'; // 이름 검색
        return;
      case 2:
        searchType.current = 'MAJOR VERSION'; // 닉네임 검색
        return;
      case 3:
        searchType.current = 'MINOR VERSION'; // 이메일 검색
        return;
      default: // 전체 검색
        searchType.current = '';
        return;
    }
  };

  const keyword = useRef('');
  const setKeyword = (value: string) => {
    keyword.current = value;
  };

  const [rows, setDataTableRow] = useState<
    DataTableRowType<AppVersionPageColumnType>[]
  >([]);

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const handleVersionModalOpen = (type: ModalType) => {
    console.log(`sdasdsd ${modal.targetId}`);
    setModal({ type, isOpen: true });
  };

  const handleVersionModalClose = () => {
    setModal({ isOpen: false });
  };

  const [listModal, setListModal] = useState<ModalProps>({ isOpen: false });
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };
    if (key === 'page') {
      setPage(value as number);
    } else if (key === 'limit') {
      setPage(0);
      setPageSize(value as number);
    } else if (key === 'searchType') {
      setSearchType(value as number);
    } else if (key === 'keyword') {
      setKeyword(value as string);
    }
    setRequest(newRequest);
    getAppversionList(); // 페이징 요청
  }

  function handleClickListBtn(row: DataTableRowType<AppVersionPageColumnType>) {
    console.log(`sasdasdasd ${rows}`);
    setListModal({ isOpen: true, targetId: row.id as number });
  }
  function handleListModalClose() {
    setListModal({ isOpen: false, targetId: undefined });
  }

  const handleDeleteRow = (row: DataTableRowType<AppVersionPageColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '앱버전',
        message: '앱 버전을 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          deleteAppversion(row);
        },
      }),
    );
    openCustomModal();
  };

  const deleteAppversion = (
    row: DataTableRowType<AppVersionPageColumnType>,
  ) => {
    const id = row.id;
    appManageApi.deleteAppVersion(id).then((response) => {
      const { success } = response;

      alert(`${success}`);
    });
  };
  /**
   * 최초 앱 버전 리스트 불러오기
   * */
  useEffect(() => {
    getAppversionList();
  }, []);

  /**
   * 최초 앱 버전 리스트 호출 API
   * */

  const getAppversionList = useCallback(() => {
    const requestParams = {
      keyword: '',
      deviceType: '',
      page: pageNumber.current,
      size: pageSize.current,
    };
    setRequest(requestParams);
    appManageApi
      .getAppVersionList(requestParams)
      .then((response) => {
        const { data, count, success } = response;
        let listData: DataTableRowType<AppVersionPageColumnType>[] = [];
        if (success) {
          data?.content.forEach((element) => {
            listData.push(element);
          });
          setTotal(data?.totalElements === undefined ? 0 : data?.totalElements);
        } else {
          listData = [];
          console.log(`앱 버전 리스트 조회 실패`);
        }
        setDataTableRow(listData);
      })
      .catch((err) => console.log(err));
  }, []);

  const excelDown = () => {
    console.log('다운로드 클릭' + excel);
    const ws = excel?.utils?.json_to_sheet(rows);
    const wb = excel?.utils?.book_new();
    excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    excel?.writeFile(wb, '앱 버전 목록.xlsx');
  };

  return (
    <>
      <Head>
        <title>메뉴 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['앱 관리', '앱 버전 관리']} />
        <PageTitle
          title="앱 버전 관리"
          onClickDownload={() => excelDown()}
          isDownload
        />

        <TableTop
          total={total}
          search={{
            searchTypes: searchTypeList,
            keyword: request.keyword as string,
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
            title: '앱 버전 추가',
            width: '95px',
            onClickCreate: () => handleVersionModalOpen('create'),
          }}
        />
        <DataTable
          columns={userColumns.LIST_COLUMNS}
          rows={rows}
          isMenu
          onDelete={(row) => handleDeleteRow(row)}
          onEdit={() => handleVersionModalOpen('modify')}
          paginationProps={{
            currentPage: request.page,
            limit: request.size,
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
      <VersionEditModal
        isOpen={modal.isOpen}
        type={modal.type}
        onClose={handleVersionModalClose}
        targetId={listModal.targetId}
      />
    </>
  );
}

export default withAdminLayout(AppVersionPagePage);
