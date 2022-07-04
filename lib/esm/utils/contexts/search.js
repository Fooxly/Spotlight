/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';
export const SearchContext = createContext({
    type: 'search',
    setType: () => { },
    visible: false,
    setVisible: () => { },
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
