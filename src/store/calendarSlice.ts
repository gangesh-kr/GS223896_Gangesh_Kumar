import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarWeek } from '../types';

// interface CalendarState {
//   weeks: CalendarWeek[];
// }

// const initialState: CalendarState = {
//   weeks: [],
// };

const generateSampleCalendar = (): CalendarWeek[] => {
  const months = ['January', 'February', 'March'];
  const weeks: CalendarWeek[] = [];
  
  let weekCounter = 1;
  months.forEach(month => {
    for (let i = 1; i <= 4; i++) {
      const weekNumber = weekCounter++;
      const formattedWeekNumber = weekNumber.toString().padStart(2, '0');
      
      weeks.push({
        id: `week-${formattedWeekNumber}`,
        weekNumber: formattedWeekNumber,
        month,
        startDate: `${month.substring(0, 3)} ${(i - 1) * 7 + 1}`,
        endDate: `${month.substring(0, 3)} ${i * 7}`,
      });
    }
  });
  
  return weeks;
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    weeks: generateSampleCalendar(),
  },
  reducers: {
    setCalendar: (state, action: PayloadAction<CalendarWeek[]>) => {
      state.weeks = action.payload;
    },
  },
});

export const { setCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;