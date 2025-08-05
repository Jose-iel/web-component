import type { ReactElement, ReactNode } from 'react';
import { InputProps } from '../components/form/Input';

export type WidgetFormProps = {
  sendInfoToDataLayer?: () => void;
  rowForm?: boolean;
  displayRadio?: boolean;
  title?: string;
};

export type FieldsName = {
  [key: string]: string;
};

export interface IPlacesInput {
  id: string | number;
  name: string;
  slug: string;
  useGroupByCity?: boolean;
  city?: {
    id: number;
    name: string;
  };
  state?: {
    code: string;
    name: string;
  };
  latlon?: {
    lat: number;
    lon: number;
  };
}

export type PageInfoProps = {
  pageType: string;
  store: string;
  pageTitle?: string;
};

export interface ISearchFormData {
  origin?: IPlacesInput;
  destination?: IPlacesInput;
  expand?: boolean;
  pageInfo?: PageInfoProps;
}

export interface ISearchProviderProps {
  searchFormData?: ISearchFormData;
  children: ReactElement | ReactNode;
  version?: number;
}

type Methods = {
  delete(key: string, path?: string): void;
  deleteAll(): void;
  get<T = unknown>(key: string): T | string | null;
  has(key: string): boolean;
  json<T>(): T;
};

export type Dict<T = any> = Record<string, T>;

export type TypeStorage = Methods & {
  set<T = unknown>(key: string, object: T): void;
};

export type SearchFormProviderDefaultProps<ISearchFormData> = Omit<ISearchProviderProps, 'children'> & {
  setSearchFormData: (searchFormData: ISearchFormData) => void;
};

export interface IReversePlacesButton {
  rowForm: boolean;
  reversePlacesInput: () => void;
}

export interface NewDatePickerProps extends InputProps {
  id: string;
  name: string;
  monthsToDisplay?: number;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  pageType: string;
  minDate?: Date;
  placeholder?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  setDate?(date?: Date): void;
  hasIcon?: boolean;
  validDates?: Date[];
  isReturnDate?: boolean;
  isDepartureDate?: boolean;
  rowForm?: boolean;
}

export interface NewPlacesInputProps extends InputProps {
  id: string;
  name: string;
  label: string;
  icon?: ReactNode;
  isRequired?: boolean;
  isInvalid?: boolean;
  idNextFocus?: string;
  scrollTo?: 'mobile' | 'desktop' | 'both';
  loadStorageValue?: boolean;
  initialValue?: IPlacesInput | null;
  initialPlaces?: IPlacesInput[] | null;
  pageType: string;
  isOriginInput?: boolean;
  isDestinationInput?: boolean;
  rowForm?: boolean;
  setSelectedPlace?: React.Dispatch<React.SetStateAction<IPlacesInput | null | undefined>>;
  setUsageGeolocationOn?: React.Dispatch<React.SetStateAction<string>>;
  disableGeolocation?: boolean;
}


export interface HttpError extends Record<string, any> {
  data: any;
  message: any;
  error: any;
  transactionId?: string;
}

export interface GeolocationButtonProps {
  onLocationRetrieved: (lat: number, long: number) => void;
  loading: boolean;
}

export interface PlaceItemProps {
  place: IPlacesInput;
  handleClickItem: (place: IPlacesInput) => void;
  noResult: boolean;
  textPattern: RegExp;
}

export type ClientId = string | number;