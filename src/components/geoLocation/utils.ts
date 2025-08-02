import { IPlacesInput } from "../../types";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const radiusEarth = 6371.0; // km
  const deltaLatitude = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLongitude = ((lon2 - lon1) * Math.PI) / 180;
  const haversineFormulaComponent =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);
  const centralAngle = 2 * Math.atan2(Math.sqrt(haversineFormulaComponent), Math.sqrt(1 - haversineFormulaComponent));

  return radiusEarth * centralAngle;
}

export function findClosestLocation(latitude?: number, longitude?: number, locations?: IPlacesInput[] | []): IPlacesInput | null {
  let closestLocation: IPlacesInput | null = null;
  let minDistance = Infinity;

  for (const location of locations || []) {
    const distance = haversine(
      latitude as number,
      longitude as number,
      location?.latlon?.lat as number,
      location?.latlon?.lon as number
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = location;
    }
  }

  return closestLocation;
}
