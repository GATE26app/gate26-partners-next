import React from 'react';

import moment from 'moment';

import { Center, Flex, Text } from '@chakra-ui/react';

import ArrowLeftIcon from '@icons/System/ArrowLeft';
import ArrowRightIcon from '@icons/System/ArrowRight';

interface CalendarHeaderProps {
  date: moment.Moment;
  setDate: (val: moment.Moment) => void;
}

const CalendarHeader = ({ date, setDate }: CalendarHeaderProps) => {
  // const returnToday = () => setDate(moment());
  const jumpToMonth = (num: number) =>
    num
      ? setDate(date.clone().add(1, 'month'))
      : setDate(date.clone().subtract(1, 'month'));

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      background="#FAFAFA"
      mt="20px"
      paddingTop={'25px'}
      paddingBottom={'20px'}
      borderTopLeftRadius={'20px'}
      borderTopRightRadius={'20px'}
    >
      <Center
        w="24px"
        h="24px"
        mr="10px"
        cursor="pointer"
        onClick={async () => {
          jumpToMonth(0);
        }}
      >
        <ArrowLeftIcon />
      </Center>

      <Text fontWeight="700" fontSize="16px" color="#FF5942">
        {date.format('YYYY년 MM월')}
      </Text>

      <Center
        w="24px"
        h="24px"
        ml="10px"
        cursor="pointer"
        onClick={() => {
          jumpToMonth(1);
        }}
      >
        <ArrowRightIcon />
      </Center>
    </Flex>
  );
};

export default CalendarHeader;
