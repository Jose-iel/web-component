/* eslint-disable arrow-body-style */
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import dayTimezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';
import { OrderTrips } from '../types';
import { ORDER_TRIP_CONTEXTS } from '../constants/orderTrip';

dayjs.extend(utc);
dayjs.extend(dayTimezone);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

const defaultLocale = 'pt-BR';
const defaultDateFormat = 'DD/MM/YYYY';
const defaultTimeZone = 'America/Sao_Paulo';
const defaultDateIntlFormat: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
};

const replaceCommaPoint = (value: string) => {
  return Number(value.replace(',', '.'));
};

const priceToTwoDigits = (price?: string) => {
  if (!price) return '';
  return Number(replaceCommaPoint(price)).toFixed(2).toString().replace('.', ',');
};

const currency = (_currency = 'BRL', locale = defaultLocale): Intl.NumberFormat => {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: _currency,
  });
};

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

const dateMonthFormat = (
  date: Date | number,
  dayFormat = defaultDateIntlFormat.day,
  monthFormat = defaultDateIntlFormat.month
) => {
  return new Intl.DateTimeFormat(defaultLocale, {
    day: dayFormat,
    month: monthFormat,
  }).format(date);
};

const stringToDate = (date: string, format = defaultDateFormat, strict = true): Date => {
  return dayjs(date, format, strict).toDate();
};

const isValidDate = (date: string | Date | number, format = defaultDateFormat, strict = true): boolean => {
  return dayjs(date, format, strict).isValid();
};

const formatDayOfWeekName = (date: string | Date | number) => {
  const daysOfWeek: any = {
    Sun: 'Domingo',
    Mon: 'Segunda',
    Tue: 'Terça',
    Wed: 'Quarta',
    Thu: 'Quinta',
    Fri: 'Sexta',
    Sat: 'Sábado',
  };

  const day = dayjs(date).format('ddd');
  return daysOfWeek[day];
};

const formatMonthName = (date: number | string) => {
  const monthName: any = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  };

  const month = parseInt(dayjs(date).format('MM'), 10);
  return monthName[month];
};

const formatMonthSmallName = (date: number | string) => {
  const monthName: any = {
    1: 'Jan',
    2: 'Fev',
    3: 'Mar',
    4: 'Abr',
    5: 'Mai',
    6: 'Jun',
    7: 'Jul',
    8: 'Ago',
    9: 'Set',
    10: 'Out',
    11: 'Nov',
    12: 'Dez',
  };

  const month = parseInt(dayjs(date).format('MM'), 10);
  return monthName[month];
};

const dateUtil = dayjs;

const durationISOFormat = (duration: string) => {
  const durationArray = duration.split('d');
  let isoFormat = '';
  if (durationArray[0] != durationArray[1] && durationArray[1]) {
    isoFormat = durationArray[0] + 'DT' + durationArray[1];
  } else {
    isoFormat = 'T' + durationArray[0];
  }
  return 'P' + isoFormat.toUpperCase().replace(' ', '');
};

const formatURL = (url: string) => {
  if (typeof url !== 'string') {
    throw new Error('Invalid URL format');
  }

  url = url ?? '';

  if (url.includes('http')) {
    return url;
  }

  if (url.includes('localhost')) {
    return `http://${url}`;
  }

  return `https://${url}`;
};

const dayDiff = (arrivalScheduleDate?: string, departureScheduleDate?: string, asString?: boolean) => {
  if (!arrivalScheduleDate || !departureScheduleDate) return null;

  const dayJsDiff = dayjs(arrivalScheduleDate).diff(departureScheduleDate, 'days');
  const dayDiffEqualZero = dayJsDiff === 0 ? '' : `+${dayJsDiff}`;
  return asString ? dayDiffEqualZero : dayJsDiff;
};

const isSameDate = (firstDate: string, secondDate: string) => {
  return dateUtil(firstDate).isSame(dateUtil(secondDate));
};

const formatDateWithWeekNameDayAndMonth = (date: string, formatType?: string) => {
  const format = formatType || 'dddd, DD [de] MMMM';
  const formattedDate = dateFormat({ date, format });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).replace('-feira', '');
};

const formatDateOfDeparture = (trips: OrderTrips, context: ORDER_TRIP_CONTEXTS) => {
  const date = String(trips[context]?.departure.schedule.date);
  return formatDateWithWeekNameDayAndMonth(date);
};

const addDaysToFormatDate = (date: string, daysToAdd: number) => {
  const newDate = dayjs(date).add(daysToAdd, 'day');
  return formatDateWithWeekNameDayAndMonth(newDate.format('YYYY-MM-DD'), '[chegada em] DD [de] MMMM');
};

const toQueryString = (objectParams: Record<string, string>) => {
  const query = new URLSearchParams(objectParams);
  return query.toString();
};

const formatDayMonthYear = (dateStr: string) => {
  if (!dateStr) return null;

  const date = dateStr.split('/');
  return `${date[2]}-${date[1]}-${date[0]}`;
};

const obfuscateValue = (value: string, visibleChars: number = 3): string => {
  if (!value) return '';
  if (value.length <= visibleChars) return value;
  return `${value.slice(0, visibleChars)}${'*'.repeat(value.length - visibleChars)}`;
};

const formatterDisplayName = (text: string): string => {
  if (!text) return '';

  const words = text.trim().split(' ');

  return words
    .map((word, index) => {
      const isHyphen = word === '-';
      const isFirst = index === 0;
      const isLast = index === words.length - 1;

      if (isHyphen) return word;

      if ((isFirst || isLast) && word.length === 2) {
        return word.toUpperCase();
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

const formatDateLabel = (isoDate: string) => {
  const date = dayjs(isoDate).locale('pt-br');
  const dayOfWeek = date.format('dddd').replace('-feira', '');
  const shortDate = date.format('DD MMM');
  return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}\n${shortDate}`;
};

const formatTimeOnlyHourMinute = (time: string): string => {
  const parsedWithSeconds = dayjs(time, 'HH:mm:ss', true).locale('pt-br');
  if (parsedWithSeconds.isValid()) {
    return parsedWithSeconds.format('HH:mm');
  }

  const parsedWithoutSeconds = dayjs(time, 'HH:mm', true).locale('pt-br');
  if (parsedWithoutSeconds.isValid()) {
    return parsedWithoutSeconds.format('HH:mm');
  }

  return time;
};

export {
  replaceCommaPoint,
  priceToTwoDigits,
  currency,
  dateFormat,
  isValidDate,
  stringToDate,
  dateUtil,
  dateMonthFormat,
  durationISOFormat,
  formatterDisplayName,
  formatDateLabel,
  formatTimeOnlyHourMinute,
  formatDayOfWeekName,
  formatDateWithWeekNameDayAndMonth,
  formatMonthName,
  formatMonthSmallName,
  formatURL,
  dayDiff,
  isSameDate,
  formatDateOfDeparture,
  addDaysToFormatDate,
  toQueryString,
  formatDayMonthYear,
  obfuscateValue,
};
