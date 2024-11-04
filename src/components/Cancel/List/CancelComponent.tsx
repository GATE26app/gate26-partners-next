import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  OrderListParamsType,
  OrderListResType,
} from '@/apis/order/OrderApi.type';

import Pagination from '@/components/common/Pagination';

import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorWhite,
} from '@/utils/_Palette';

import CancelDataTable from './CancelDataTable';

import { useCancelFilterZuInfo } from '@/_store/CancelStateInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import ImageButton from '@/components/common/ImageButton';
import { getToken } from '@/utils/localStorage/token';

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
      router.push(`/cancelList?page=${Number(value) + 1}`);
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
  const f_excel_down = async () => {
    var cancelText =
      request.cancelStatus !== undefined && request.cancelStatus.length > 0
        ? request.cancelStatus
            .map((number) => `&cancelStatus=${number}`)
            .join('')
        : '';
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
    let cancelStatus = request.cancelStatus?.length !== 0 ? cancelText : '';
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
    let orderId = CheckList.length > 0 ? '&orderIds=' + CheckList : '';
    const url = `/api/backoffice/partner/download-orders${and}${cancelStatus}${searchKeyword}${orderType}${orderStatus}${periodType}${periodStartDate}${periodEndDate}${orderId}`;

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
            onClick={() => f_excel_down()}
          />
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
