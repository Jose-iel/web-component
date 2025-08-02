import { FC } from 'react';
import { NewDatePickerProps } from '../../types';
export declare const cleanSetDate: (setDate: any) => void;
export declare const validateMsgError: ({ hasError, errorMessage, textDefault, }: {
    hasError: boolean;
    errorMessage?: string;
    textDefault?: string;
}) => string | undefined;
export declare const NewDatePicker: FC<NewDatePickerProps>;
export default NewDatePicker;
