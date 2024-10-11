import { StatusType } from '@/apis/calendar/CalendarApi.type';
import {
  ColorBlack00,
  ColorGray100,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

function CalendarToolbar(props, DateStatus: StatusType) {
  const nowdate = new Date();
  const today = `${nowdate.getFullYear()}-${nowdate.getMonth() + 1 < 10 ? '0' + `${nowdate.getMonth() + 1}` : nowdate.getMonth() + 1}-${nowdate.getDate() < 10 ? '0' + nowdate.getDate() : nowdate.getDate()}`;

  const goToBack = () => {
    props.onNavigate('PREV');
  };
  const goToNext = () => {
    props.onNavigate('NEXT');
  };

  return (
    <Flex flexDirection={'column'} position={'relative'}>
      <Flex
        top={'208px'}
        position={'sticky'}
        w={'350px'}
        bgColor={ColorGray100}
        px={'25px'}
        pt={'25px'}
        pb={'30px'}
        borderRadius={'10px'}
        flexDirection={'column'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          w={'100%'}
          pb={'20px'}
        >
          <Text fontWeight={700} fontSize={'20px'} color={ColorBlack00}>
            {moment(props.date).format('YYYY')}년{' '}
            {moment(props.date).format('MM')}월
          </Text>
          <Flex alignItems={'center'} gap={'10px'}>
            <Box cursor={'pointer'} onClick={goToBack}>
              <Image
                src={'/images/commerce/ico_calendar_prev.png'}
                w={'35px'}
                h={'35px'}
              />
            </Box>
            <Box onClick={goToNext}>
              <Image
                src={'/images/commerce/ico_calendar_next.png'}
                w={'35px'}
                h={'35px'}
              />
            </Box>
          </Flex>
        </Flex>
        <Text
          fontWeight={600}
          fontSize={'15px'}
          color={ColorGray700}
          pb={'10px'}
        >
          {moment(props.date).format('YYYY')}년{' '}
          {moment(props.date).format('MM')}월 예약/주문현황
        </Text>
        <Flex
          bgColor={ColorWhite}
          p={'20px'}
          borderRadius={'10px'}
          flexDirection={'column'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            w={'100%'}
            pb={'20px'}
          >
            <Flex alignItems={'center'}>
              <Box
                bgColor={ColorRed}
                w={'8px'}
                h={'8px'}
                borderRadius={'10px'}
                mr={'10px'}
              ></Box>
              <Text fontWeight={500} fontSize={'15px'} color={ColorGray700}>
                결제완료
              </Text>
            </Flex>
            <Text fontWeight={600} fontSize={'15px'} color={ColorBlack00}>
              {DateStatus ? DateStatus.paymentCnt : 0}
            </Text>
          </Flex>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            w={'100%'}
            pb={'20px'}
          >
            <Flex alignItems={'center'}>
              <Box
                bgColor={'#00DF98'}
                w={'8px'}
                h={'8px'}
                borderRadius={'10px'}
                mr={'10px'}
              ></Box>
              <Text fontWeight={500} fontSize={'15px'} color={ColorGray700}>
                예약확정
              </Text>
            </Flex>
            <Text fontWeight={600} fontSize={'15px'} color={ColorBlack00}>
              {DateStatus ? DateStatus.reservationCnt : 0}
            </Text>
          </Flex>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            w={'100%'}
            pb={'20px'}
          >
            <Flex alignItems={'center'}>
              <Box
                bgColor={'#0D68F5'}
                w={'8px'}
                h={'8px'}
                borderRadius={'10px'}
                mr={'10px'}
              ></Box>
              <Text fontWeight={500} fontSize={'15px'} color={ColorGray700}>
                이용일
              </Text>
            </Flex>
            <Text fontWeight={600} fontSize={'15px'} color={ColorBlack00}>
              {DateStatus ? DateStatus.dateTimeOfUseCnt : 0}
            </Text>
          </Flex>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            w={'100%'}
            pb={'20px'}
          >
            <Flex alignItems={'center'}>
              <Box
                bgColor={'#B584FF'}
                w={'8px'}
                h={'8px'}
                borderRadius={'10px'}
                mr={'10px'}
              ></Box>
              <Text fontWeight={500} fontSize={'15px'} color={ColorGray700}>
                이용완료
              </Text>
            </Flex>
            <Text fontWeight={600} fontSize={'15px'} color={ColorBlack00}>
              {DateStatus ? DateStatus.completeCnt : 0}
            </Text>
          </Flex>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            w={'100%'}
          >
            <Flex alignItems={'center'}>
              <Box
                bgColor={'#3E3E3D'}
                w={'8px'}
                h={'8px'}
                borderRadius={'10px'}
                mr={'10px'}
              ></Box>
              <Text fontWeight={500} fontSize={'15px'} color={ColorGray700}>
                취소
              </Text>
            </Flex>
            <Text fontWeight={600} fontSize={'15px'} color={ColorBlack00}>
              {DateStatus ? DateStatus.cancelCnt : 0}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        w={'350px'}
        top={'583px'}
        position={'sticky'}
        bgColor={ColorGray100}
        borderRadius={'10px'}
        px={'25px'}
        py={'28px'}
        // backgroundImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='2' stroke-dasharray='20' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}
        borderTopWidth={3}
        borderTopColor={'#D6D6D6'}
        borderStyle={'dashed'}
        justifyContent={'space-between'}
      >
        <Text color={ColorRed} fontWeight={700} fontSize={'18px'}>
          Today
        </Text>
        <Text color={ColorBlack00} fontWeight={600} fontSize={'18px'}>
          {today}
        </Text>
      </Flex>
    </Flex>
  );
}

export default CalendarToolbar;
