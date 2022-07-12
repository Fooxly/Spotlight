/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';
export const SearchContext = createContext({
    devMode: false,
    showTips: false,
    customTips: [],
    type: 'search',
    setType: () => { },
    visible: false,
    setVisible: () => { },
    error: undefined,
    setError: () => { },
    parentId: undefined,
    setParentId: () => { },
    catalog: [],
    setCatalog: () => { },
    placeholder: undefined,
    setPlaceholder: () => { },
    loading: false,
    setLoading: () => { },
    selectedItem: undefined,
    setSelectedItem: () => { },
});
export const useSearchContext = () => useContext(SearchContext);
