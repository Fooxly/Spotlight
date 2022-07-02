import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import './styles.css';
import { ArrowIcon, SearchIcon, TimesIcon } from '../../../icons/line';
import { Loading } from '../../../components/atoms';
import { useSearchContext } from '../../../utils';
export function SearchInput({ type, loading, forwardRef, onValueChange }) {
    var _a;
    const { placeholder, search, setSearch } = useSearchContext();
    const handleValueChange = (e) => {
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(e.target.value);
        setSearch(e.target.value);
    };
    const formattedPlaceholder = useMemo(() => {
        if (placeholder === null || placeholder === void 0 ? void 0 : placeholder.length)
            return placeholder;
        if (type === 'select')
            return 'Select an option...';
        if (type === 'input')
            return 'Enter text here...';
        return 'Start searching...';
    }, [placeholder, type]);
    return (_jsxs("div", Object.assign({ className: 'spotlight-search-input' }, { children: [_jsx("input", { autoFocus: true, ref: forwardRef, placeholder: formattedPlaceholder, className: 'spotlight-search-input-input', type: 'text', value: search !== null && search !== void 0 ? search : '', onChange: handleValueChange }), _jsx("div", Object.assign({ className: 'spotlight-search-input-icon' }, { children: type === 'select' || type === 'input' ? (_jsx(ArrowIcon, { direction: 'right', size: 24, color: 'gray4' })) : loading ? (_jsx(Loading, { size: 22, color: 'blue', thickness: 3 })) : (_jsx(SearchIcon, { size: 24, color: 'gray4' })) })), ((_a = search === null || search === void 0 ? void 0 : search.length) !== null && _a !== void 0 ? _a : 0) > 0 && (_jsx("button", Object.assign({ className: 'spotlight-search-input-clear', onClick: () => setSearch('') }, { children: _jsx(TimesIcon, { size: 8, color: 'gray10' }) })))] })));
}
