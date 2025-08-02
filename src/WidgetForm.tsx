import { FC, FormEvent, useEffect, useState } from 'react';
import { Button } from './components/form/Button';
import { FormControl } from './components/form/FormControll';
import { Radio } from './components/form/Radio';
import { RadioGroup } from './components/form/RadioGroup';
import Box from './components/ui/Box';
import { Loading } from './components/ui/Loading';
import ReversePlacesButton from './components/features/places-input/ReversePlacesButton';
import { IconCircleLoader } from './components/Icons/IconCircleLoader';
import { IconLocation } from './components/Icons/IconLocation';
import { IconSend } from './components/Icons/IconSend';
import { useSearchFormContext } from './contexts/SearchFormContext';
import { useWidgetFormState } from './hooks/useWidgetFormState';
import { formattedDate } from './utils/formatting/formatted-date';
import { dateFormat } from './utils/formatting/date-utils';
import DatePicker from './components/features/date-picker/DatePicker';
import PlacesInput from './components/features/places-input/PlacesInput';
import { fields, initialBooleanState, INPUT_FIELDS, minDate, ONIBUS } from './config/constants';
import simpleCms from './config/cms-config.json';
import { FieldsName, WidgetFormProps } from './types';
import { filterInitialPlaces, getDepartureDateLabel, getDepartureDatePlaceholder, getReturnDateLabel } from './utils/data/places-utils';

export const WidgetForm: FC<WidgetFormProps> = ({
  sendInfoToDataLayer,
  rowForm = false,
  displayRadio = false,
}: WidgetFormProps) => {

  //Importante
  const searchBox = simpleCms.searchBox;
  const isMobile = simpleCms.isMobile;
  const { searchFormData, setSearchFormData } = useSearchFormContext();

  const [booleanStates, setBooleanStates] = useState(initialBooleanState);
  const {
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    origin,
    setOrigin,
    destination,
    setDestination,
    setUsageGeolocationOn,
    disableOriginGeoLocation,
    disableDestinationGeoLocation,
    getNextFocusOfOriginInput,
    validateRedirectToNextPage,
  } = useWidgetFormState(searchFormData);

  const { departureDateInvalid, returnDateInvalid, originInvalid, destinationInvalid, loading, onlyDeparture, hideInputs } =
    booleanStates;
  const filteredInitialPlaces = filterInitialPlaces(origin, destination, searchBox.suggestedPlaces);
  const pageType = searchFormData?.pageInfo?.pageType ?? '';

  const updateBooleanState: { [key in keyof FieldsName]: (value: string | undefined) => void } = {
    [INPUT_FIELDS.ORIGIN]: value => setBooleanStates(prevState => ({ ...prevState, originInvalid: validateInput(value) })),
    [INPUT_FIELDS.DESTINATION]: value =>
      setBooleanStates(prevState => ({ ...prevState, destinationInvalid: validateInput(value) })),
    [INPUT_FIELDS.DEPARTURE_DATE]: value =>
      setBooleanStates(prevState => ({
        ...prevState,
        departureDateInvalid: validateInput(value) && !onlyDeparture,
      })),
    [INPUT_FIELDS.RETURN_DATE]: value =>
      setBooleanStates(prevState => ({ ...prevState, returnDateInvalid: validateInput(value) && !onlyDeparture })),
  };

  const updateInputValidity = (fieldName: string, value: string | undefined) => {
    const updateFunction = updateBooleanState[fieldName];
    updateFunction(value);
  };
  useEffect(() => {
    if (!displayRadio) {
      if (returnDate) {
        setBooleanStates(prevState => ({ ...prevState, onlyDeparture: false }));
      } else {
        setBooleanStates(prevState => ({ ...prevState, onlyDeparture: true }));
      }
    }
  }, [returnDate]);

  const validateInput = (value: string | undefined): boolean => {
    return !value;
  };

  const handleOpenSearch = (): void => {
    setSearchFormData({ ...searchFormData, expand: true });
  };

  const getFieldValue = (key: keyof FieldsName) => {
    const fieldMappings: { [key in keyof FieldsName]: any } = {
      [INPUT_FIELDS.ORIGIN]: origin?.slug,
      [INPUT_FIELDS.DESTINATION]: destination?.slug,
      [INPUT_FIELDS.DEPARTURE_DATE]: dateFormat({ date: departureDate, format: formattedDate.YMD }),
      [INPUT_FIELDS.RETURN_DATE]: dateFormat({ date: returnDate, format: formattedDate.YMD }),
    };

    return fieldMappings[key];
  };

  const buildFinalUrl = (): { url: string; validItems: string[] } => {
    const finalUrl = [ONIBUS];
    const validItems: string[] = [];
    const keys = Object.keys(fields);
    keys.forEach(key => {
      const value = getFieldValue(key);
      updateInputValidity(key, value);
      if (value) {
        validItems.push(key);
        finalUrl.push(`${fields[key]}${value}`);
      }
    });

    return { url: finalUrl.join(''), validItems };
  };

  const getRequiredItems = () => {
    if (onlyDeparture && !returnDate) {
      return [INPUT_FIELDS.ORIGIN, INPUT_FIELDS.DESTINATION];
    }

    return [INPUT_FIELDS.ORIGIN, INPUT_FIELDS.DESTINATION, INPUT_FIELDS.DEPARTURE_DATE, INPUT_FIELDS.RETURN_DATE];
  };

  const redirectToNextPage = (url: string) => {
    setBooleanStates(prevState => ({ ...prevState, loading: true }));
    window.location.href = url;
  };

  const callSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const requiredItems: string[] = getRequiredItems();
    const { url, validItems } = buildFinalUrl();
    const isAllRequiredItemsValid = requiredItems.every(item => validItems.includes(item));
    validateRedirectToNextPage(isAllRequiredItemsValid, redirectToNextPage, url);
    sendInfoToDataLayer?.();
  };

  const getReturnDateMinDate = () => {
    if (onlyDeparture && displayRadio) {
      return undefined;
    }
    return departureDate || new Date();
  };

  const isReturnDateDisabled = () => {
    if (!displayRadio) {
      return false;
    }
    return (onlyDeparture || (!departureDate && onlyDeparture)) && !returnDate;
  };

  const reversePlacesInput = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  if (!searchBox) {
    return null;
  }

  return (
    <Box
      className={`
        bg-white rounded flex flex-row relative z-[2] w-full justify-center
        ${!rowForm && !displayRadio ? 'mt-4' : 'mt-0'}
      `}
      data-testid="search-form-container"
    >
      <Box 
        className={`
          flex justify-center
          ${rowForm ? 'w-full' : 'w-auto'}
        `}
      >
        <form method="get" id="search-widget-responsive" autoComplete="off" onSubmit={callSearch} className='flex justify-center w-full'>
          <Box 
            className={`
              justify-center w-full
              ${rowForm ? 'flex flex-col' : 'block'}
              md:flex md:flex-col md:w-full
            `}
          >
            <Box 
              className={`
                mt-[22px]
                ${displayRadio ? 'flex order-1' : 'hidden order-0'}
                ${rowForm ? 'md:flex' : ''}
                md:order-1
                ${displayRadio ? 'md:flex' : 'md:hidden'}
              `}
            >
              <RadioGroup
                onChange={(value: any) => {
                  setBooleanStates(prevState => ({ ...prevState, onlyDeparture: value }));
                  setReturnDate(undefined);
                }}
                name="search-box-radio-group"
                value={onlyDeparture}
                className={`
                  ${rowForm ? 'pl-0 pb-4' : 'pl-2.5 pb-2.5'}
                  md:pl-0 md:pb-4
                `}
                size="md"
                data-testid="search-box-radio-group"
              >
                <Radio value id="one-way-trip" data-testid="one-way-trip">
                  {searchBox.searchWidgetOneWayTrip}
                </Radio>
                <Radio value={false} id="round-trip" data-testid="round-trip">
                  {searchBox.searchWidgetRoundTrip}
                </Radio>
              </RadioGroup>
            </Box>
            <Box 
              className={`
                ${displayRadio ? 'order-2' : 'order-1'}
                ${rowForm ? 'flex flex-col gap-6 mb-0' : `block float-left gap-0 ${!displayRadio ? 'mb-4' : 'mb-0'}`}
                md:flex md:flex-col md:gap-6 md:order-0
              `}
            >
              <Box 
                className={`
                  relative flex
                  ${rowForm ? 'flex-col' : 'flex-row'}
                  md:flex-col
                `}
              >
                <PlacesInput
                  css={{ zIndex: 3 }}
                  disableGeolocation={disableOriginGeoLocation()}
                  icon={<IconLocation />}
                  id="origin"
                  idNextFocus={getNextFocusOfOriginInput()}
                  initialValue={origin}
                  initialPlaces={filteredInitialPlaces}
                  isInvalid={originInvalid}
                  isOriginInput
                  isRequired
                  label={searchBox.originInputLabel}
                  name="origin-final"
                  placeholder={searchBox.originInputPlaceholder}
                  pageType={pageType}
                  rowForm={rowForm}
                  scrollTo="mobile"
                  setSelectedPlace={setOrigin}
                  setUsageGeolocationOn={setUsageGeolocationOn}
                  onClick={handleOpenSearch}
                />
                <Box 
                  className={`
                    absolute z-10
                    ${rowForm ? 'top-1/2 right-2 -translate-y-1/2' : 'top-8 left-1/2 -translate-x-1/2 -translate-y-1/2'}
                    md:top-1/2 md:left-auto md:right-2 md:-translate-y-1/2 md:translate-x-0
                  `}
                >
                  <ReversePlacesButton rowForm={rowForm} reversePlacesInput={reversePlacesInput} />
                </Box>
                <PlacesInput
                  css={{ zIndex: 1 }}
                  disableGeolocation={disableDestinationGeoLocation()}
                  icon={<IconSend />}
                  id="destination"
                  idNextFocus="departure-date"
                  initialValue={destination}
                  initialPlaces={filteredInitialPlaces}
                  isDestinationInput
                  isInvalid={destinationInvalid}
                  isRequired
                  label={searchBox.destinationInputLabel}
                  name="destination-final"
                  placeholder={searchBox.destinationInputPlaceholder}
                  pageType={pageType}
                  rowForm={rowForm}
                  scrollTo="mobile"
                  setSelectedPlace={setDestination}
                  setUsageGeolocationOn={setUsageGeolocationOn}
                  onClick={handleOpenSearch}
                />
              </Box>
            </Box>
            <FormControl 
              className={`
                order-2 pr-4
                ${rowForm && !displayRadio ? 'flex' : 'block float-left'}
                ${rowForm ? 'pr-0' : 'pr-4'}
                justify-between
                md:pr-0
                ${displayRadio ? 'md:block' : hideInputs ? 'md:hidden' : 'md:flex'}
              `}
            >
              <Box className="flex w-full">
                <DatePicker
                  errorMessage={searchBox.widgetDepartureDateError}
                  id="departure-date"
                  isDepartureDate
                  isInvalid={departureDateInvalid}
                  isRequired={!onlyDeparture || !!returnDate}
                  label={getDepartureDateLabel(isMobile, searchBox)}
                  minDate={minDate}
                  monthsToDisplay={2}
                  name="departure-date-final"
                  placeholder={getDepartureDatePlaceholder(searchBox)}
                  pageType={pageType}
                  rowForm={rowForm}
                  setDate={setDepartureDate}
                />
                <DatePicker
                  disabled={isReturnDateDisabled()}
                  errorMessage={searchBox.widgetReturnDateError}
                  id="return-date"
                  isInvalid={returnDateInvalid}
                  isRequired={!onlyDeparture}
                  isReturnDate
                  label={getReturnDateLabel(isMobile, searchBox)}
                  minDate={getReturnDateMinDate()}
                  monthsToDisplay={2}
                  name="return-date-final"
                  placeholder={getDepartureDatePlaceholder(searchBox)}
                  pageType={pageType}
                  rowForm={rowForm}
                  setDate={setReturnDate}
                />
              </Box>
            </FormControl>
            <Box 
              className={`
                flex order-3
                ${rowForm ? 'w-full h-12' : 'w-41 h-14'}
                md:flex md:w-full md:h-12
                [&_button]:flex [&_button]:gap-2
              `}
            >
              <Button
                id="search-box-button"
                type="submit"
                variant="primary"
                fill
                disabled={loading && !isMobile}
                aria-label={searchBox.textSearchButton}
                data-testid="search-box-button"
              >
                {loading && !isMobile ? <IconCircleLoader height="16px" width="16px" css={{marginRight: 1}} /> : null}
                {searchBox.textSearchButton}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      {isMobile && <Loading visible={loading} onlyLoader onClose={() => null} />}
    </Box>
  );
};

WidgetForm.displayName = 'WidgetForm';

export default WidgetForm;
