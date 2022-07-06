import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './styles.css';
import { TimesIcon } from '../../../icons/line';
import { useSearchContext } from '../../../utils';
export function SearchError() {
    const { error, setError } = useSearchContext();
    const handleRemoveError = () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
    };
    if (!(error === null || error === void 0 ? void 0 : error.length))
        return null;
    return (_jsxs("div", Object.assign({ className: 'spotlight-search-error' }, { children: [_jsx("p", { children: error }), _jsx("button", Object.assign({ onClick: handleRemoveError }, { children: _jsx(TimesIcon, { size: 15, color: 'red' }) }))] })));
}
