import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex, Toast, useToast } from '@chakra-ui/react';

import adminMenuApi from '@apis/menu/AdminMenuApi';
import { MenuRequestDTOType } from '@apis/menu/AdminMenuApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import MenuEditModal from '@components/AdminMenuPage/_fragments/MenuEditModal';
import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

import { AdminMenuColumnType, AdminMenuColumns } from './AdminMenuPage.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
import useExcelDown from '@hooks/useExcelDown';

interface ReqMenuProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

type ModalType = 'create' | 'modify';
interface ModalProps {
  isOpen: boolean;
  type?: ModalType;
  targetId?: number;
}
let rows: DataTableRowType<AdminMenuColumnType>[] = [];

function AdminMenuPage() {
  const toast = useToast();

  const [request, setRequest] = useState<ReqMenuProps>({
    page: 0,
    limit: 10,
  });
  const [total, setTotal] = useState<number>(100);
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
  });
  const userColumns = new AdminMenuColumns();
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const [keyword, setKeyword] = useState<string>('');
  const [type, setType] = useState<number>();
  const [lastPage, setLastPage] = useState<number>(0);

  const handleCreateModalOpen = (type: ModalType) => {
    setModal({ type, isOpen: true });
  };

  const handleModifyModalOpen = (
    type: ModalType,
    row: DataTableRowType<AdminMenuColumnType>,
  ) => {
    console.log(Number(row?.id));
    setModal({ type, isOpen: true, targetId: Number(row?.id) });
  };

  const handleMenuModalClose = () => {
    setModal({ isOpen: false });
  };

  const handleDeleteRow = (row: DataTableRowType<AdminMenuColumnType>) => {
    dispatch(
      customModalSliceAction.setMessage({
        title: '메뉴 관리',
        message: '메뉴를 삭제 하시겠습니까?',
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          console.log('삭제 처리:', row);
          handleAdminMenuDelete(row?.id);
        },
      }),
    );
    openCustomModal();
  };

  const handleAdminMenuDelete = (tgId: any) => {
    adminMenuApi
      .deleteAdminMenu(tgId)
      .then(({ success }) => {
        const newRequest = { ...request };
        if (success) {
          //삭제했을때 현재 페이지에 요소가 없고 첫번째 페이지가 아닐경우 페이지 -1
          if (rows && rows.length - 1 === 0 && newRequest.page)
            newRequest.page -= 1;

          loadData();
          toast({
            description: '삭제 성공',
          });
        } else {
          toast({ description: '삭제 실패' });
        }
      })
      .catch(() => {
        toast({ description: '삭제 실패' });
      });
  };

  useEffect(() => {
    //첫 로드
    loadData();
  }, []);

  const loadData = () => {
    //검색 타입별 코드값
    let typeStr = '';
    if (type == 1) {
      typeStr = 'name';
    } else if (type == 2) {
      typeStr = 'path';
    }

    const params: MenuRequestDTOType = {
      type: typeStr,
      keyword: keyword,
      page: request?.page,
      size: request?.limit,
    };

    adminMenuApi
      .getAdminMenuList(params)
      .then((response) => {
        const { message, data, success } = response;
        console.log(response);
        if (success) {
          console.log(data);
          console.log('메뉴리스트 불러오기 성공');
          //총 개수
          setTotal(data?.totalElements);
          setLastPage(data?.totalPages);
          rows = [];
          const codeList: any = data?.content;
          codeList.forEach((element: any) => {
            rows.push({
              id: element?.menuId,
              title: element?.menuName,
              path: element?.menuPath,
              useStatus: element?.useYn,
              createdAt: element?.createdDate,
            });
          });
        } else {
          toast({ description: '메뉴리스트 불러오기 실패' });
        }
      })
      .catch(() => {
        toast({ description: '메뉴리스트 불러오기 실패' });
      });
  };

  function handleChangeInput(key: string, value: string | number | boolean) {
    const newRequest = { ...request, [key]: value };

    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.page = 0;
    }

    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.page < 0) {
      newRequest.page = 0;
    }

    //페이지가 마지막 페이지보다 큰 경우 마지막 페이지로 세팅
    if (newRequest.page >= lastPage - 1) {
      newRequest.page = lastPage - 1;
    }
    console.log('변경: ', key, value);
    setRequest(newRequest);
  }

  useEffect(() => {
    //페이징 카운트 & 조회 조건 변경 시 재조회
    loadData();
  }, [request]);

  const excelDown = () => {
    useExcelDown(rows, '메뉴');
  };
  const excelAllDown = () => {
    const req = {
      page: 0,
      size: total,
    };
    adminMenuApi
      .getAdminMenuList(req)
      .then((response) => {
        if (response.success) {
          const { data } = response;
          useExcelDown(data.content, '전체 메뉴');
        }
      })
      .catch((err) => console.log(err));
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
        <BreadCrumb depth={['관리자', '메뉴 관리']} />
        <PageTitle
          title="메뉴 관리"
          onClickDownload={excelDown}
          onClickAllDownload={excelAllDown}
          isDownload
          isAllDownLoad
        />

        <TableTop
          total={total}
          search={{
            searchTypes: [
              { value: 0, label: '전체' },
              { value: 1, label: '메뉴명' },
              { value: 1, label: '경로' },
            ],
            keyword: keyword,
            onChangeLimit: (value: number) => handleChangeInput('limit', value),
            onChangeSearchType: (type: number) => {
              setType(type);
            },
            onChangeKeyword: (keyword: string) => {
              console.log('키워드');
              setKeyword(keyword);
            },
            onClickSearch: () => {
              console.log('검색');
              loadData();
            },
          }}
          createButton={{
            title: '메뉴 추가',
            width: '83px',
            onClickCreate: () => handleCreateModalOpen('create'),
          }}
        />
        <DataTable
          columns={userColumns.LIST_COLUMNS}
          rows={rows}
          isMenu
          onDelete={(row) => handleDeleteRow(row)}
          onEdit={(row) => handleModifyModalOpen('modify', row)}
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
      <MenuEditModal
        isOpen={modal.isOpen}
        type={modal.type}
        targetId={modal.targetId}
        onClose={handleMenuModalClose}
        onComplete={() => loadData()}
      />
    </>
  );
}

export default withAdminLayout(AdminMenuPage);
