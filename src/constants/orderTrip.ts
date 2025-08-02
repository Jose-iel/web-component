import { FieldsName } from '../types';

export enum ORDER_TRIP_CONTEXTS {
  departure_type = 'departure_type',
  return_type = 'return_type',
}

export enum ORDER_TRIP_TYPES {
  DIRECT = 'direct',
  CONNECTION = 'connection',
  ONE_STOP = 'one_stop',
}

export const ONIBUS = '/onibus';

export const fields: FieldsName = {
  'origin-final': '/',
  'destination-final': '/',
  'departure-date-final': '?departureDate=',
  'return-date-final': '&returnDate=',
};

export const initialBooleanState = {
  departureDateInvalid: false,
  returnDateInvalid: false,
  originInvalid: false,
  destinationInvalid: false,
  loading: false,
  onlyDeparture: true,
  hideInputs: true,
};

export const INPUT_FIELDS = {
  ORIGIN: 'origin-final',
  DESTINATION: 'destination-final',
  DEPARTURE_DATE: 'departure-date-final',
  RETURN_DATE: 'return-date-final',
};

export const minDate = new Date(new Date().setDate(new Date().getDate() - 1));

export const formattedDate = {
  MDY: 'ddd MMM DD YYYY',
  YMD: 'YYYY-MM-DD',
  DMY: 'DD/MM/YYYY',
};

export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const defaultResult = [
  {
    id: 'no-result',
    name: 'Nenhum resultado',
    useGroupByCity: false,
    slug: '',
    city: {
      id: 0,
      name: '',
    },
  },
];

export const initialState = {
  visible: false,
  loading: false,
  noResult: false,
  hasTouched: false,
  hasFocus: false,
  geolocationLoading: false,
};
