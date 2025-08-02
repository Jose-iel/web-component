import React, { useState } from 'react';
import { IconCircleLoader } from '../Icons/IconCircleLoader';
import IconGPS from '../Icons/IconGps';
import Box from '../Box';
import simpleCms from '../../common/simpleCms.json';

interface GeolocationButtonProps {
  onLocationRetrieved: (latitude: number, longitude: number) => void;
  loading?: boolean;
}

const GeolocationButton: React.FC<GeolocationButtonProps> = ({ onLocationRetrieved, loading = false }) => {
  const searchBox = simpleCms.searchBox;

  const [error, setError] = useState<boolean>(false);
  const errorColor = !error ? '#4B6DB6' : '#E31600';

  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          onLocationRetrieved(latitude, longitude);
          setError(false);
        },
        () => {
          setError(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError(true);
    }
  };

  if (!searchBox?.geolocation) return;

  return (
    <Box
      as="button"
      onClick={handleButtonClick}
      data-testid="geolocation-button"
      className="
        w-full py-3 px-4 flex items-end justify-between
        font-bold text-base leading-5 cursor-pointer
        border-b border-gray-100
        hover:bg-blue-50 transition-colors
      "
      css={{ color: errorColor }}
    >
      {!error ? searchBox?.geolocation?.info : searchBox?.geolocation?.error}
      {loading && !error ? (
        <IconCircleLoader height="16px" width="16px" className="mr-1" />
      ) : (
        <IconGPS width="16px" height="16px" color={errorColor} />
      )}
    </Box>
  );
};

export default GeolocationButton;
