import { default as React } from 'react';
interface GeolocationButtonProps {
    onLocationRetrieved: (latitude: number, longitude: number) => void;
    loading?: boolean;
}
declare const GeolocationButton: React.FC<GeolocationButtonProps>;
export default GeolocationButton;
