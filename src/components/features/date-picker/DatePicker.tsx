import { ChangeEvent, FC, useEffect, useRef, useState, useMemo } from 'react';
import { Input } from '../../form/Input';
import { InputGroup } from '../../form/InputGroup';
import Box from '../../ui/Box';
import { IconCalendar } from '../../Icons/IconCalendar';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { formattedDate } from '../../../config/constants';
import { dateFormat, dateUtil, isValidDate, stringToDate } from '../../../utils/formatting/date-utils';
import { SessionStorage } from '../../../utils/storage/session-storage';
import CustomCalendar from './CustomCalendar';
import { checkInputError } from '../../../utils/validation/input-validation';
import { NewDatePickerProps } from '../../../types';
import simpleCms from '../../../config/cms-config.json';

export const cleanSetDate = (setDate: any) => {
  if (setDate) setDate(undefined);
};

export const validateMsgError = ({
  hasError,
  errorMessage,
  textDefault,
}: {
  hasError: boolean;
  errorMessage?: string;
  textDefault?: string;
}) => {
  return hasError ? errorMessage : textDefault;
};

// Função para gerar estilos do container
const getInputContainerStyles = (rowForm: boolean) => {
  return `w-full`;
};

// Função para gerar estilos do InputGroup
const getInputGroupStyles = (
  isReturnDate: boolean,
  isDepartureDate: boolean,
  isDisabled: boolean,
  hasError: boolean,
  rowForm: boolean
) => {
  let classes = `
    w-full h-auto cursor-pointer bg-transparent border-none
    flex items-center space-x-3 p-4
  `;

  if (isDepartureDate) {
    classes += ' border-r border-gray-200';
  }

  if (isDisabled) {
    classes += ' opacity-50 pointer-events-none';
  }

  return classes.trim();
};

export const DatePicker: FC<NewDatePickerProps> = ({
  id,
  name,
  minDate,
  setDate,
  monthsToDisplay = 2,
  errorMessage,
  isRequired = false,
  isInvalid = true,
  hasIcon = true,
  validDates,
  isReturnDate = false,
  isDepartureDate = false,
  disabled = false,
  rowForm = false,
  pageType,
  ...props
}: NewDatePickerProps) => {
  const isMobile = simpleCms.isMobile;
  // const whitelabelName = simpleCms.whitelabel.name;

  const ref = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<Date | undefined>();
  const [dateValue, setDateValue] = useState('');

  const [customCalendarVisible, setCustomCalendarVisible] = useState<boolean>(false);
  const [hasTouched, setHasTouched] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const hasError = checkInputError(isRequired, isInvalid, hasFocus, hasTouched, inputValue);

  const format = useMemo(() => (isMobile ? formattedDate.YMD : formattedDate.DMY), [isMobile]);
  const showDesktopCustomCalendar = !isMobile && customCalendarVisible;
  const minDateMobileInput = dateUtil(minDate).format('YYYY-MM-DD');
  const [isFocused, setIsFocused] = useState(false);

  useOutsideClick({ 
    ref: { current: ref.current as HTMLElement }, 
    handler: () => setCustomCalendarVisible(false) 
  });

  const onDateSelected = (dateObj: { date: Date }) => {
    setInputValue(dateObj?.date);
    setDateValue(dateFormat({ date: dateObj?.date }));
    setCustomCalendarVisible(false);

    if (setDate) {
      setDate(dateObj?.date);
      SessionStorage.set(id, dateObj?.date.toLocaleDateString());
    }
  };

  const handleClean = () => {
    setInputValue(undefined);
    setDateValue('');
    setCustomCalendarVisible(false);
    cleanSetDate(setDate);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setCustomCalendarVisible(true);
  };

  const handleBlurInput = () => {
    setIsFocused(false);
    setTimeout(() => setHasFocus(false), 200);
    if (isValidDate(dateValue, format)) {
      // Validation passed
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setDateValue(value);

    if (isValidDate(value, format)) {
      const date = stringToDate(value, format);
      setInputValue(date);
      if (setDate) setDate(date);
      setCustomCalendarVisible(false);
      return;
    }

    setInputValue(undefined);
    cleanSetDate(setDate);
  };

  const handleTouchOnDatePicker = () => {
    if (!isMobile) handleInputFocus();
    setHasTouched(true);
    setHasFocus(true);
  };

  const handleDisabled = () => {
    if (disabled) {
      setInputValue(undefined);
      setDateValue('');
      cleanSetDate(setDate);
    }
  };

  useEffect(() => {
    setCustomCalendarVisible(false);
  }, [inputValue]);

  useEffect(() => {
    handleDisabled();
  }, [disabled]);

  return (
    <Box className={getInputContainerStyles(rowForm)}>
      <div ref={ref}>
        <InputGroup
          size="md"
          onClick={handleTouchOnDatePicker}
          className={`relative ${getInputGroupStyles(isReturnDate, isDepartureDate, disabled, hasError, rowForm)}`}
          data-testid={id}
        >
          {hasIcon && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500">{props.label}</label>
            <p className={`font-medium ${dateValue ? 'text-gray-700' : 'text-gray-400'}`}>
              {dateValue || '__ /__ /__'}
            </p>
          </div>

          <Input
            {...props}
            label=""
            type={isMobile && !disabled ? 'date' : 'text'}
            value={dateValue}
            placeholder=""
            onChange={handleInputChange}
            layout="default"
            id={id}
            fill
            icon={undefined}
            error={validateMsgError({ hasError, errorMessage })}
            min={minDateMobileInput}
            customInput={false}
            className="sr-only"
            css={{ padding: '8px 0px' }}
            disabled={disabled}
            onFocus={handleInputFocus}
            onBlur={handleBlurInput}
            showErrorMessage={false}
            data-testid="date-picker-input"
          />

          <Input
            type="hidden"
            name={name}
            id={name}
            value={dateFormat({ date: inputValue, format: formattedDate.YMD }) || ''}
            data-testid="date-picker-input-final"
          />

          {showDesktopCustomCalendar && (
            <CustomCalendar
              onDateSelected={onDateSelected}
              date={inputValue}
              minDate={minDate}
              monthsToDisplay={monthsToDisplay}
              handleClean={handleClean}
              validDates={validDates}
              useClean
            />
          )}
        </InputGroup>
      </div>
    </Box>
  );
};

export default DatePicker;
