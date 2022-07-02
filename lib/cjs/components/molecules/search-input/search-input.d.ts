import React from 'react';
import './styles.css';
import { SearchType } from '../../../utils';
export interface SearchInputProps {
    type: SearchType;
    loading?: boolean;
    forwardRef?: React.Ref<HTMLInputElement>;
    onValueChange?: (value: string) => void;
}
export declare function SearchInput({ type, loading, forwardRef, onValueChange }: SearchInputProps): JSX.Element;
