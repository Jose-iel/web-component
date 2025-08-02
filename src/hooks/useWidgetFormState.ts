import { useState } from 'react';
import { ISearchFormData } from '../types';
import { IPlacesInput } from '../types';

export const useWidgetFormState = (searchFormData: ISearchFormData | undefined) => {
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [origin, setOrigin] = useState<IPlacesInput | null>();
  const [destination, setDestination] = useState<IPlacesInput | null | undefined>(searchFormData?.destination);
  const [usageGeolocationOn, setUsageGeolocationOn] = useState('');

  const disableOriginGeoLocation = () => usageGeolocationOn === 'destination' && destination !== null;

  const disableDestinationGeoLocation = () => usageGeolocationOn === 'origin' && origin !== null;

  const getNextFocusOfOriginInput = () => {
    return destination ? 'departure-date' : 'destination';
  };

  const validateRedirectToNextPage = (
    isAllRequiredItemsValid: boolean,
    redirectToNextPage: (url: string) => void,
    url: string,
  ) => {
    if (isAllRequiredItemsValid) {
      redirectToNextPage(url);
    }
  };

  return {
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    origin,
    setOrigin,
    destination,
    setDestination,
    usageGeolocationOn,
    setUsageGeolocationOn,
    disableOriginGeoLocation,
    disableDestinationGeoLocation,
    getNextFocusOfOriginInput,
    validateRedirectToNextPage,
  };
};
