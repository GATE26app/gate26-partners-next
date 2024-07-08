import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderListItemType } from '@/apis/order/OrderApi.type';

import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorclickBlue,
} from '@/utils/_Palette';
import { formatDated, imgPath, intComma } from '@/utils/format';

// import { ItemProps } from './OrderDataTable';

interface headerProps {
  id: string;
  name: string;
  width: string;
}
interface Props {
  header: Array<headerProps>;
  item: OrderListItemType;
  CheckList: string[];
  setChekcList: React.Dispatch<React.SetStateAction<string[]>>;
}
function CancelListCard({ header, item, CheckList, setChekcList }: Props) {
  const router = useRouter();

  const onCheckClick = (item: string) => {
    setChekcList((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((i) => i !== item);
      } else {
        return [...prevItems, item];
      }
    });
  };
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
        w={'5%'}
        alignItems={'center'}
        justifyContent={'center'}
        onClick={() => onCheckClick(item.orderId)}
      >
        {CheckList.includes(item.orderId) ? (
          <Image
            width={21}
            height={21}
            src={'/images/icon_check_on.png'}
            alt="체크"
          />
        ) : (
          <Image
            width={21}
            height={21}
            src={'/images/icon_check_off.png'}
            alt="체크"
          />
        )}
      </Flex>
      <Flex
        w={header[0]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.cancelStatusName}
        </Text>
      </Flex>
      <Flex
        w={header[1]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {formatDated(dayjs(item.cancelRequestDate)) == 'Invalid Date'
            ? '-'
            : formatDated(dayjs(item.cancelRequestDate))}
        </Text>
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {formatDated(dayjs(item.cancelConfirmDate)) == 'Invalid Date'
            ? '-'
            : formatDated(dayjs(item.cancelConfirmDate))}
        </Text>
      </Flex>
      <Flex
        w={header[2]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {intComma(item.cancelAmount)}원
        </Text>
      </Flex>
      {/* 결제정보 */}
      <Flex
        w={header[3]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {formatDated(dayjs(item.orderDate)) == 'Invalid Date'
            ? '-'
            : formatDated(dayjs(item.orderDate))}
        </Text>
        <Text fontSize={'14px'} fontWeight={400} color={ColorGray700}>
          ({item.orderId})
        </Text>
      </Flex>
      {/* 예약자정보 */}
      <Flex
        w={header[4]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        onClick={() => router.push(`/cancelDetail?orderId=${item.orderId}`)}
      >
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={ColorclickBlue}
          cursor={'pointer'}
          textDecoration={'underline'}
        >
          {item.orderId}
        </Text>
      </Flex>
      <Flex
        w={header[5]?.width}
        alignItems={'center'}
        // justifyContent={'center'}
        gap={'10px'}
      >
        <Box
          w={'80px'}
          // minWidth={'80px'}
          h={'80px'}
          borderRadius={'10px'}
          position={'relative'}
          // ml={'10px'}
          flexShrink={0}
          overflow={'hidden'}
        >
          <Image
            // width={80}
            // height={80}
            src={
              item.orderThumbnailImagePath !== null
                ? `${imgPath()}${item.orderThumbnailImagePath}`
                : '/images/no_img.png'
            }
            // src={'/images/Page/ex_image_1.jpg'}
            alt="상품이미지"
            objectFit={'cover'}
            fill
          />
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
              {intComma(item.orderAmount)}원
            </Text>
          </Flex>
        </Flex>
        {/* <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.useDate}
        </Text> */}
      </Flex>
      <Flex
        w={header[6]?.width}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        {/* <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.state}
        </Text> */}
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {item.paymentMethod == 'card' ? '카드결제' : '결제'}
        </Text>
        <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
          {intComma(item.paymentAmount)}원
        </Text>
      </Flex>
      <Flex
        w={header[7]?.width}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.orderEmail == null ? '-' : item.orderEmail}
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.orderName == null ? '-' : item.orderName}
          </Text>
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.orderHp == null ? '-' : item.orderHp}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CancelListCard;
