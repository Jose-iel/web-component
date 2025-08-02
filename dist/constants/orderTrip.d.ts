import { FieldsName } from '../types';
export declare enum ORDER_TRIP_CONTEXTS {
    departure_type = "departure_type",
    return_type = "return_type"
}
export declare enum ORDER_TRIP_TYPES {
    DIRECT = "direct",
    CONNECTION = "connection",
    ONE_STOP = "one_stop"
}
export declare const ONIBUS = "/onibus";
export declare const fields: FieldsName;
export declare const initialBooleanState: {
    departureDateInvalid: boolean;
    returnDateInvalid: boolean;
    originInvalid: boolean;
    destinationInvalid: boolean;
    loading: boolean;
    onlyDeparture: boolean;
    hideInputs: boolean;
};
export declare const INPUT_FIELDS: {
    ORIGIN: string;
    DESTINATION: string;
    DEPARTURE_DATE: string;
    RETURN_DATE: string;
};
export declare const minDate: Date;
export declare const formattedDate: {
    MDY: string;
    YMD: string;
    DMY: string;
};
export declare const ONE_DAY_IN_MS: number;
export declare const defaultResult: {
    id: string;
    name: string;
    useGroupByCity: boolean;
    slug: string;
    city: {
        id: number;
        name: string;
    };
}[];
export declare const initialState: {
    visible: boolean;
    loading: boolean;
    noResult: boolean;
    hasTouched: boolean;
    hasFocus: boolean;
    geolocationLoading: boolean;
};
