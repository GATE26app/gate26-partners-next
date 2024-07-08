import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  OrderListParamsType,
  OrderListResType,
} from '@/apis/order/OrderApi.type';

import Pagination from '@/components/common/Pagination';

import { ColorBlack, ColorGray700 } from '@/utils/_Palette';

import CancelDataTable from './CancelDataTable';

import { useCancelFilterZuInfo } from '@/_store/CancelStateInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';

// import OrderDataTable from './OrderDataTable';

// import GoodsDataTable from './GoodsDataTable';
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
function CancelComponent({ list, request, setRequest }: Props) {
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [stateSelect, setStateSelect] = useState('');
  const stateSelectList = ['결제완료', '예약확정', '취소요청'];
  const [CheckList, setChekcList] = useState<string[]>([]);
  const { cancelFilterInfo, setCancelFilterInfo } = useCancelFilterZuInfo(
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

  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };
    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      // setPage(value as number);
      newRequest.pageNo = Number(value);
      setCancelFilterInfo({
        ...cancelFilterInfo,
        pageNo: Number(value),
      });
      router.push(`/orderList?page=${Number(value) + 1}`);
    }
    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }
    setGoodsInfo({
      cancelState: true,
    });
    setRequest(newRequest);
  }
  return (
    <Box mt={'40px'}>
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
          {/* <ImageButton
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
            onClick={() => console.log('엑셀다운로드')}
          /> */}
        </Flex>
      </Flex>
      <CancelDataTable
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

export default CancelComponent;
