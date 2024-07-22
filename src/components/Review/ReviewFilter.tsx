import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';
import ImageButton from '@/components/common/ImageButton';

import {
  ColorGray50,
  ColorGray600,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import ReviewFiterSelectBox from './ReviewFiterSelectBox';
import { ReviewListParamsType } from '@/apis/review/ReviewApi.type';
import { useReviewFilterZuInfo } from '@/_store/ReviewFilterInfo';

// import LeftBox from './LeftBox';
// import RightBox from './RightBox';

interface Props {
  request: ReviewListParamsType;
  setRequest: React.Dispatch<React.SetStateAction<ReviewListParamsType>>;
}
function ReviewFilter({ request, setRequest }: Props) {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const { reviewFilterInfo, setReviewFilterInfo } = useReviewFilterZuInfo(
    (state) => state,
  );
  const onClickSubmit = () => {
    router.push(`/reviewList?page=1`);
    setRequest({
      ...request,
      searchType: request.searchType !== undefined ? request.searchType : '',
      searchKeyword:
        request.searchKeyword !== undefined ? request.searchKeyword : '',
      reply: request.reply !== undefined ? request.reply : '',
    });
    setReviewFilterInfo({
      ...reviewFilterInfo,
      searchType: request.searchType !== undefined ? request.searchType : '',
      searchKeyword:
        request.searchKeyword !== undefined ? request.searchKeyword : '',
      reply: request.reply !== undefined ? request.reply : '',
    });
    setGoodsInfo({
      reviewState: true,
    });
  };
  return (
    <Flex
      bgColor={ColorGray50}
      borderRadius={'12px'}
      p={'40px'}
      flexDirection={'column'}
    >
      <Flex flexDirection={'column'}>
        <ReviewFiterSelectBox
          request={request}
          setRequest={setRequest}
          search={search}
          setSearch={setSearch}
        />
      </Flex>
      <Flex justifyContent={'center'} mt={'45px'} gap={'10px'}>
        <ImageButton
          img="/images/Page/icon_reload.png"
          backgroundColor={ColorWhite}
          px={'48px'}
          text="초기화"
          onClick={() => {
            setRequest({
              ...request,
              pageNo: 0,
              searchKeyword: '',
              searchType: '',
              reply: '',
            });
            setReviewFilterInfo({
              ...request,
              pageNo: 0,
              searchKeyword: '',
              searchType: '',
              reply: '',
            });
            setGoodsInfo({
              reviewState: true,
            });
          }}
          borderColor={ColorGrayBorder}
          TextColor={ColorGray600}
          imgWidth={'15px'}
          imgHeight={'15px'}
          fontSize={'15px'}
          py="13px"
        />
        <CustomButton
          text="검색"
          fontSize="15px"
          color={ColorWhite}
          bgColor={ColorRed}
          borderColor={ColorRed}
          py="14px"
          px="67px"
          onClick={() => {
            onClickSubmit();
          }}
        />
        {/* <Button size="sm" text="검색" width={'160px'} /> */}
      </Flex>
    </Flex>
  );
}

export default ReviewFilter;
