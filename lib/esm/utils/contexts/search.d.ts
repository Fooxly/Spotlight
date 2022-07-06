/// <reference types="react" />
import type { Result } from '../../types';
export declare type SearchType = 'select' | 'input' | 'search';
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
export declare const SearchContext: import("react").Context<SearchContextProps>;
export declare const useSearchContext: () => SearchContextProps;