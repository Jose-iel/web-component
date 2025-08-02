import { IPlacesInput } from '../types';
type Places = IPlacesInput | null | undefined;
export declare const filterInitialPlaces: (origin: Places, destination: Places, suggestedPlaces: IPlacesInput[]) => IPlacesInput[];
export declare const getReturnDateLabel: (isMobile: boolean | undefined, searchBox: any) => any;
export declare const getDepartureDateLabel: (isMobile: boolean | undefined, searchBox?: any) => any;
export declare const getDepartureDatePlaceholder: (searchBox?: any) => any;
export {};
