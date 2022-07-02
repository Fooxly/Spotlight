"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./styles.css");
const line_1 = require("../../../icons/line");
const atoms_1 = require("../../../components/atoms");
const utils_1 = require("../../../utils");
function SearchInput({ type, loading, forwardRef, onValueChange }) {
    var _a;
    const { placeholder, search, setSearch } = (0, utils_1.useSearchContext)();
    const handleValueChange = (e) => {
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(e.target.value);
        setSearch(e.target.value);
    };
    const formattedPlaceholder = (0, react_1.useMemo)(() => {
        if (placeholder === null || placeholder === void 0 ? void 0 : placeholder.length)
            return placeholder;
        if (type === 'select')
            return 'Select an option...';
        if (type === 'input')
            return 'Enter text here...';
        return 'Start searching...';
    }, [placeholder, type]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-input' }, { children: [(0, jsx_runtime_1.jsx)("input", { autoFocus: true, ref: forwardRef, placeholder: formattedPlaceholder, className: 'spotlight-search-input-input', type: 'text', value: search !== null && search !== void 0 ? search : '', onChange: handleValueChange }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-search-input-icon' }, { children: type === 'select' || type === 'input' ? ((0, jsx_runtime_1.jsx)(line_1.ArrowIcon, { direction: 'right', size: 24, color: 'gray4' })) : loading ? ((0, jsx_runtime_1.jsx)(atoms_1.Loading, { size: 22, color: 'blue', thickness: 3 })) : ((0, jsx_runtime_1.jsx)(line_1.SearchIcon, { size: 24, color: 'gray4' })) })), ((_a = search === null || search === void 0 ? void 0 : search.length) !== null && _a !== void 0 ? _a : 0) > 0 && ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'spotlight-search-input-clear', onClick: () => setSearch('') }, { children: (0, jsx_runtime_1.jsx)(line_1.TimesIcon, { size: 8, color: 'gray10' }) })))] })));
}
exports.SearchInput = SearchInput;
