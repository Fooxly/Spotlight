import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import './styles.css';
import { ArrowIcon, SearchIcon, TimesIcon } from '../../../icons/line';
import { Loading } from '../../../components/atoms';
import { useSearchContext } from '../../../utils';
export function SearchInput({ type, forwardRef, value, onValueChange }) {
    var _a;
    const { placeholder, loading } = useSearchContext();
    const handleValueChange = (e) => {
        onValueChange(e.target.value);
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
    return (_jsxs("div", Object.assign({ className: 'spotlight-search-input' }, { children: [_jsx("input", { autoFocus: true, ref: forwardRef, placeholder: formattedPlaceholder, className: 'spotlight-search-input-input', type: 'text', value: value !== null && value !== void 0 ? value : '', onChange: handleValueChange, disabled: loading }), _jsx("div", Object.assign({ className: 'spotlight-search-input-icon' }, { children: type === 'select' || type === 'input' ? (_jsx(ArrowIcon, { direction: 'right', size: 24, color: 'gray4' })) : loading ? (_jsx(Loading, { size: 22, color: 'blue', thickness: 3 })) : (_jsx(SearchIcon, { size: 24, color: 'gray4' })) })), ((_a = value === null || value === void 0 ? void 0 : value.length) !== null && _a !== void 0 ? _a : 0) > 0 && (_jsx("button", Object.assign({ className: 'spotlight-search-input-clear', onClick: () => onValueChange('') }, { children: _jsx(TimesIcon, { size: 8, color: 'gray10' }) })))] })));
}
