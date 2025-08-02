import { default as React } from 'react';
interface CustomCalendarProps {
    onDateSelected: (dateObj: {
        date: Date;
    }) => void;
    date?: Date;
    minDate?: Date;
    monthsToDisplay?: number;
    handleClean?: () => void;
    validDates?: Date[];
    useClean?: boolean;
}
declare const CustomCalendar: React.FC<CustomCalendarProps>;
export default CustomCalendar;
