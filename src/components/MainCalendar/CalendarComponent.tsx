import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
function CalendarComponent() {
  const [value, onChange] = useState<Value>(new Date());
  return <Calendar locale="ko" onChange={onChange} value={value} />;
}

export default CalendarComponent;
