import React, { RefObject, useRef, useState } from 'react';

import dayjs from 'dayjs';

import {
  Box,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

import { PickerGrid } from './_fragments/DatePicker.style';
import DateTimePicker from './_fragments/DateTimePicker';
import Picker from './_fragments/Picker';
import PickerFooter from './_fragments/PickerFooter';
import PickerInput from './_fragments/PickerInput';

import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

interface CalendarProps {
  type: 'date' | 'datetime';
  curDate: dayjs.Dayjs;
  width?: string;
  onApply?: (val: dayjs.Dayjs) => void;
}

const DatePicker = ({ type, curDate, width, onApply }: CalendarProps) => {
  const originDate = curDate?.clone();
  const [date, setDate] = useState<dayjs.Dayjs>(curDate);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initRef: RefObject<{ focus(): void }> = useRef(null);

  const handleDayClick = (current: dayjs.Dayjs) => {
    setDate(current);
  };

  const handleClose = () => {
    setDate(originDate);
    onClose();
  };
  const handleApply = () => {
    onClose();
    if (onApply) {
      onApply(date);
    }
  };

  const parseDate = (date: dayjs.Dayjs) => {
    const yyyymmdd = date?.format('YYYY-MM-DD');
    const ampm = date?.format('a');
    const hhmm = date?.format('HH:mm');

    return [yyyymmdd, ampm === 'am' ? '오전' : '오후', hhmm].join(' ');
  };
  return (
    <>
      <Popover
        initialFocusRef={initRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Box w={width}>
            <PickerInput text={parseDate(date)} />
          </Box>
        </PopoverTrigger>
        <PopoverContent bg={'white'} w={'100%'} maxH={'430px'}>
          <Flex direction={'column'}>
            <Flex columnGap={'25px'}>
              <Picker
                date={date}
                setDate={setDate}
                onDayClick={handleDayClick}
              />
              {type === 'datetime' && (
                <DateTimePicker date={date} onTimeClick={handleDayClick} />
              )}
            </Flex>

            <PickerGrid>
              <PickerFooter
                ref={initRef}
                onClickCancel={handleClose}
                onClickApply={handleApply}
              />
            </PickerGrid>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;