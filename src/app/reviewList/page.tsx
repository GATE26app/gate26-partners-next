'use client';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';

import { useOrderFilterZuInfo } from '@/_store/OrderFilterInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import ReviewFilter from '@/components/Review/ReviewFilter';
import ReivewListComponent from './ReivewListComponent';
import { usePostReviewListMutation } from '@/apis/review/ReviewApi.mutation';
import {
  ReviewListParamsType,
  ReviewListResType,
} from '@/apis/review/ReviewApi.type';
import { useReviewFilterZuInfo } from '@/_store/ReviewFilterInfo';
import { PaymentMethod } from '@/utils/format';
// import OrderListComponent from '@/components/Order/List/OrderListComponent';
// import OrderFIlter from '@/components/Order/List/OrderFIlter';

function ReviewListPage() {
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState<ReviewListResType>({
    count: 0,
    totalCount: 0,
    pageCount: 0,
    pageNo: 1,
    pageSize: 10,
    reviews: [],
  });
  const { reviewFilterInfo, setReviewFilterInfo } = useReviewFilterZuInfo(
    (state) => state,
  );
  const [request, setRequest] = useState<ReviewListParamsType>({
    pageNo: reviewFilterInfo.pageNo,
    pageSize: 10,
    searchType: reviewFilterInfo.searchType,
    searchKeyword: reviewFilterInfo.searchKeyword,
    reply: '',
  });

  useEffect(() => {
    if (reviewFilterInfo.pageNo) {
      setRequest({ ...request, pageNo: Number(reviewFilterInfo.pageNo) - 1 });
      setGoodsInfo({
        reviewState: true,
      });
    }
  }, [reviewFilterInfo.pageNo]);
  const { mutate: refreshList, isLoading } = usePostReviewListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          reviewState: false,
        });
      },
    },
  });

  useEffect(() => {
    refreshList(request);
  }, []);
  useEffect(() => {
    if (goodsInfo.reviewState) refreshList(request);
  }, [goodsInfo.reviewState]);

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/ico_review.png'}
            width={'20px'}
            height={'20px'}
            alt="리뷰내역"
          />
          <Text
            fontWeight={800}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            리뷰내역
          </Text>
          <Text
            fontWeight={400}
            fontSize={'15px'}
            color={ColorGray700}
            pl={'10px'}
          >
            리뷰확인 및 리뷰에 답글 가능합니다.
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
            {filter ? '검색필터 접기' : '검색필터 열기'}
          </Text>
          <Image
            src={
              filter
                ? '/images/Page/ico_fillter_up.png'
                : '/images/Page/ico_fillter_down.png'
            }
            width={'18px'}
            height={'18px'}
            alt="취소관리"
          />
        </Flex>
      </Flex>
      {filter && <ReviewFilter request={request} setRequest={setRequest} />}
      <ReivewListComponent
        list={list}
        request={request}
        setRequest={setRequest}
      />
    </Box>
  );
}

export default ReviewListPage;
