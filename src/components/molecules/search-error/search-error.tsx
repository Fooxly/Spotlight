import React from 'react';

import './styles.css';
import { TimesIcon } from '@/icons/line';
import { useSearchContext } from '@/utils';

export function SearchError (): JSX.Element | null {
    const { error, setError } = useSearchContext();

    const handleRemoveError = () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
    };

    if (!error?.length) return null;
    return (
        <div className='spotlight-search-error'>
            <p>{error}</p>
            <button onClick={handleRemoveError}>
                <TimesIcon size={15} color='red' />
            </button>
        </div>
    );
}
