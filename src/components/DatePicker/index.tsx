import { ChangeEvent, FC, useEffect, useRef, useState, useMemo } from 'react';
import { Input } from '../form/Input';
import { InputGroup } from '../form/InputGroup';
import Box from '../Box';
import { IconCalendar } from '../Icons/IconCalendar';
import { useOutsideClick } from '../../utils/useOutsideClick';
import { formattedDate } from '../../constants/orderTrip';
import { dateFormat, dateUtil, isValidDate, stringToDate } from '../../utils/dateFormate';
import { SessionStorage } from '../../utils/SessionStorage';
import CustomCalendar from './CustomCalendar';
import { checkInputError } from '../../utils/checkInputError';
// import { searchWidgetSelectDateDataLayer } from './datalayer';
import { NewDatePickerProps } from '../../types';
import simpleCms from '../../common/simpleCms.json';

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
  return `${rowForm ? 'w-1/2' : 'w-full'} md:w-1/2`;
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
    ${rowForm ? 'w-full' : 'w-[165px]'} md:w-full
    h-14 cursor-pointer border border-gray-400 gap-1
    hover:border-blue-600 hover:bg-blue-50 hover:transition-all hover:duration-300
    focus:border-blue-600 focus:bg-blue-50
    focus-within:border-blue-600 focus-within:bg-blue-50
  `;

  if (hasError) {
    classes += ' border-red-500';
  }

  if (isDepartureDate) {
    classes += rowForm 
      ? ' rounded-l-2xl border-r-0' 
      : ' rounded-none border-r-0';
  }

  if (isReturnDate) {
    classes += rowForm 
      ? ' rounded-r-2xl' 
      : ' rounded-r-[30px]';
  }

  if (isDisabled) {
    classes += ' border-gray-400 bg-gray-50 pointer-events-none';
  }

  return classes.trim();
};

export const NewDatePicker: FC<NewDatePickerProps> = ({
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
  const clickRef = useRef<HTMLElement>(null);
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
    // searchWidgetSelectDateDataLayer(name, whitelabelName, dateUtil(dateObj?.date).format('YYYY-MM-DD'), pageType);

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
      // searchWidgetSelectDateDataLayer(name, whitelabelName, dateValue, pageType);
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
          <Input
            {...props}
            label={validateMsgError({ hasError, errorMessage, textDefault: props.label })}
            type={isMobile && !disabled ? 'date' : 'text'}
            value={dateValue}
            placeholder={isMobile && isFocused ? '' : props.placeholder}
            onChange={handleInputChange}
            layout="default"
            id={id}
            fill
            icon={hasIcon ? <IconCalendar /> : undefined}
            error={validateMsgError({ hasError, errorMessage })}
            min={minDateMobileInput}
            customInput
            className="border-none rounded-[80px] h-5 w-[97%] p-2"
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

export default NewDatePicker;
