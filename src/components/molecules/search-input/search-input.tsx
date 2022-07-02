import React, { useMemo } from 'react';

import './styles.css';
import { ArrowIcon, SearchIcon, TimesIcon } from '@/icons/line';
import { Loading } from '@/components/atoms';
import { SearchType, useSearchContext } from '@/utils';

export interface SearchInputProps {
    type: SearchType;
    loading?: boolean;
    forwardRef?: React.Ref<HTMLInputElement>;
    onValueChange?: (value: string) => void;
}

export function SearchInput ({ type, loading, forwardRef, onValueChange }: SearchInputProps): JSX.Element {
    const { placeholder, search, setSearch } = useSearchContext();

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        onValueChange?.(e.target.value);
        setSearch(e.target.value);
    };

    const formattedPlaceholder = useMemo(() => {
        if (placeholder?.length) return placeholder;
        if (type === 'select') return 'Select an option...';
        if (type === 'input') return 'Enter text here...';
        return 'Start searching...';
    }, [placeholder, type]);

    return (
        <div className='spotlight-search-input'>
            <input
                autoFocus
                ref={forwardRef}
                placeholder={formattedPlaceholder}
                className='spotlight-search-input-input'
                type='text'
                value={search ?? ''}
                onChange={handleValueChange}
            />
            <div className='spotlight-search-input-icon'>
                {type === 'select' || type === 'input' ? (
                    <ArrowIcon direction='right' size={24} color='gray4' />
                ) : loading ? (
                    <Loading size={22} color='blue' thickness={3} />
                ) : (
                    <SearchIcon size={24} color='gray4' />
                )}
            </div>
            {(search?.length ?? 0) > 0 && (
                <button className='spotlight-search-input-clear' onClick={() => setSearch('')}>
                    <TimesIcon size={8} color='gray10' />
                </button>
            )}
        </div>
    );
}
