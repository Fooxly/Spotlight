import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { TimesIcon } from '../../../icons/line';
import { DEV_ERRORS, NORMAL_ERRORS, useSearchContext } from '../../../utils';
export function SearchError() {
    const { devMode, error, setError } = useSearchContext();
    const handleRemoveError = () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
    };
    const errorMessage = useMemo(() => {
        if (!error)
            return null;
        const errorKey = typeof error === 'string' ? error : error.error;
        let msg = devMode ? DEV_ERRORS[errorKey] : NORMAL_ERRORS[errorKey];
        if (typeof error === 'object') {
            for (const key in error.props) {
                msg = msg.replace(`{{${key}}}`, error.props[key]);
            }
        }
        return msg;
    }, [devMode, error]);
    if (!error)
        return null;
    return (_jsxs("div", Object.assign({ className: 'spotlight-search-error' }, { children: [_jsx("p", { children: errorMessage }), _jsx("button", Object.assign({ onClick: handleRemoveError }, { children: _jsx(TimesIcon, { size: 15, color: 'red' }) }))] })));
}
