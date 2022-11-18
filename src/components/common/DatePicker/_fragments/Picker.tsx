import dayjs from 'dayjs';

import { Flex, Text } from '@chakra-ui/react';

import { PickerGrid, PickerGridItem } from './DatePicker.style';
import CalendarHeader from './PickerHeader';

interface DatePickerProps {
  date: dayjs.Dayjs;
  onDayClick?: (val: dayjs.Dayjs) => void;
  setDate: (val: dayjs.Dayjs) => void;
}
const Picker = ({ date, onDayClick, setDate }: DatePickerProps) => {
  function generate() {
    const today = date;
    const startWeek = today?.clone().startOf('month').week();
    const endWeek =
      today?.clone().endOf('month').week() === 1
        ? 53
        : today?.clone().endOf('month').week();

    const calendar = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <PickerGrid key={week} gridTemplateColumns={'repeat(7, 1fr)'}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              const current = today
                .clone()
                .week(week)
                .startOf('week')
                .add(n + i, 'day');
              const isSelected =
                today.format('YYYYMMDD') === current.format('YYYYMMDD');
              const isGrayed = current.format('MM') !== today.format('MM');
              const isToday =
                current.format('YYYYMMDD') === dayjs().format('YYYYMMDD');
              return (
                <div
                  key={current.format('YYYYMMDD')}
                  style={{ backgroundColor: 'white' }}
                >
                  <PickerGridItem
                    onClick={() => onDayClick && onDayClick(current)}
                    cursor="pointer"
                    borderRadius={'full'}
                    bg={isSelected ? 'primary.500' : 'white'}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontSize="14px"
                        textAlign="left"
                        fontWeight={isToday ? 'bold' : 'normal'}
                        color={
                          isGrayed ? 'gray.500' : isSelected ? 'white' : 'black'
                        }
                      >
                        {current.format('D')}
                      </Text>
                    </Flex>
                  </PickerGridItem>
                </div>
              );
            })}
        </PickerGrid>,
      );
    }

    const rowCnt = endWeek - startWeek + 1;
    return (
      <PickerGrid
        templateRows={`repeat(${rowCnt}, 1fr)`}
        height={`${rowCnt * 44}px`}
      >
        {calendar}
      </PickerGrid>
    );
  }

  return (
    <div>
      <CalendarHeader date={date} setDate={setDate} />
      <PickerGrid templateColumns={'repeat(7, 1fr)'}>
        {['일', '월', '화', '수', '목', '금', '토'].map((el) => (
          <PickerGridItem w="42.8px" h="44px" key={el} color="gray.700">
            {el}
          </PickerGridItem>
        ))}
      </PickerGrid>
      {generate()}
    </div>
  );
};

export default Picker;
