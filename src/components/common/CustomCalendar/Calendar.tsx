import React, { useState } from 'react';

import moment from 'moment';

import {
  Box,
  Divider,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

import CalendarHeader from './_fragments/CalendarHeader';

interface CalendarProps {
  handleDayClick?: (val: moment.Moment) => void;
}

const Calendar = ({ handleDayClick }: CalendarProps) => {
  const [date, setDate] = useState<moment.Moment>(() => moment());

  const toast = useToast();

  const _handleDayClick = (current: moment.Moment | any) => {
    setDate(current);
    const momentNow = moment().format('YYYY-MM-DD');
    const selecetMoment = moment(current).format('YYYY-MM-DD');
    // if(new Date(current) < new Date()){
    //   toast({
    //     position: 'top',
    //     duration: 1000,
    //     render: () => (
    //       <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
    //         오늘 날짜보다 이전 날짜는 선택할 수 없습니다.
    //       </Box>
    //     ),
    //   });
    // } else{
    //   setDate(current);
    // }
    if (selecetMoment < momentNow) {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            오늘 날짜보다 이전 날짜는 선택할 수 없습니다.
          </Box>
        ),
      });
    } else {
      setDate(current);
    }
    if (handleDayClick) {
      if (selecetMoment < momentNow) {
      } else {
        handleDayClick(current);
      }
    }

    // if (handleDayClick) {
    //   // if(new Date(current) < new Date()){

    //   // }else{
    //   setTimeout(() => {
    //     handleDayClick(current);
    //   }, 500);

    //   // }
    // }
  };
  // chalandar generate logic
  function generate() {
    // 님 날짜 뭐 눌렀어요? (초기값은 오늘)
    const today = date;
    const daily = moment();
    // startOf('month') : 이번 달의 첫번 째 날로 설정 set to the first of this month, 12:00 am
    // week() : Week of Year. 이번 년도의 몇번째 주인가? => 3월 8일이면 10이겠죠?
    const startWeek = today.clone().startOf('month').week();

    // endOf('month').week() : 이번 달의 마지막 날로 설정 한 후 그것이 이번 년도의 몇번째 주인지 체크
    // 만약 이번 해의 첫번째 주(1월 1일이 속한 주)라면 53으로 세팅, 아니라면 그대로 유지
    // 이런 작업의 이유는 마지막 주가 첫 주가 될 수 없기 때문에 당연한 것임
    const endWeek =
      today.clone().endOf('month').week() === 1
        ? 53
        : today.clone().endOf('month').week();

    const calendar = [];

    // 시작 주부터 마지막 주까지 +1 씩 증가시킴
    // 이제 주마다 일을 표기해야 하므로 len이 7인 arr를 생성 후 index를 기반으로 day를 표기하자
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <Flex
          key={week}
          background="#FAFAFA"
          justifyContent="center"
          alignItems="center"
        >
          {Array(7)
            .fill(0)
            .map((n, i) => {
              // 오늘 => 주어진 주의 시작 => n + i일 만큼 더해서 각 주의 '일'을 표기한다.
              const current = today
                .clone()
                .week(week)
                .startOf('week')
                .add(n + i, 'day');
              // 오늘이 current와 같다면 우선 '선택'으로 두자
              const isSelected =
                daily.format('YYYYMMDD') === current.format('YYYYMMDD')
                  ? 'selected'
                  : '';

              // 만약, 이번 달이 아닌 다른 달의 날짜라면 회색으로 표시하자
              const isRed = i === 0;
              const isGrayed =
                current.format('MM') !== today.format('MM') ? 'grayed' : '';

              const isBlakced =
                daily.format('YYYYMMDD') < current.format('YYYYMMDD');
              return (
                <Flex
                  key={current.format('YYYYMMDD')}
                  onClick={() => _handleDayClick(current)}
                  cursor="pointer"
                  // borderTopWidth="1px"
                  // borderLeftWidth="1px"
                  border="1px solid #FAFAFA"
                  background="#FAFAFA"
                  alignItems="center"
                  justifyContent="center"
                  w="44px"
                  h="44px"
                  borderRadius="50%"
                  bg={isSelected ? 'primary.500' : '#FAFAFA'}
                >
                  <Flex
                    w="44px"
                    h="44px"
                    fontSize="14px"
                    justifyContent="center"
                    alignItems="center"
                    color={
                      isSelected
                        ? 'white'
                        : isGrayed
                        ? 'gray.200'
                        : isRed
                        ? 'red'
                        : isBlakced
                        ? 'black'
                        : 'gray.500'
                    }
                  >
                    {current.format('D')}
                  </Flex>
                </Flex>
              );
            })}
        </Flex>,
      );
    }
    return calendar;
  }

  return (
    <>
      <CalendarHeader date={date} setDate={setDate} />
      <Divider />
      <Box w="100%">
        <Flex background="#FAFAFA" justifyContent="center" alignItems="center">
          <Flex border="1px solid #FAFAFA">
            {['일', '월', '화', '수', '목', '금', '토'].map((el) => (
              <Flex
                p="0px"
                w="44px"
                h="44px"
                color={el === 'SUN' ? 'red' : 'gray.500'}
                border="1px solid #FAFAFA"
                key={el}
              >
                <Flex
                  fontSize="12px"
                  textAlign="center"
                  w="44px"
                  h="44px"
                  justifyContent="center"
                  alignItems="center"
                >
                  {el}
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Box borderRightWidth="1px">{generate()}</Box>
      </Box>
    </>
  );
};

export default Calendar;
