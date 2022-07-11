import React, { useMemo } from 'react';

import './styles.css';
import { TimesIcon } from '@/icons/line';
import { DEV_ERRORS, ErrorObject, NORMAL_ERRORS, useSearchContext } from '@/utils';

export function SearchError (): JSX.Element | null {
    const { devMode, error, setError } = useSearchContext();

    const handleRemoveError = () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
    };

    const errorMessage = useMemo(() => {
        if (!error) return null;
        const errorKey = typeof error === 'string' ? error : (error as ErrorObject).error;
        let msg = devMode ? DEV_ERRORS[errorKey] : NORMAL_ERRORS[errorKey];

        if (typeof error === 'object') {
            for (const key in error.props) {
                msg = msg.replace(`{{${key}}}`, error.props[key] as string);
            }
        }
        return msg;
    }, [devMode, error]);
    if (!error) return null;
    return (
        <div className='spotlight-search-error'>
            <p>{errorMessage}</p>
            <button onClick={handleRemoveError}>
                <TimesIcon size={15} color='red' />
            </button>
        </div>
    );
}
