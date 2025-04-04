import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderDetailItemType } from '@/apis/order/OrderApi.type';

import { ColorBlack, ColorDataTableBorderTop } from '@/utils/_Palette';
import { formatPhone } from '@/utils/format';
import { crypto } from '@/utils/crypto';

interface Props {
  info: OrderDetailItemType;
}
function OrderResevationInfo({ info }: Props) {
  return (
    <Box mt={'60px'}>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
        예약자 정보
      </Text>
      <Flex
        flexDirection={'column'}
        w={'100%'}
        borderTopColor={ColorDataTableBorderTop}
        borderTopWidth={1}
        mt={'15px'}
      >
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            예약자 이름
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.orderName !== null && crypto.decrypt(info.orderName) !== ''
              ? crypto.decrypt(info.orderName)
              : '-'}
          </Text>
        </Flex>

        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
            whiteSpace={'pre-wrap'}
          >
            {'예약자\n휴대폰번호'}
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.orderHp !== null && crypto.decrypt(info.orderHp) !== ''
              ? formatPhone(crypto.decrypt(info.orderHp))
              : '-'}
          </Text>
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            // flexShrink={0}
            color={ColorBlack}
            whiteSpace={'pre-wrap'}
          >
            {`예약/이용정보\n받을 이메일`}
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.orderHp !== null && crypto.decrypt(info.orderHp) !== ''
              ? info.orderEmail
              : '-'}
          </Text>
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            기타
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {info.orderRequestDetail !== null && crypto.decrypt(info.orderRequestDetail) !== ''
              ? crypto.decrypt(info.orderRequestDetail)
              : '-'}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default OrderResevationInfo;
