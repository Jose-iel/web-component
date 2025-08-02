import { SessionStorage } from './SessionStorage';
import { IPlacesInput, IStoragedPlace } from '../types';

export const getStoragePlaceInfo = (placeKey: string): IStoragedPlace => {
  const place: any = SessionStorage?.get(placeKey);
  const placeCity = place?.name?.split(', ');

  const placeData: IStoragedPlace = {
    place: place?.name ?? '',
    cityId: place?.city?.id ?? '',
    city: place?.city?.name ?? '',
    state: placeCity?.[1]?.split('-')[0].replace(' ', '') ?? '',
    ...(place?.type && { type: place.type }),
  };

  return placeData;
};

export const findCommonNameLocation = (closestLocation: IPlacesInput, locations: IPlacesInput[]): IPlacesInput | null => {
  const targetNameDenominator = closestLocation?.name?.split('-')[0].trim();

  for (const location of locations) {
    const commonNameDenominator = location?.name?.split('-')[0].trim();

    if (commonNameDenominator === targetNameDenominator && location.useGroupByCity) {
      return location;
    }
  }

  return closestLocation;
};