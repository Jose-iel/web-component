import { ISearchFormData, IPlacesInput } from '../types';
export declare const useWidgetFormState: (searchFormData: ISearchFormData | undefined) => {
    departureDate: Date | undefined;
    setDepartureDate: import('react').Dispatch<import('react').SetStateAction<Date | undefined>>;
    returnDate: Date | undefined;
    setReturnDate: import('react').Dispatch<import('react').SetStateAction<Date | undefined>>;
    origin: IPlacesInput | null | undefined;
    setOrigin: import('react').Dispatch<import('react').SetStateAction<IPlacesInput | null | undefined>>;
    destination: IPlacesInput | null | undefined;
    setDestination: import('react').Dispatch<import('react').SetStateAction<IPlacesInput | null | undefined>>;
    usageGeolocationOn: string;
    setUsageGeolocationOn: import('react').Dispatch<import('react').SetStateAction<string>>;
    disableOriginGeoLocation: () => boolean;
    disableDestinationGeoLocation: () => boolean;
    getNextFocusOfOriginInput: () => "destination" | "departure-date";
    validateRedirectToNextPage: (isAllRequiredItemsValid: boolean, redirectToNextPage: (url: string) => void, url: string) => void;
};
