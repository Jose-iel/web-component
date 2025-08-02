import { FC, FormEvent, useCallback, useEffect, useRef, useState, RefObject } from 'react';
import debounce from 'lodash.debounce';
import Spin from './Spin';
import { FormControl } from './form/FormControll';
import { Input } from './form/Input';
import { InputGroup } from './form/InputGroup';
import { Box } from './Box';
import { useSearchFormContext } from '../contexts/SearchFormContext';
import { useOutsideClick } from '../utils/useOutsideClick';
import { getPlaces, getPlacesByGeolocation } from '../service/getPlaces';
import { removeAccents } from '../utils/removeAccents';
import { scrollTop } from '../utils/scrollToTop';
import { sortPlaces } from '../utils/sortPlaces';
import { SessionStorage } from '../utils/SessionStorage';
import { HttpError, IPlacesInput } from '../types';
import GeolocationComponent from '../components/geoLocation';
import { findClosestLocation } from '../components/geoLocation/utils';
import { PlaceItem } from '../components/placeItem';
import { checkInputError } from '../utils/checkInputError';
import { defaultResult, initialState } from '../constants/orderTrip';
// import { searchWidgetInvalidPlaceDataLayer, searchWidgetSelectPlaceDataLayer } from './datalayer';
import { NewPlacesInputProps } from '../types';
import { findCommonNameLocation } from '../utils/findCommoNameLocation';
import simpleCms from '../common/simpleCms.json';

export const NewPlacesInput: FC<NewPlacesInputProps> = ({
  id,
  name,
  label,
  icon,
  isRequired = true,
  isInvalid = false,
  idNextFocus,
  scrollTo,
  loadStorageValue = false,
  initialValue,
  initialPlaces = [],
  isOriginInput = false,
  isDestinationInput = false,
  rowForm = false,
  setSelectedPlace,
  setUsageGeolocationOn,
  disableGeolocation = false,
  pageType,
  ...props
}: NewPlacesInputProps) => {

  const searchBox = simpleCms.searchBox;
  const isMobile = simpleCms.isMobile;
  const whitelabel = simpleCms.whitelabel;


  const ref = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<IPlacesInput | null>(initialValue as IPlacesInput);
  const [places, setPlaces] = useState<IPlacesInput[]>(initialPlaces as IPlacesInput[]);
  const [term, setTerm] = useState('');
  const [booleanStates, setBooleanStates] = useState(initialState);

  const { visible, loading, noResult, hasTouched, hasFocus, geolocationLoading } = booleanStates;
  const hasError = checkInputError(isRequired, isInvalid, hasFocus, hasTouched, initialValue);
  const { searchFormData } = useSearchFormContext();

  const handleOutsideClick = () => {
    setBooleanStates(prevState => ({ ...prevState, visible: false }));
    if (!initialValue) {
      setInputValue(null);
      setSelectedPlace && setSelectedPlace(null);
      setPlaces(initialPlaces as IPlacesInput[]);
      setTerm('');
    }
  };

  const handleLocationRetrieved = async (lat: number, long: number) => {
    setBooleanStates(prevState => ({ ...prevState, geolocationLoading: true }));

    const places = (await getPlacesByGeolocation(whitelabel.clientId, lat, long)) as IPlacesInput[];
    const closestLocation = findClosestLocation(lat, long, places) as IPlacesInput;
    const commonSlugLocation = findCommonNameLocation(closestLocation, places);
    const newClosestLocation = { ...commonSlugLocation, type: 'user_location' } as IPlacesInput;

    setUsageGeolocationOn?.(id);
    handleValidPlace(newClosestLocation);
    setBooleanStates(prevState => ({ ...prevState, visible: false, geolocationLoading: false }));
  };

  const getPlacesData = useCallback(
    async (_term: string) => {
      let localNoResult = false;
      const data = await getPlaces(whitelabel.clientId, _term);
      let sortedPlaces = sortPlaces(data as IPlacesInput[]);

      // if (!data?.length) {
      //   const options = {
      //     searchTerm: _term,
      //     formStep: name,
      //   };
      //   searchWidgetInvalidPlaceDataLayer(whitelabel.name, pageType, options);
      // }

      if ((data as HttpError).error) {
        sortedPlaces = defaultResult;
        localNoResult = true;
      }

      setSelectedPlace && setSelectedPlace(null);
      setInputValue(null);
      setPlaces(sortedPlaces.length ? sortedPlaces : defaultResult);
      setBooleanStates(prevState => ({ ...prevState, loading: false, noResult: !sortedPlaces.length || localNoResult }));
    },
    [whitelabel.clientId]
  );

  const debouncedGetPlacesData = useCallback(
    debounce((_term: string) => getPlacesData(_term), 500),
    [getPlacesData]
  );

  const handleChangeInput = useCallback(
    (e: FormEvent<HTMLInputElement>): void => {
      updatePlacesData(e.currentTarget.value);
    },
    [debouncedGetPlacesData]
  );

  const getErrorMessage = () => {
    return isOriginInput ? searchBox.widgetOriginError : searchBox.widgetDestinationError;
  };

  const updatePlacesData = (value: string): void => {
    setPlaces([]);
    debouncedGetPlacesData(value);
    setBooleanStates(prevState => ({ ...prevState, visible: true, loading: true }));
    setSelectedPlace && setSelectedPlace(null);
    setInputValue(null);
    setTerm(value);
  };

  const handleClickItem = useCallback(
    (place: IPlacesInput) => {
      if (place.id !== 'no-result') {
        handleValidPlace(place);
      } else {
        handleNoResult();
      }

      setBooleanStates(prevState => ({ ...prevState, visible: false }));
    },
    [id, idNextFocus]
  );

  const handleValidPlace = (place: IPlacesInput) => {
    setSelectedPlace && setSelectedPlace(place);
    setInputValue(place);

    SessionStorage.set(id, place);
    // searchWidgetSelectPlaceDataLayer(name, whitelabel.name, pageType);
    if (idNextFocus) {
      const nextInput = document.getElementById(idNextFocus);
      nextInput?.focus();
    }
  };

  const handleNoResult = () => {
    setSelectedPlace && setSelectedPlace(null);
    setInputValue(null);
    setTerm('');
    const nextInput = document.getElementById(id);
    nextInput?.focus();
  };

  const renderResultList = () => {
    const cleanTerm = removeAccents(term).replace(/[^a-z\s]/gi, '');
    const regex = new RegExp(cleanTerm, 'ig');

    return [
      !disableGeolocation && (
        <GeolocationComponent onLocationRetrieved={handleLocationRetrieved} loading={geolocationLoading} key="geolocation" />
      ),

      loading && (
        <div key="loading" style={{ padding: '12px 16px', display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
          <Spin size="16px" customSpin />
        </div>
      ),

      ...places.map((place: IPlacesInput) => (
        <PlaceItem key={place.id} place={place} handleClickItem={handleClickItem} noResult={noResult} textPattern={regex} />
      )),
    ];
  };

  const onFocus = () => {
    const headerHeight = document?.getElementById('header-content')?.clientHeight;

    if (scrollTo === 'both' || (isMobile && scrollTo === 'mobile') || (!isMobile && scrollTo === 'desktop')) {
      scrollTop(ref as RefObject<HTMLElement>, headerHeight ?? 0);
    }

    setBooleanStates(prevState => ({ ...prevState, hasTouched: true, hasFocus: true, visible: true }));
  };

  const onBlur = () => {
    setBooleanStates(prevState => ({ ...prevState, hasFocus: false }));
  };

  useEffect(() => {
    if (loadStorageValue) {
      const defaultValue = SessionStorage.get<IPlacesInput>(id);
      if (defaultValue) {
        setSelectedPlace && setSelectedPlace(defaultValue as IPlacesInput);
      }
    }
  }, []);

  useEffect(() => {
    setInputValue(initialValue as IPlacesInput);
  }, [initialValue]);

  useEffect(() => {
    if (!term) setPlaces(initialPlaces as IPlacesInput[]);
  }, [initialPlaces]);

  useOutsideClick({ ref: ref as RefObject<HTMLElement>, handler: handleOutsideClick });

  useEffect(() => {
    if (!searchFormData?.expand) {
      setBooleanStates(prevState => ({ ...prevState, visible: false }));
    }
  }, [searchFormData?.expand]);

  return (
    <div ref={ref}>
      <FormControl className="relative mb-0" data-testid={id}>
        <InputGroup 
          className={`
            ${rowForm ? 'w-full' : 'w-[270px] md:w-full'} 
            h-14 cursor-pointer py-2 border border-solid transition-all duration-300 ease-in-out
            ${hasError 
              ? 'border-red-500 hover:border-red-500 hover:bg-white' 
              : 'border-gray-400 hover:border-blue-500 hover:bg-blue-50 focus-within:border-blue-500 focus-within:bg-blue-50'
            }
            ${isOriginInput 
              ? rowForm 
                ? 'rounded-t-2xl' 
                : 'rounded-l-[30px] md:rounded-t-2xl md:rounded-bl-none'
              : ''
            }
            ${isDestinationInput 
              ? rowForm 
                ? 'rounded-b-2xl border-t-0' 
                : 'border-l-0 border-r-0 pl-2 md:rounded-b-2xl md:border md:border-t-0 md:pl-0'
              : ''
            }
          `}
        >
          <Input
            {...props}
            type="text"
            id={id}
            onChange={handleChangeInput}
            onFocus={onFocus}
            onBlur={onBlur}
            value={inputValue ? inputValue.name : term}
            icon={icon}
            name={name}
            fill
            customInput
            error={hasError ? getErrorMessage() : undefined}
            showErrorMessage={false}
            label={!hasError ? label : getErrorMessage()}
          />
        </InputGroup>

        <Input type="hidden" name={name} id={name} value={inputValue ? inputValue.slug : ''} data-testid="place-input-final" />

        {visible && (
          <Box
            id="place-input-ul"
            className="bg-white shadow-lg mt-1 rounded-lg overflow-hidden absolute z-[5] w-full"
            onClick={(event: FormEvent) => event.stopPropagation()}
            data-testid="place-input-ul"
          >
            {renderResultList()}
          </Box>
        )}
      </FormControl>
    </div>
  );
};

NewPlacesInput.displayName = 'NewPlacesInput';

export default NewPlacesInput;
