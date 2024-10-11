import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';
import moment from 'moment';
import CalendarToolbar from './CalendarToolbar';
import 'moment/locale/ko'; // 한글 로케일 불러오기
import MyDateCellWrapper from './MyDateCellWrapper';
import { useGetCalendarList } from '@/apis/calendar/CalendarApi.mutation';
import {
  DataType,
  DateListType,
  StatusType,
} from '@/apis/calendar/CalendarApi.type';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type RangeDateType = {
  start: Date;
  end: Date;
};
function CalendarInfo() {
  moment.locale('ko-KR');
  const calendarRef = useRef(null);
  const localizer = momentLocalizer(moment);
  const [date, setDate] = useState(new Date());
  const [dateRange, setDateRange] = useState<any>(null);
  const [DateStatus, setDateStatus] = useState<StatusType>(); //캘린더 상태값
  const [calendarData, setCalendarData] = useState<DateListType[]>();
  const [calendarEvent, setCalendarEvnet] = useState([]); //이벤트 리스트

  const getCurrentRange = (view, currentDate: Date) => {
    const start = moment(currentDate).startOf(view.toLowerCase());
    const end = moment(currentDate).endOf(view.toLowerCase());
    return { start: start.toDate(), end: end.toDate() };
  };
  useEffect(() => {
    // 페이지 로드 시 현재 달력의 첫날과 끝날 계산
    if (calendarRef.current) {
      const currentView = Views.MONTH; // 현재 보고 있는 view를 설정 (Month, Week, etc.)
      const currentDate = new Date(); // 달력의 현재 날짜
      const range = getCurrentRange(currentView, currentDate);
      setDateRange(range);
    }
  }, []);
  const handleRangeChange = (range: any) => {
    setDateRange(range);
  };

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );

  //캘린더 리스트 부르기
  const { mutate: CalendarMutate, isLoading } = useGetCalendarList({
    options: {
      onSuccess: async (res) => {
        if (res.success == true) {
          setDateStatus(res.data?.status);
          setCalendarData(res.data?.dates);
        }
      },
    },
  });

  useEffect(() => {
    if (dateRange) {
      const obj = {
        periodStartDate: moment(dateRange.start).format('YYYY-MM-DD'),
        periodEndDate: moment(dateRange.end).format('YYYY-MM-DD'),
      };
      CalendarMutate(obj);
    }
  }, [dateRange]);

  useEffect(() => {
    if (calendarData) {
      const data = calendarData
        .map((event) => ({
          start: new Date(event.date),
          end: new Date(event.date), // Assuming it's a single day event
          title: Object.entries(event.status)
            .filter(([_, count]) => count > 0)
            .map(([key, count]) => `${key}: ${count}`)
            .join(', '),
        }))
        .filter((event) => event.title !== '');
      setCalendarEvnet(data);
    }
  }, [calendarData]);

  return (
    <Flex flexDirection={'row'} gap={'45px'}>
      {/* 캘린더 */}
      <Calendar
        ref={calendarRef}
        localizer={localizer}
        style={{ width: '100%', height: 1500 }}
        components={{
          toolbar: (props) => CalendarToolbar(props, DateStatus),
          event: MyDateCellWrapper,
        }}
        events={calendarEvent}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={onNavigate}
        onRangeChange={handleRangeChange}
      />
    </Flex>
  );
}

export default CalendarInfo;
