import { createContext, FC, useContext, useMemo, useState } from 'react';
import { SearchFormProviderDefaultProps, ISearchProviderProps, ISearchFormData } from '../types';

const versionCurrent = 1;

export const defaultData: SearchFormProviderDefaultProps<any> = {
  setSearchFormData: (): void => {
    throw new Error('setSearchFormData is not provided.');
  },
  version: versionCurrent,
};

const SearchFormContext = createContext<SearchFormProviderDefaultProps<any>>(defaultData);

export const SearchFormProvider: FC<ISearchProviderProps> = ({ searchFormData, children, version }) => {
  const [localSearchData, setLocalSearchData] = useState(searchFormData);

  const contextValue = useMemo(
    () => ({
      searchFormData: localSearchData,
      setSearchFormData: setLocalSearchData,
      version: version ?? versionCurrent,
    }),
    [localSearchData, setLocalSearchData]
  );

  return <SearchFormContext.Provider value={contextValue}>{children}</SearchFormContext.Provider>;
};

export function useSearchFormContext<T = ISearchFormData>() {
  return useContext<SearchFormProviderDefaultProps<T>>(SearchFormContext);
}
