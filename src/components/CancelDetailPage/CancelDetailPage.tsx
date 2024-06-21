import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import orderApi from '@apis/order/OrderApi';

import OrderDelivery from '@components/OrderDetailPage/_fragments/OrderDelivery';
import OrderPayment from '@components/OrderDetailPage/_fragments/OrderPayment';
import OrderResevationInfo from '@components/OrderDetailPage/_fragments/OrderResevationInfo';
import CustomButton from '@components/common/CustomButton';

import {
  ColorBlack,
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorWhite,
} from '@utils/_Palette';

import CancelInfo from './_fragments/CancelInfo';
import OrderInfo from './_fragments/OrderInfo';

import MainLayout from 'layout/MainLayout';

function CancelDetailPage() {
  const router = useRouter();
  const {
    data: CancelData,
    isLoading,
    error,
  } = useQuery(
    ['orderItem', String(router.query.orderId)],
    () => orderApi.getOrderItem(String(router.query.orderId)),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!router.query.orderId,
    },
  );
  return (
    <>
      <Box w={'100%'}>
        <Flex justifyContent={'space-between'} mb={'26px'}>
          <Flex alignItems={'center'}>
            <Image
              src={'/images/Page/ico_order.png'}
              width={'20px'}
              height={'20px'}
              alt="취소상세"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              취소상세
            </Text>
          </Flex>
        </Flex>
        {CancelData?.data !== undefined && (
          <>
            <CancelInfo info={CancelData?.data} />
            <OrderInfo info={CancelData?.data} />
            {/* <OrderGoods /> */}
            <OrderResevationInfo info={CancelData?.data} />
            <OrderDelivery info={CancelData?.data} />
            <OrderPayment info={CancelData?.data} />
          </>
        )}

        {/* <OrderState />
  <OrderListComponent /> */}
      </Box>
      <Flex justifyContent={'center'} mt={'20px'}>
        <CustomButton
          text="목록"
          bgColor={ColorWhite}
          fontSize="15px"
          borderColor={ColorGray400}
          borderRadius="10px"
          py="13px"
          px="117px"
          color={ColorBlack}
          onClick={() => router.back()}
        />
      </Flex>
    </>
  );
}
CancelDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default CancelDetailPage;
