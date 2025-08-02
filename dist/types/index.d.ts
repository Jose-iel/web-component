import { ReactElement, ReactNode } from 'react';
import { ORDER_TRIP_CONTEXTS, ORDER_TRIP_TYPES } from '../constants/orderTrip';
import { InputProps } from '../components/form/Input';
export type WidgetFormProps = {
    sendInfoToDataLayer?: () => void;
    rowForm?: boolean;
    displayRadio?: boolean;
};
export type FormFieldNames = {
    'origin-final': string;
    'destination-final': string;
    'departure-date-final': string;
    'return-date-final': string;
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
export type OrderTrips = {
    [ORDER_TRIP_CONTEXTS.departure_type]: OrderTripContext;
    [ORDER_TRIP_CONTEXTS.return_type]?: OrderTripContext;
};
export interface OrderSchedule {
    date: string;
    time: string;
    timezone: string;
}
export interface OrderBookingEngine {
    id: number;
    name: string;
    status: string | null;
}
export interface OrderTravelCompany {
    electronicBoardingPass: boolean;
    id: number;
    name: string;
    logo: string;
    slug?: string;
}
export interface OrderServiceClass {
    id: number;
    name: string;
}
export interface PassengerInfo {
    fullName: string;
    documentType: string;
    documentNumber: string;
}
export interface OrderPassengerInfo extends PassengerInfo {
    gender: string;
    type: string;
    dateBirth: string | null;
}
export type OrderTripType = `${ORDER_TRIP_TYPES}`;
export interface TicketItemDetails {
    bookingEngine: OrderBookingEngine;
    changedTrip?: boolean;
    tripChangeError?: boolean;
    newTicketId?: number;
    travelCompany: OrderTravelCompany;
    serviceNumber: null;
    serviceClass: OrderServiceClass;
    duration: string;
    tripType: OrderTripContext;
    departure: OrderDepartureOrArrival;
    arrival: OrderDepartureOrArrival;
    seatLabel: string;
    code: string;
    localizer: string;
    passengerInfo: OrderPassengerInfo;
    statusDetails: string;
    reservationCode: string;
    companyCode: string;
    companyServiceCode: string;
    insurance: boolean;
    metadata: any;
    type: OrderTripType;
    tripLeg: number;
    boardingPass: boolean;
    electronicTravelTicketLink: string | null;
    cancellationLimitTimeInHours: number;
    cancellationDateLimit: string;
}
export type TripPartDetails = Pick<TicketItemDetails, 'departure' | 'arrival' | 'type' | 'tripLeg' | 'travelCompany' | 'duration' | 'serviceClass' | 'tripType' | 'boardingPass'> & {
    electronicBoardingPass: boolean;
    electronicTravelTicketLink: boolean;
};
export interface TripPartDetailsProps {
    tripPart: TripPartDetails;
    showCompanyName?: boolean;
    showServiceClass?: boolean;
    grayscaleImage?: boolean;
}
export type OrderTripLegs = {
    [key: string | number]: TripPartDetails;
};
export interface OrderPlace {
    id: number;
    name: string;
    slug: string;
    city: string;
    state: string;
    country: string;
    terminal: string;
}
export interface OrderDepartureOrArrival {
    schedule: OrderSchedule;
    place: OrderPlace;
}
export type OrderTripContext = {
    isDirectTrip: boolean;
    departure: OrderDepartureOrArrival;
    arrival: OrderDepartureOrArrival;
    parts: OrderTripLegs;
};
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
export type IStoragedPlace = {
    place?: string;
    cityId?: string;
    city?: string;
    state?: string;
    type?: string;
};
export type ClientId = string | number;
export {};
