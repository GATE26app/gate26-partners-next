'use client';
import CalendarComponent from '@/components/MainCalendar/CalendarComponent';
import CalendarInfo from '@/components/MainCalendar/CalendarInfo';
import {
  ColorBlack00,
  ColorGray100,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

function page() {
  return (
    <Box w={'100%'}>
      <Flex
        justifyContent={'space-between'}
        mb={'26px'}
        position={'sticky'}
        top={'150px'}
        zIndex={99}
      >
        <Flex alignItems={'center'}>
          <Image
            src={'/images/Page/ico_order.png'}
            width={'20px'}
            height={'20px'}
            alt="주문관리"
          />
          <Text
            fontWeight={800}
            fontSize={'22px'}
            color={ColorBlack00}
            pl={'10px'}
          >
            예약/주문캘린더
          </Text>
        </Flex>
      </Flex>
      <CalendarInfo />
    </Box>
  );
}

export default page;
