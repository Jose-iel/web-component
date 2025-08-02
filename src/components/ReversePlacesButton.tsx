import { FC, useState } from 'react';
import IconArrowDoubleReverse from './Icons/IconArrowDoubleReverse';
import { useSearchFormContext } from '../contexts/SearchFormContext';
import { SessionStorage } from '../utils/SessionStorage';
import { IReversePlacesButton } from '../types';

const ReversePlacesButton: FC<IReversePlacesButton> = ({ rowForm, reversePlacesInput }) => {
  const [rotate, setRotate] = useState<boolean>(false);
  const { version, searchFormData, setSearchFormData } = useSearchFormContext();

  const handleReverse = () => {
    reverseSessionStorage();
    setSearchFormData({
      ...searchFormData,
      origin: searchFormData?.destination,
      destination: searchFormData?.origin,
      expand: true,
    });
    reversePlacesInput();
    setRotate(!rotate);
  };

  const reverseSessionStorage = () => {
    SessionStorage.set('origin', searchFormData?.destination);
    SessionStorage.set('destination', searchFormData?.origin);
  };

  // Determina a rotação baseada no estado e layout
  const getRotationClass = () => {
    if (rowForm) {
      return rotate ? 'rotate-90' : '-rotate-90';
    } else {
      return rotate ? 'rotate-180' : 'rotate-0';
    }
  };

  const getRotationClassMd = () => {
    return rotate ? '-rotate-90' : 'rotate-90';
  };

  return (
    <IconArrowDoubleReverse
      onClick={handleReverse}
      className={`
        cursor-pointer transition-transform duration-300 ease-in-out
        ${getRotationClass()}
        md:${getRotationClassMd()}
      `}
      width="36px"
      height="36px"
      data-testid="button-reverse-places"
    />
  );
};

export default ReversePlacesButton;
