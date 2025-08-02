import { IPlacesInput } from '../types';

export const checkInputError = (
  isRequired: boolean,
  isInvalid: boolean,
  hasFocus: boolean,
  hasTouched: boolean,
  inputValue: Date | IPlacesInput | undefined | null
) => (isRequired && isInvalid && !hasFocus && !inputValue) || (isRequired && hasTouched && !hasFocus && !inputValue) || false;