/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import type { Result } from '@/types';

export type SearchType = 'select' | 'input' | 'search';

export interface SearchContextProps {
    type: SearchType;
    setType: (type: SearchType) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    error: string | undefined;
    setError: (error: string | undefined) => void;
    parentId: string | undefined;
    setParentId: (parentId: string | undefined) => void;
    catalog: Result[];
    setCatalog: (catalog: Result[]) => void;
    placeholder: string | undefined;
    setPlaceholder: (placeholder: string | undefined) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    selectedItem: string | undefined;
    setSelectedItem: (selectedItem: string | undefined) => void;
}

export const SearchContext = createContext<SearchContextProps>({
    type: 'search',
    setType: () => {},
    visible: false,
    setVisible: () => {},
    error: undefined,
    setError: () => {},
    parentId: undefined,
    setParentId: () => {},
    catalog: [],
    setCatalog: () => {},
    placeholder: undefined,
    setPlaceholder: () => {},
    loading: false,
    setLoading: () => {},
    selectedItem: undefined,
    setSelectedItem: () => {},
});

export const useSearchContext = () => useContext(SearchContext);