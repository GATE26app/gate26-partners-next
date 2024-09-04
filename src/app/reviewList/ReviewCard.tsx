import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderListItemType } from '@/apis/order/OrderApi.type';

import {
  ColorBlack,
  ColorGray500,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorRed50,
  ColorclickBlue,
} from '@/utils/_Palette';
import {
  formatDateDot,
  formatDated,
  formatPhone,
  imgPath,
  intComma,
} from '@/utils/format';
import ReviewModal from '@/components/common/Modal/ReviewModal';
import { ReviewListItemType } from '@/apis/review/ReviewApi.type';

interface headerProps {
  id: string;
  name: string;
  width: string;
}
interface Props {
  header: Array<headerProps>;
  item: ReviewListItemType;
  index: number;
  totalCount: number;
  pageNo: number;
}
function ReviewCard({ header, item, index, totalCount, pageNo }: Props) {
  const router = useRouter();
  const [reviewModal, setReviewModal] = useState(false);
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };

  return (
    <>
      {reviewModal && (
        <ReviewModal
          isOpen={reviewModal}
          onClose={() => setReviewModal(false)}
          reviewId={item.review?.reviewId}
          // onSubmit={onSubmitCancel}
        />
      )}
      <Flex
        minW={'1550px'}
        flexDirection={'row'}
        justifyContent={'center'}
        py={'20px'}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
      >
        <Flex
          w={`${header[0]?.width}`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {/* {item.itemCode} */}
            {totalCount - (pageNo - 1) * 10 - index}
          </Text>
        </Flex>
        <Flex
          w={header[1]?.width}
          flexDirection={'row'}
          gap={'5px'}
          cursor={'pointer'}
        >
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
                item.orderThumbnailImagePath !== null ||
                item.orderThumbnailImagePath !== ''
                  ? `${imgPath()}${item.orderThumbnailImagePath}`
                  : '/images/no_img.png'
              }
              onError={addDefaultImg}
              alt="이미지 업로드"
            />
            {/* <Image
            width={80}
            height={80}
            src={
              item.orderThumbnailImagePath !== null ||
              item.orderThumbnailImagePath !== ''
                ? `${imgPath()}${item.orderThumbnailImagePath}`
                : '/images/no_img.png'
            }
            // src={'/images/Page/ex_image_1.jpg'}
            alt="상품이미지"
            objectFit={'cover'}
            onError={addDefaultImg}
            // fill
          /> */}
          </Box>
          {/* 상품정보 */}
          <Flex flexDirection={'column'}>
            <Flex mb={'5px'} flexDirection={'row'} flexShrink={0}>
              <Text
                color={ColorBlack}
                fontSize={'14px'}
                fontWeight={600}
                flexShrink={0}
                mr={'10px'}
              >
                {item.orderCategoryTitle}
              </Text>
              <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
                {item.orderTitle}
              </Text>
            </Flex>
            {item.orderDateTimeOfUse && (
              <Flex gap={'10px'} flexShrink={0}>
                <Text
                  flexShrink={0}
                  color={ColorGray700}
                  fontWeight={600}
                  fontSize={'14px'}
                  w={'50px'}
                >
                  예약일
                </Text>
                <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
                  {item.orderDateTimeOfUse !== undefined
                    ? formatDateDot(item.orderDateTimeOfUse)
                    : '-'}
                </Text>
              </Flex>
            )}

            <Flex gap={'10px'}>
              <Text
                color={ColorGray700}
                fontWeight={600}
                fontSize={'14px'}
                w={'49px'}
              >
                선택옵션
              </Text>
              <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
                {item.orderOptionTitle} * {item.orderCnt}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w={header[2]?.width} gap={'10px'}>
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
                item.review?.images.length > 0
                  ? `${imgPath()}${item.review?.images[0].thumbnailImagePath}`
                  : '/images/no_img.png'
              }
              onError={addDefaultImg}
              alt="이미지 업로드"
            />
            {/* <Image
            width={80}
            height={80}
            src={
              item.orderThumbnailImagePath !== null ||
              item.orderThumbnailImagePath !== ''
                ? `${imgPath()}${item.orderThumbnailImagePath}`
                : '/images/no_img.png'
            }
            // src={'/images/Page/ex_image_1.jpg'}
            alt="상품이미지"
            objectFit={'cover'}
            onError={addDefaultImg}
            // fill
          /> */}
          </Box>
          {/* 상품정보 */}
          <Flex flexDirection={'column'}>
            <Text
              color={ColorGray700}
              fontSize={'14px'}
              fontWeight={400}
              wordBreak={'break-word'}
              overflow={'hidden'}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {item.review.content}
            </Text>
            <Flex gap={'5px'} flexShrink={0} alignItems={'center'}>
              <Image
                width={14}
                height={14}
                src={'/images/Page/ico_star_on.png'}
                alt="데이터 없음"
              />
              <Text color={ColorBlack} fontWeight={400} fontSize={'14px'}>
                {item.review.star}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* 결제정보 */}
        <Flex
          w={header[3]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
            {item.user.nickName}
          </Text>
          {/* <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
            아이디
          </Text> */}
        </Flex>
        {/* 예약자정보 */}
        <Flex
          w={header[4]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Flex flexDirection={'column'} alignItems={'center'}>
            <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
              {item.review.writeDate !== undefined
                ? formatDateDot(item.review.writeDate)
                : '-'}
            </Text>
          </Flex>
        </Flex>
        <Flex
          w={header[5]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'10px'}
        >
          {item.review?.replyDate !== null ? (
            <Flex
              borderRadius={'5px'}
              backgroundColor={ColorRed50}
              px={'6px'}
              py={'4px'}
            >
              <Text fontSize={'14px'} fontWeight={600} color={ColorRed}>
                답변완료
              </Text>
            </Flex>
          ) : (
            <Flex
              borderRadius={'5px'}
              backgroundColor={ColorGray500}
              px={'6px'}
              py={'4px'}
            >
              <Text fontSize={'14px'} fontWeight={600} color={ColorBlack}>
                미답변
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex
          w={header[6]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Flex
            px={'26px'}
            py={'7px'}
            borderRadius={'6px'}
            borderWidth={1}
            borderColor={ColorInputBorder}
            onClick={() => setReviewModal(true)}
          >
            <Text fontSize={'12px'} fontWeight={500} color={ColorGray700}>
              답변
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default ReviewCard;
