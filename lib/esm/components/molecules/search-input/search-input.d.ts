import React from 'react';
import { SearchType } from '../../../utils';
export interface SearchInputProps {
    type: SearchType;
    forwardRef?: React.Ref<HTMLInputElement>;
    value: string;
    onValueChange: (value: string) => void;
}
export declare function SearchInput({ type, forwardRef, value, onValueChange }: SearchInputProps): JSX.Element;
