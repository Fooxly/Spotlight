import React, { useState } from 'react';

import { Question } from './question';
import { Default } from './default';

import { SearchBase } from '@/components/molecules';
import { SearchContext, SearchType } from '@/utils';
import { Result, SpotlightOptions } from '@/types';

import './styles.css';

export function Search (props: SpotlightOptions): JSX.Element {
    const [type, setType] = useState<SearchType>('search');
    const [visible, setVisible] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [catalog, setCatalog] = useState<Result[]>([]);
    const [parentId, setParentId] = useState<string | undefined>();
    const [placeholder, setPlaceholder] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string | undefined>();

    return (
        <SearchContext.Provider value={{
            devMode: props.devMode ?? false,
            showTips: props.showTips ?? true,
            type,
            setType,
            visible,
            setVisible,
            error,
            setError,
            catalog,
            setCatalog,
            parentId,
            setParentId,
            placeholder,
            setPlaceholder,
            loading,
            setLoading,
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
