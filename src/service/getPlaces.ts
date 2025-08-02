import { HttpError, ClientId, IPlacesInput } from '../types';
import { bffApi } from './http';

export const getPlaces = async (
  clientId: ClientId,
  place?: string,
  limit: number = 5
): Promise<IPlacesInput[] | HttpError | null> => {
  if (!place && place !== '') {
    console.warn(`Get places: parameter not found`);
    throw new Error('Get places: parameter not found');
  }

  const response = await bffApi.get(
    `places?clientId=${clientId}&limit=${limit}&name=${place}&fields=id,name,slug,useGroupByCity,city`
  );

  if (response.error) {
    console.warn('Error on get places', response.error);
    return { error: response.error } as HttpError;
  }

  return response.data;
};

export const getPlacesByGeolocation = async (
  clientId: ClientId,
  latitude: number | null,
  longitude: number | null,
  limit: number = 9,
  radius: number = 30
): Promise<IPlacesInput[] | HttpError | null> => {
  if (!latitude || !longitude) {
    console.warn(`Get places by geolocation: location not found`);
    throw new Error('Get places by geolocation: location not found');
  }

  const response = await bffApi.get(
    `places?clientId=${clientId}&limit=${limit}&latitude=${latitude}&longitude=${longitude}&radius=${radius}&fields=id,name,slug,useGroupByCity,city,latlon`
  );

  if (response.error) {
    console.warn('Error on get places by geolocation', response.error);
    return { error: response.error } as HttpError;
  }

  return response.data;
};
