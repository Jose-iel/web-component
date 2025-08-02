import { IPlacesInput } from '../../types';

type Places = IPlacesInput | null | undefined;

export const filterInitialPlaces = (origin: Places, destination: Places, suggestedPlaces: IPlacesInput[]) => {
  return (suggestedPlaces || []).filter(
    place => (origin === null || place?.slug !== origin?.slug) && (destination === null || place?.slug !== destination?.slug)
  );
};

export const getReturnDateLabel = (isMobile: boolean | undefined, searchBox: any) => {
  return isMobile ? searchBox.returnDateMobileLabel : searchBox?.returnDateLabel;
};

export const getDepartureDateLabel = (isMobile: boolean | undefined, searchBox?: any) => {
  return isMobile ? searchBox?.departureDateMobileLabel : searchBox?.departureDateLabel;
};

export const getDepartureDatePlaceholder = (searchBox?: any) => {
  return searchBox?.departureDatePlaceholder ?? '';
};
