import React from 'react';
import './styles.css';
import { SearchType } from '../../../utils';
export interface SearchInputProps {
    type: SearchType;
    loading?: boolean;
    forwardRef?: React.Ref<HTMLInputElement>;
    placeholder?: string;
    onValueChange?: (value: string) => void;
}
export declare function SearchInput({ type, loading, forwardRef, placeholder, onValueChange }: SearchInputProps): JSX.Element;
