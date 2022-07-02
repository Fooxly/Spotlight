import React, { useState } from 'react';

import { Question } from './question';
import { Default } from './default';

import { SearchBase } from '@/components/molecules';
import { SearchContext, SearchType } from '@/utils';
import { Result, SpotlightOptions } from '@/types';

import './styles.css';

export function Search (props: SpotlightOptions): JSX.Element {
    const [type, setType] = useState<SearchType>('search');
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [placeholder, setPlaceholder] = useState<string | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [showIcons, setShowIcons] = useState<boolean>(true);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    return (
        <SearchContext.Provider value={{
            type,
            setType,
            visible,
            setVisible,
            search,
            setSearch,
            placeholder,
            setPlaceholder,
            results,
            setResults,
            showIcons,
            setShowIcons,
            selectedItem,
            setSelectedItem,
        }}
        >
            <SearchBase />
            <Question />
            <Default {...props} />
        </SearchContext.Provider>
    );
}
