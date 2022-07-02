/// <reference types="react" />
import { Result } from '../../types';
export declare type SearchType = 'select' | 'input' | 'search';
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
export declare const SearchContext: import("react").Context<SearchContextProps>;
export declare const useSearchContext: () => SearchContextProps;
