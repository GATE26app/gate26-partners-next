'use client';
import React, { ReactElement, useEffect, useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import { usePostListMutation } from '@/apis/goods/GoodsApi.mutation';
import {
  GoodsListParamGetType,
  GoodsListResponseProps,
} from '@/apis/goods/GoodsApi.type';

import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@/utils/_Palette';

import { useGoodsFilterZuInfo } from '@/_store/GoodsFilterInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import GoodsListComponet from '@/components/Goods/List/GoodsListComponet';
import GoodsFilter from '@/components/Goods/List/GoodsFilter';

function GoodsListPage() {
  const toast = useToast();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [filter, setFilter] = useState(true);
  const [list, setList] = useState<GoodsListResponseProps>({
    count: 0,
    data: [],
    pageCount: 0,
    pageNo: 1,
    pageSize: 10,
    totalCount: 0,
  });
  const [onSubmit, setOnSubmit] = useState(true);
  const { goodsFilterInfo } = useGoodsFilterZuInfo((state) => state);
  const [request, setRequest] = useState<GoodsListParamGetType>({
    pageNo: goodsFilterInfo.pageNo,
    pageSize: goodsFilterInfo.pageSize,
    status: goodsFilterInfo.status,
    level: goodsFilterInfo.level,
    forSale: goodsFilterInfo.forSale,
    searchKeyword: goodsFilterInfo.searchKeyword,
    searchType: goodsFilterInfo.searchType,
    type: goodsFilterInfo.type,
  });
  const { mutate: refreshList, isLoading } = usePostListMutation({
    options: {
      onSuccess: (res) => {
        setList(res.data);
        setGoodsInfo({
          goodState: false,
        });
      },
    },
  });

  const getGoodsMainList = async () => {
    if (request.searchKeyword !== '' && request.searchType == '') {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            검색분류를 선택해주세요.
          </Box>
        ),
      });
    } else {
      refreshList(request);
    }
  };

  useEffect(() => {
    refreshList(request);
  }, []);
  useEffect(() => {
    if (goodsInfo.goodState) getGoodsMainList();
  }, [goodsInfo.goodState]);

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/ico_goods.png'}
            width={'20px'}
            height={'20px'}
            alt="상품관리"
          />
          <Text
            fontWeight={800}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            상품관리
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
            alt="상품관리"
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
      {filter && (
        <GoodsFilter
          request={request}
          setRequest={setRequest}
          setOnSubmit={setOnSubmit}
        />
      )}

      <GoodsListComponet
        data={list}
        request={request}
        setRequest={setRequest}
        setOnSubmit={setOnSubmit}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default GoodsListPage;
