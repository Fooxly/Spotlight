/// <reference types="react" />
import { ERRORS } from '../constants';
import type { Result } from '../../types';
export declare type SearchType = 'select' | 'input' | 'search';
export interface ErrorObject {
    error: ERRORS;
    props?: {
        [key: string]: any;
    };
}
export declare type Error = ERRORS | ErrorObject;
export interface SearchContextProps {
    devMode: boolean;
    showTips: boolean;
    customTips: string[];
    type: SearchType;
    setType: (type: SearchType) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    error: Error | undefined;
    setError: (error: Error | undefined) => void;
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
