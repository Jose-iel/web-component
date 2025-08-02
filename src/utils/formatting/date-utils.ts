import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayTimezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';

dayjs.extend(utc);
dayjs.extend(dayTimezone);
dayjs.extend(customParseFormat);

const defaultLocale = 'pt-BR';
const defaultDateFormat = 'DD/MM/YYYY';
const defaultTimeZone = 'America/Sao_Paulo';

interface DateFormatProps {
  date?: Date | string | null;
  locale?: string;
  format?: string;
  timezone?: string;
}

const dateFormat = ({
  date,
  format = defaultDateFormat,
  locale = defaultLocale,
  timezone = defaultTimeZone,
}: DateFormatProps): string => {
  if (!date) {
    return '';
  }
  return dayjs(date).tz(timezone).locale(locale.toLowerCase()).format(format);
};

const stringToDate = (date: string, format = defaultDateFormat, strict = true): Date => {
  return dayjs(date, format, strict).toDate();
};

const isValidDate = (date: string | Date | number, format = defaultDateFormat, strict = true): boolean => {
  return dayjs(date, format, strict).isValid();
};

const dateUtil = dayjs;

export {
  dateFormat,
  isValidDate,
  stringToDate,
  dateUtil,
};
