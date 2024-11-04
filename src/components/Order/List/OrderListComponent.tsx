import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import {
  usePostOrderContfrimMutation,
  usePostOrderExcelDownMutation,
  usePostOrderGroupMutation,
  usePutOrderCancelMutation,
  usePutOrderCancelRequestMutation,
} from '@/apis/order/OrderApi.mutation';
import {
  OrderListParamsType,
  OrderListResType,
} from '@/apis/order/OrderApi.type';

import CustomButton from '@/components/common/CustomButton';
import CancelModal from '@/components/common/Modal/CancelModal';
import Pagination from '@/components/common/Pagination';
import SelectBox from '@/components/common/SelectBox';

import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorWhite,
} from '@/utils/_Palette';

import OrderDataTable from './OrderDataTable';

import { useOrderFilterZuInfo } from '@/_store/OrderFilterInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import ImageButton from '@/components/common/ImageButton';
import { OrderApi } from '@/apis/order/OrderApi';
import { getToken } from '@/utils/localStorage/token';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}
interface Props {
  list: OrderListResType;
  request: OrderListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<OrderListParamsType>>;
}
function OrderListComponent({ list, request, setRequest }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [stateSelect, setStateSelect] = useState('');
  const stateSelectList = ['예약확정', '접수거절', '취소요청'];
  const [cancelModal, setCancelModal] = useState(false);
  const { orderFilterInfo, setOrderFilterInfo } = useOrderFilterZuInfo(
    (state) => state,
  );
  const paginationProps = {
    currentPage: request.pageNo,
    limit: request.pageSize,
    total: list?.totalCount == undefined ? 0 : list?.totalCount,
    onPageNumberClicked: (page: number) => handleChangeInput('page', page),
    onPreviousPageClicked: (page: number) => handleChangeInput('page', page),
    onNextPageClicked: (page: number) => handleChangeInput('page', page),
  };
  const [modalInfo, setModalInfo] = useState({
    type: '',
    title: '',
  });
  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };
    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      // setPage(value as number);
      newRequest.pageNo = Number(value);

      router.push(`/orderList?page=${Number(value) + 1}`);
    }
    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }
    setGoodsInfo({
      orderState: true,
    });
    setRequest(newRequest);
  }

  const [CheckList, setChekcList] = useState<string[]>([]);
  const [newCheckList, setNewChekcList] = useState<string[]>([]);

  console.log('CheckList', CheckList);
  //주문번호 그룹화
  const { mutate: OrderGroupMutate } = usePostOrderGroupMutation({
    options: {
      onSuccess: (res, req) => {
        if (res.success) {
          setNewChekcList(res.data.orderIds);
          // setIsLoading(false);
          onChangeFun(res.data.orderIds);
        }
      },
    },
  });
  //상태값 변경
  const onChangeState = () => {
    if (stateSelect == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'상태값을 선택해주세요.'}
          </Box>
        ),
      });
    } else {
      OrderGroupMutate({
        orderIds: CheckList,
      });
    }
  };

  const onChangeFun = (list: string[]) => {
    if (stateSelect == '예약확정') {
      list.map((item) => {
        const obj = {
          orderId: item,
        };
        setIsLoading(true);
        ConfrimMutate(obj);
      });
    } else if (stateSelect == '접수거절') {
      setCancelModal(true);

      setModalInfo({
        type: '접수거절',
        title: '취소사유 입력',
      });
    } else if (stateSelect == '취소요청') {
      setCancelModal(true);

      setModalInfo({
        type: '접수거절',
        title: '취소요청사유 입력',
      });
    }
  };
  const onSubmitCancel = (text: string) => {
    if (modalInfo.type == '취소요청') {
      newCheckList.map((item) => {
        const obj = {
          orderId: item,
          type: '취소요청',
          body: {
            orderCancelRequestDetail: text,
          },
        };
        setIsLoading(true);
        CancelRequestMutate(obj);
      });
    } else if (modalInfo.type == '접수거절') {
      newCheckList.map((item) => {
        // CancelRequestMutate(obj);
        const obj = {
          orderId: item,
          type: '접수거절',
          body: {
            orderCancelRequestDetail: text,
          },
        };
        setIsLoading(true);
        CancelMutate(obj);
      });
    }
  };
  //예약 확정
  const { mutate: ConfrimMutate, isLoading: isConfrimLoading } =
    usePostOrderContfrimMutation({
      options: {
        onSuccess: (res, req) => {
          if (res.success) {
            setIsLoading(false);
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`주문번호 [${req?.orderId}] : 예약 확정 요청되었습니다.`}
                </Box>
              ),
            });
          } else {
            setIsLoading(false);
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`주문번호 [${req?.orderId}] : ${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  //주문 취소 요청
  const { mutate: CancelRequestMutate, isLoading: isCancelRequestLoading } =
    usePutOrderCancelRequestMutation({
      options: {
        onSuccess: (res, req) => {
          setIsLoading(false);
          setCancelModal(false);
          if (res.success) {
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`주문번호 [${req?.orderId}] : 주문 취소 요청이 되었습니다.`}
                </Box>
              ),
            });
            // ToastComponent('주문 취소 요청이 되었습니다.');
          } else {
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`주문번호 [${req?.orderId}] : ${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  //주문 취소
  const { mutate: CancelMutate, isLoading: isCancelLoading } =
    usePutOrderCancelMutation({
      options: {
        onSuccess: (res, req) => {
          setCancelModal(false);
          setIsLoading(false);
          if (res.success) {
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`주문번호 [${req?.orderId}] : 주문 취소가 되었습니다.`}
                </Box>
              ),
            });
          } else {
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`주문번호 [${req?.orderId}] : ${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });

  //주문목록 엑셀다운로드
  // const { mutate: refreshExcelDown, isLoading: isLoadingExcel } =
  //   usePostOrderExcelDownMutation({
  //     options: {
  //       onSuccess: (res) => {
  //         console.log('res', res);

  //         // let a = document.createElement('a');
  //         // a.href = res.data.excel_file;
  //         // a.download = res.data.excel_file.substring(
  //         //   res.data.excel_file.lastIndexOf('/') + 1,
  //         // );
  //         // document.body.appendChild(a);
  //         // a.click();
  //       },
  //     },
  //   });
  const f_excel_down = async () => {
    let searchKeyword =
      request.searchKeyword != ''
        ? 'searchType=' +
          request.searchType +
          '&searchKeyword=' +
          request.searchKeyword
        : '';
    let and =
      request.searchKeyword != '' ||
      request.orderType != 0 ||
      request.orderStatus != 0 ||
      request.cancelStatus?.length !== 0 ||
      request.periodType != '' ||
      request.periodStartDate != '' ||
      request.periodEndDate != '' ||
      CheckList.length != 0
        ? '?'
        : '';
    let orderType =
      request.orderType != 0 ? '&orderType=' + request.orderType : '';
    let orderStatus =
      request.orderStatus != 0 ? '&orderStatus=' + request.orderStatus : '';
    let periodType =
      request.periodType != '' ? '&periodType=' + request.periodType : '';
    let periodStartDate =
      request.periodStartDate != ''
        ? '&periodStartDate=' + request.periodStartDate
        : '';
    let periodEndDate =
      request.periodEndDate != ''
        ? '&periodEndDate=' + request.periodEndDate
        : '';
    let orderId = CheckList.length > 0 ? 'orderIds=' + CheckList : '';
    const url = `/api/backoffice/partner/download-orders${and}${searchKeyword}${orderType}${orderStatus}${periodType}${periodStartDate}${periodEndDate}${orderId}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;

      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = '첨부파일';
      console.log('contentDisposition', contentDisposition);

      if (contentDisposition && contentDisposition.includes('filename=')) {
        fileName = contentDisposition
          .split('filename=')[1]
          .split(';')[0]
          .replace(/"/g, '');
      }

      a.download = decodeURIComponent(fileName); // 다운로드할 파일의 이름

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const onClickExcelDown = () => {
    f_excel_down();
    // if (CheckList.length == 0) {
    //   let data = {
    //     searchType: request.searchType,
    //     searchKeyword: request.searchKeyword,
    //     orderType: request.orderType,
    //     orderStatus: request.orderStatus,
    //     cancelStatus: request.cancelStatus,
    //     periodType: request.periodType,
    //     periodStartDate: request.periodStartDate,
    //     periodEndDate: request.periodEndDate,
    //   };
    //   console.log('data', data);
    //   f_excel_down();
    //   // refreshExcelDown(data);
    // } else {
    //   let data = {
    //     searchType: request.searchType,
    //     searchKeyword: request.searchKeyword,
    //     orderType: request.orderType,
    //     orderStatus: request.orderStatus,
    //     cancelStatus: request.cancelStatus,
    //     periodType: request.periodType,
    //     periodStartDate: request.periodStartDate,
    //     periodEndDate: request.periodEndDate,

    //     orderIds: CheckList,
    //   };
    //   // refreshExcelDown(data);
    // }
  };
  return (
    <Box mt={'40px'}>
      {cancelModal && (
        <CancelModal
          isOpen={cancelModal}
          onClose={() => setCancelModal(false)}
          onSubmit={onSubmitCancel}
          info={undefined}
          title={modalInfo.title}
          type={modalInfo.type}
        />
      )}
      <LoadingModal
        children={isLoading}
        isOpen={isLoading}
        onClose={() => !isLoading}
      />
      <Flex justifyContent={'space-between'}>
        <Flex flexDirection={'row'} alignItems={'center'} gap={'6px'}>
          <Text
            fontSize={'15px'}
            lineHeight={'15px'}
            fontWeight={500}
            color={ColorGray700}
          >
            총
          </Text>
          <Text
            fontSize={'15px'}
            lineHeight={'15px'}
            fontWeight={800}
            color={ColorBlack}
          >
            {list?.totalCount}건
          </Text>
        </Flex>
        <Flex gap={'10px'}>
          <SelectBox
            placeholder="상태값 변경처리"
            width={'168px'}
            list={stateSelectList}
            select={stateSelect}
            setSelect={setStateSelect}
          />
          <CustomButton
            text="변경"
            bgColor={ColorWhite}
            borderColor={ColorGrayBorder}
            px="29px"
            py="11px"
            color={ColorGray700}
            fontSize="14px"
            onClick={() => onChangeState()}
          />
          <ImageButton
            img="/images/Page/excel_icon.png"
            backgroundColor={ColorWhite}
            borderColor={ColorGrayBorder}
            text="엑셀 다운로드"
            TextColor={ColorGray700}
            fontSize="14px"
            imgHeight="20px"
            imgWidth="20px"
            px="14px"
            py="10px"
            onClick={() => onClickExcelDown()}
          />
        </Flex>
      </Flex>
      <OrderDataTable
        list={list}
        setChekcList={setChekcList}
        CheckList={CheckList}
      />
      {list?.totalCount !== undefined &&
        list?.totalCount !== 0 &&
        paginationProps && (
          <Flex justifyContent="center" alignItems="center">
            <Pagination
              currentPage={request.pageNo}
              limit={request.pageSize}
              total={paginationProps.total}
              onPageNumberClicked={paginationProps.onPageNumberClicked}
              onPreviousPageClicked={paginationProps.onPreviousPageClicked}
              onNextPageClicked={paginationProps.onNextPageClicked}
            />
          </Flex>
        )}
    </Box>
  );
}

export default OrderListComponent;
