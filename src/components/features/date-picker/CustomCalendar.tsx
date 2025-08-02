import React, { useState, useMemo } from 'react';
import Box from '../../ui/Box';

interface CustomCalendarProps {
  onDateSelected: (dateObj: { date: Date }) => void;
  date?: Date;
  minDate?: Date;
  monthsToDisplay?: number;
  handleClean?: () => void;
  validDates?: Date[];
  useClean?: boolean;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  onDateSelected,
  date,
  minDate,
  monthsToDisplay = 2,
  handleClean,
  validDates,
  useClean = false,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = useMemo(() => {
    const monthArray = [];
    for (let i = 0; i < monthsToDisplay; i++) {
      const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + i, 1);
      monthArray.push(monthDate);
    }
    return monthArray;
  }, [currentMonth, monthsToDisplay]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    
    // Adicionar dias em branco no início
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Adicionar dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (validDates && validDates.length > 0) {
      return !validDates.some(validDate => 
        validDate.toDateString() === date.toDateString()
      );
    }
    return false;
  };

  const isDateSelected = (checkDate: Date) => {
    return date && checkDate.toDateString() === date.toDateString();
  };

  const handleDateClick = (selectedDate: Date) => {
    if (!isDateDisabled(selectedDate)) {
      onDateSelected({ date: selectedDate });
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <Box className="absolute top-full left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-1">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded"
          type="button"
        >
          &#8249;
        </button>
        
        {useClean && handleClean && (
          <button
            onClick={handleClean}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
            type="button"
          >
            Limpar
          </button>
        )}
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded"
          type="button"
        >
          &#8250;
        </button>
      </div>

      <div className={`grid ${monthsToDisplay > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {months.map((month, monthIndex) => (
          <div key={monthIndex} className="min-w-[280px]">
            <div className="text-center font-semibold mb-2">
              {monthNames[month.getMonth()]} {month.getFullYear()}
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(month).map((day, dayIndex) => {
                if (!day) {
                  return <div key={dayIndex} className="p-2" />;
                }
                
                const disabled = isDateDisabled(day);
                const selected = isDateSelected(day);
                
                return (
                  <button
                    key={dayIndex}
                    onClick={() => handleDateClick(day)}
                    disabled={disabled}
                    className={`
                      p-2 text-sm rounded hover:bg-blue-50 transition-colors
                      ${disabled 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-700 hover:text-blue-600'
                      }
                      ${selected 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : ''
                      }
                    `}
                    type="button"
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CustomCalendar;
