import React from 'react';

import { SearchResult } from '../search-result';

import { Category } from '@/types';
import { useSearchContext } from '@/utils';

import './styles.css';

interface Props {
    category: Category;
}

export function SearchSection ({ category }: Props): JSX.Element {
    const { loading } = useSearchContext();

    const handleSectionButton = () => {
        if (loading) return;
        category.action!.action();
    };

    return (
        <div className='spotlight-search-section'>
            <div className='spotlight-search-section-title'>
                <p>{category.label}</p>
                {!!category.action && (
                    // eslint-disable-next-line react/jsx-handler-names
                    <button onClick={handleSectionButton} disabled={loading}>{category.action.label}</button>
                )}
            </div>
            <div className='spotlight-search-section-results'>
                {category.results.map((result) => (
                    <SearchResult result={result} key={result.id} />
                ))}
            </div>
        </div>
    );
}
