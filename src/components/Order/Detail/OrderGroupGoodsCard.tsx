import Image from 'next/image';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import {
  GroupOrderListType,
  OrderDetailItemType,
} from '@/apis/order/OrderApi.type';

import {
  ColoLineGray,
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
} from '@/utils/_Palette';

import { formatDated, getImagePath, imgPath, intComma } from '@/utils/format';

interface headerProps {
  id: string;
  name: string;
  width: string;
}
interface Props {
  header: Array<headerProps>;
  item: GroupOrderListType;
}
function OrderGroupGoodsCard({ header, item }: Props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [StateList, setStateList] = useState<string[]>([]);
  const [selectState, setSelectState] = useState(item.orderStatusName);

  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };

  useEffect(() => {
    if (item.cancelStatusName == '' || item.cancelStatusName == null) {
      if (
        (item.orderStatusName == '결제완료' && item.orderType == 1) ||
        (item.orderStatusName == '결제완료' && item.orderType == 2)
      ) {
        setStateList(['결제완료', '취소요청']);
        // StateList = dataList;
      } else if (item.orderStatusName == '결제완료' && item.orderType == 3) {
        setStateList(['결제완료', '예약확정', '취소']);
      } else if (item.orderStatusName == '이용일') {
        setStateList([item.orderStatusName, '취소요청']);
      } else if (item.orderStatusName == '예약확정') {
        setStateList([item.orderStatusName, '취소요청']);
      } else {
        setStateList([item.orderStatusName]);
      }
    } else {
      setSelectState(item.cancelStatusName);
      setStateList([item.cancelStatusName]);
    }
  }, [item.orderStatusName, item.cancelStatusName]);

  return (
    <Flex
      minW={'1550px'}
      flexDirection={'row'}
      justifyContent={'center'}
      py={'20px'}
      borderBottomColor={ColorGrayBorder}
      borderBottomWidth={1}
    >
      <Flex
        w={header[0]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.orderId}
        </Text>
      </Flex>
      <Flex w={header[1]?.width} gap={'10px'}>
        <Box
          w={'80px'}
          minWidth={'80px'}
          h={'80px'}
          borderRadius={'10px'}
          position={'relative'}
          overflow={'hidden'}
          ml={'10px'}
        >
          <img
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
            }}
            src={
              item.orderThumbnailImagePath !== null
                ? getImagePath(item.orderThumbnailImagePath)
                : '/images/no_img.png'
            }
            onError={addDefaultImg}
            alt="이미지 업로드"
          />
          {/* <Image
              height={80}
              width={80}
              src={
                item.orderThumbnailImagePath !== null
                  ? `${imgPath()}${item.orderThumbnailImagePath}`
                  : '/images/no_img.png'
              }
              // src={'/images/Page/ex_image_1.jpg'}
              alt="상품이미지"
              objectFit={'cover'}
              // fill
            /> */}
        </Box>
        {/* 상품정보 */}
        <Flex flexDirection={'column'}>
          <Flex mb={'5px'} gap={'10px'} flexDirection={'row'} flexShrink={0}>
            <Text
              color={ColorBlack}
              fontSize={'14px'}
              fontWeight={600}
              flexShrink={0}
            >
              {item.orderCategoryTitle}
            </Text>
            <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
              {item.orderTitle}
            </Text>
          </Flex>
          <Flex gap={'10px'} flexShrink={0}>
            <Text
              flexShrink={0}
              color={ColorGray700}
              fontWeight={600}
              fontSize={'14px'}
              w={'50px'}
            >
              선택옵션
            </Text>
            <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
              {item.orderOptionTitle} * {item.orderCnt}
            </Text>
          </Flex>
          <Flex gap={'10px'}>
            <Text
              color={ColorGray700}
              fontWeight={600}
              fontSize={'14px'}
              w={'49px'}
            >
              주문금액
            </Text>
            <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
              {intComma(item.orderAmount)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* 결제정보 */}
      <Flex
        w={header[2]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {intComma(item.orderAmount)}원
        </Text>
      </Flex>
      {/* 예약자정보 */}
      <Flex
        w={header[3]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {formatDated(dayjs(item.orderDateTimeOfUse)) == 'Invalid Date'
            ? '-'
            : formatDated(dayjs(item.orderDateTimeOfUse))}
        </Text>
      </Flex>
      <Flex
        w={header[4]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'10px'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {selectState}
        </Text>
      </Flex>
    </Flex>
  );
}

export default OrderGroupGoodsCard;
