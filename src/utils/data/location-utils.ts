import { IPlacesInput } from '../../types';

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