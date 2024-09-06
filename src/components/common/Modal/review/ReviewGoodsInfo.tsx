import { ReviewListItemType } from '@/apis/review/ReviewApi.type';
import { ColoLineGray, ColorBlack, ColorGray700 } from '@/utils/_Palette';
import { formatDateDash, getImagePath, imgPath } from '@/utils/format';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  data: ReviewListItemType;
}
function ReviewGoodsInfo({ data }: Props) {
  return (
    <Flex flexDirection={'column'}>
      <Text fontSize={'15px'} fontWeight={600} color={ColorBlack} pb={'5px'}>
        {data?.review.partner.title}
      </Text>
      <Flex
        flexDirection={'row'}
        gap={'5px'}
        alignItems={'center'}
        pb={'30px'}
        borderBottomColor={ColoLineGray}
        borderBottomWidth={1}
      >
        <Box
          w={'80px'}
          minWidth={'80px'}
          h={'80px'}
          borderRadius={'10px'}
          position={'relative'}
          overflow={'hidden'}
          mr={'10px'}
        >
          {data?.orderThumbnailImagePath && (
            <img
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
              }}
              src={
                data.orderThumbnailImagePath !== null ||
                data.orderThumbnailImagePath !== ''
                  ? getImagePath(data.orderThumbnailImagePath)
                  : '/images/no_img.png'
              }
              // onError={addDefaultImg}
              alt="이미지 업로드"
            />
          )}
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
              {data?.orderCategoryTitle}
            </Text>
            <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
              {data?.orderTitle}
            </Text>
          </Flex>
          {data?.orderDateTimeOfUse !== null &&
            data?.orderDateTimeOfUse !== undefined && (
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
                  {data?.orderDateTimeOfUse !== undefined
                    ? formatDateDash(data?.orderDateTimeOfUse)
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
              {data?.orderOptionTitle} * {data?.orderCnt}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ReviewGoodsInfo;
