/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { Result } from '@/types';

export type SearchType = 'select' | 'input' | 'search';

export interface SearchContextProps {
    type: SearchType;
    setType: (type: SearchType) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    search: string;
    setSearch: (search: string) => void;
    placeholder: string | null;
    setPlaceholder: (placeholder: string | null) => void;
    results: Result[];
    setResults: (results: Result[]) => void;
    showIcons: boolean;
    setShowIcons: (showIcons: boolean) => void;
    selectedItem: string | null;
    setSelectedItem: (selectedItem: string | null) => void;
}

export const SearchContext = createContext<SearchContextProps>({
    type: 'search',
    setType: () => {},
    visible: false,
    setVisible: () => {},
    search: '',
    setSearch: () => {},
    placeholder: null,
    setPlaceholder: () => {},
    results: [],
    setResults: () => {},
    showIcons: true,
    setShowIcons: () => {},
    selectedItem: null,
    setSelectedItem: () => {},
});

export const useSearchContext = () => useContext(SearchContext);
