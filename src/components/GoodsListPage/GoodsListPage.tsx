import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import goodsApi from '@apis/goods/GoodsApi';
import { usePostListMutation } from '@apis/goods/GoodsApi.mutation';
import { useGetGoodstListQuery } from '@apis/goods/GoodsApi.query';
import {
  GoodsListParamGetType,
  GoodsListResponseProps,
} from '@apis/goods/GoodsApi.type';

import { QueryClient } from '@tanstack/react-query';
import { ColorBlack00, ColorGray700, ColorGrayBorder } from '@utils/_Palette';
import { getToken } from '@utils/localStorage/token';

import GoodsListComponet from './_fragments/GoodsListComponet';
import GoodsFilter from './_fragments/GoodsrFilter';

import { useGoodsFilterZuInfo } from '_store/GoodsFilterInfo';
import { useGoodsStateZuInfo } from '_store/StateZuInfo';
import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
import MainLayout from 'layout/MainLayout';

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
            검색필터 접기
          </Text>
          <Image
            src={'/images/Page/ico_fillter_up.png'}
            width={'18px'}
            height={'18px'}
            alt="상품관리"
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

GoodsListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default GoodsListPage;

// export async function getServerSideProps(context: GetServerSidePropsContext) {

//   const obj = {
//     pageNo: 0,
//     pageSize: 10,
//     status: null,
//     level: 0,
//     forSale: 0,
//     searchKeyword: '',
//     searchType: '',
//   };
//   const { data } = useQuery(
//     ['GET_GOODSLIST', obj],
//     () => goodsApi.getGoodsList(obj),
//     {
//       staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
//       refetchInterval: false, // 자동 새로 고침 비활성화
//     },
//   );

//   return { dehydratedProps: { data } };
// }
