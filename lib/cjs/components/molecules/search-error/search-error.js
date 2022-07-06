"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchError = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./styles.css");
const line_1 = require("../../../icons/line");
const utils_1 = require("../../../utils");
function SearchError() {
    const { error, setError } = (0, utils_1.useSearchContext)();
    const handleRemoveError = () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
    };
    if (!(error === null || error === void 0 ? void 0 : error.length))
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-error' }, { children: [(0, jsx_runtime_1.jsx)("p", { children: error }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleRemoveError }, { children: (0, jsx_runtime_1.jsx)(line_1.TimesIcon, { size: 15, color: 'red' }) }))] })));
}
exports.SearchError = SearchError;
