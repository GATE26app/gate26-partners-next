import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { usePostOrderListMutation } from '@apis/order/OrderApi.mutation';
import {
  OrderListParamsType,
  OrderListResType,
} from '@apis/order/OrderApi.type';

import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@utils/_Palette';

import CancelComponent from './_fragments/CancelComponent';
import CancelFilter from './_fragments/CancelFilter';

import { useCancelFilterZuInfo } from '_store/CancelStateInfo';
import { useGoodsStateZuInfo } from '_store/StateZuInfo';
import MainLayout from 'layout/MainLayout';

function CancelListPage() {
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState<OrderListResType>({
    count: 0,
    totalCount: 0,
    pageCount: 0,
    pageNo: 0,
    pageSize: 10,
    orders: [],
  });
  const { cancelFilterInfo, setCancelFilterInfo } = useCancelFilterZuInfo(
    (state) => state,
  );
  const [request, setRequest] = useState<OrderListParamsType>({
    pageNo: cancelFilterInfo.pageNo,
    // router.query.page !== null && router.query.page !== undefined
    //   ? Number(router.query.page) - 1
    //   : 0,
    pageSize: 10,
    searchType: cancelFilterInfo.searchType,
    searchKeyword: cancelFilterInfo.searchKeyword,
    orderType: cancelFilterInfo.orderType, //주문 상품 유형, 1=>일반형, 2=>바우처형, 3=>예약형
    orderStatus: cancelFilterInfo.orderStatus, //주문 상품 상태 1=>결제완료, 2=>예약확정, 3=>이용일, 10=>이용완료,(결제)취소 =>100
    cancelStatus: cancelFilterInfo.cancelStatus, //취소 상태, 1=>취소요청, 2=>취소거절, 3=>취소완료
    periodType: cancelFilterInfo.periodType, //기간 유형, 'paymentDate'=>결제일, 'orderDateTimeOfUse'=>이용일, 'cancelRequestDate'=>취소요청일, 'cancelConfirmDate'=>취소승인일, 'cancelDeniedDate'=>취소반려일
    periodStartDate: cancelFilterInfo.periodStartDate,
    periodEndDate: cancelFilterInfo.periodEndDate,
  });

  useEffect(() => {
    if (router.query.page) {
      setRequest({ ...request, pageNo: Number(router.query.page) - 1 });
      setGoodsInfo({
        orderState: true,
      });
    }
  }, [router.query.page]);
  const { mutate: refreshList, isLoading } = usePostOrderListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          orderState: false,
        });
      },
    },
  });

  useEffect(() => {
    refreshList(request);
  }, []);
  useEffect(() => {
    if (goodsInfo.orderState) refreshList(request);
  }, [goodsInfo.orderState]);

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/ico_order.png'}
            width={'20px'}
            height={'20px'}
            alt="취소관리"
          />
          <Text
            fontWeight={800}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            취소관리
          </Text>
        </Flex>
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          borderWidth={1}
          borderColor={ColorGrayBorder}
          borderRadius={'10px'}
          px={'15px'}
          py={'10px'}
          cursor={'pointer'}
          onClick={() => setFilter(!filter)}
        >
          <Image
            src={'/images/Page/icon_filter.png'}
            width={'16px'}
            height={'16px'}
            alt="주문관리"
          />
          <Text
            color={ColorGray700}
            fontWeight={700}
            fontSize={'15px'}
            pl={'9px'}
            pr={'5px'}
          >
            검색필터 접기
          </Text>
          <Image
            src={'/images/Page/ico_fillter_up.png'}
            width={'18px'}
            height={'18px'}
            alt="취소관리"
          />
        </Flex>
      </Flex>
      {filter && <CancelFilter request={request} setRequest={setRequest} />}
      <CancelComponent list={list} request={request} setRequest={setRequest} />
    </Box>
  );
}
CancelListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default CancelListPage;