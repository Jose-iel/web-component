import { IPlacesInput, IStoragedPlace } from '../types';
export declare const getStoragePlaceInfo: (placeKey: string) => IStoragedPlace;
export declare const findCommonNameLocation: (closestLocation: IPlacesInput, locations: IPlacesInput[]) => IPlacesInput | null;
