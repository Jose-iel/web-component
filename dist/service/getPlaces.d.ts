import { HttpError, ClientId, IPlacesInput } from '../types';
export declare const getPlaces: (clientId: ClientId, place?: string, limit?: number) => Promise<IPlacesInput[] | HttpError | null>;
export declare const getPlacesByGeolocation: (clientId: ClientId, latitude: number | null, longitude: number | null, limit?: number, radius?: number) => Promise<IPlacesInput[] | HttpError | null>;
