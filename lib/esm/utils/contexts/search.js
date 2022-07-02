/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';
export const SearchContext = createContext({
    type: 'search',
    setType: () => { },
    visible: false,
    setVisible: () => { },
    search: '',
    setSearch: () => { },
    placeholder: null,
    setPlaceholder: () => { },
    results: [],
    setResults: () => { },
    showIcons: true,
    setShowIcons: () => { },
    selectedItem: null,
    setSelectedItem: () => { },
});
export const useSearchContext = () => useContext(SearchContext);
