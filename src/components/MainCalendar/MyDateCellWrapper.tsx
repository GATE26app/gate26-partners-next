import { DateListType } from '@/apis/calendar/CalendarApi.type';
import {
  ColorBlack,
  ColorGrayBorder,
  ColorRed,
  ColorRed50,
} from '@/utils/_Palette';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

function MyDateCellWrapper(event) {
  const result = [
    event.title.split(', ').reduce((acc, item) => {
      const [key, value] = item.split(':').map((str) => str.trim());
      acc[key] = Number(value);
      return acc;
    }, {}),
  ];

  return (
    <Flex
      flexDirection={'column'}
      // pt={'45px'}
      w={'100%'}
    >
      {result.length > 0
        ? result.map((item, index) => {
            return (
              <>
                {item.paymentCnt ? (
                  <Flex
                    bgColor={ColorRed50}
                    py={'9px'}
                    px={'10px'}
                    alignItems={'center'}
                    gap={'5px'}
                  >
                    <Box
                      bgColor={ColorRed}
                      w={'8px'}
                      h={'8px'}
                      borderRadius={'10px'}
                    ></Box>
                    <Text fontWeight={400} fontSize={'14px'} color={ColorBlack}>
                      결제완료
                    </Text>
                    <Text fontWeight={500} fontSize={'14px'} color={ColorRed}>
                      ({item.paymentCnt})
                    </Text>
                  </Flex>
                ) : null}
                {item.reservationCnt ? (
                  <Flex
                    bgColor={'rgba(0,223,152,0.1)'}
                    py={'9px'}
                    px={'10px'}
                    alignItems={'center'}
                    gap={'5px'}
                  >
                    <Box
                      bgColor={'#00DF98'}
                      w={'8px'}
                      h={'8px'}
                      borderRadius={'10px'}
                    ></Box>
                    <Text fontWeight={400} fontSize={'14px'} color={ColorBlack}>
                      예약확정
                    </Text>
                    <Text fontWeight={500} fontSize={'14px'} color={'#00DF98'}>
                      ({item.reservationCnt})
                    </Text>
                  </Flex>
                ) : null}
                {item.dateTimeOfUseCnt ? (
                  <Flex
                    bgColor={'rgba(13,104,245,0.1)'}
                    py={'9px'}
                    px={'10px'}
                    alignItems={'center'}
                    gap={'5px'}
                  >
                    <Box
                      bgColor={'#0D68F5'}
                      w={'8px'}
                      h={'8px'}
                      borderRadius={'10px'}
                    ></Box>
                    <Text fontWeight={400} fontSize={'14px'} color={ColorBlack}>
                      이용일
                    </Text>
                    <Text fontWeight={500} fontSize={'14px'} color={'#0D68F5'}>
                      ({item.dateTimeOfUseCnt})
                    </Text>
                  </Flex>
                ) : null}
                {item.completeCnt ? (
                  <Flex
                    bgColor={'rgba(181,132,255,0.1)'}
                    py={'9px'}
                    px={'10px'}
                    alignItems={'center'}
                    gap={'5px'}
                  >
                    <Box
                      bgColor={'#B584FF'}
                      w={'8px'}
                      h={'8px'}
                      borderRadius={'10px'}
                    ></Box>
                    <Text fontWeight={400} fontSize={'14px'} color={ColorBlack}>
                      이용완료
                    </Text>
                    <Text fontWeight={500} fontSize={'14px'} color={'#B584FF'}>
                      ({item.completeCnt})
                    </Text>
                  </Flex>
                ) : null}
                {item.cancelCnt ? (
                  <Flex
                    bgColor={'rgba(62,62,61,0.1)'}
                    py={'9px'}
                    px={'10px'}
                    alignItems={'center'}
                    gap={'5px'}
                  >
                    <Box
                      bgColor={'#3E3E3D'}
                      w={'8px'}
                      h={'8px'}
                      borderRadius={'10px'}
                    ></Box>
                    <Text fontWeight={400} fontSize={'14px'} color={ColorBlack}>
                      취소
                    </Text>
                    <Text fontWeight={500} fontSize={'14px'} color={'#3E3E3D'}>
                      ({item.cancelCnt})
                    </Text>
                  </Flex>
                ) : null}
              </>
            );
          })
        : null}
    </Flex>
  );
}

export default MyDateCellWrapper;
