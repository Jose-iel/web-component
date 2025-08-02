import { FC } from 'react';
import { SearchFormProviderDefaultProps, ISearchProviderProps, ISearchFormData } from '../types';
export declare const defaultData: SearchFormProviderDefaultProps<any>;
export declare const SearchFormProvider: FC<ISearchProviderProps>;
export declare function useSearchFormContext<T = ISearchFormData>(): SearchFormProviderDefaultProps<T>;
