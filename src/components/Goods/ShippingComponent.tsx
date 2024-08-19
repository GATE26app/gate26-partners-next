import React, { useEffect, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { GoodsBasicProps } from '@/apis/goods/GoodsApi.type';

import InputBox from '@/components/common/Input';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { intComma } from '@/utils/format';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { usePartnerZuInfo } from '@/_store/PartnerInfo';
import Link from 'next/link';

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
}

function ShippingComponent() {
  const { partnerInfo } = usePartnerZuInfo((state) => state);
  console.log('partnerInfo', partnerInfo);
  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderBottomWidth={0}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
      >
        <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
          배송비 정책
        </Text>
      </Flex>
      <Flex
        px={'30px'}
        py={'20px'}
        w={'100%'}
        flexDirection={'column'}
        borderWidth={1}
        borderColor={ColorGray400}
        borderBottomRadius={'12px'}
      >
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={'10px'}
        >
          <Box w={'150px'}>
            <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
              배송비
            </Text>
          </Box>
          {partnerInfo.shippingType !== 0 ? (
            <Text
              color={ColorBlack}
              fontSize={'15px'}
              fontWeight={400}
              px={'10px'}
            >
              {partnerInfo.shippingType == 1
                ? '무료'
                : partnerInfo.shippingType == 2
                  ? `${intComma(partnerInfo.shippingFee)}원`
                  : `${intComma(partnerInfo.shippingFee)}원 (${intComma(partnerInfo.shippingMinAmount)}원 이상 무료)`}
            </Text>
          ) : (
            <Link href={'/setting'}>
              <Text
                color={ColorRed}
                fontSize={'15px'}
                fontWeight={400}
                px={'10px'}
                textDecoration={'underline'}
              >
                배송비 정책 입력하기
              </Text>
            </Link>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ShippingComponent;
