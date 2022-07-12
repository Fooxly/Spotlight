"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchError = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const line_1 = require("../../../icons/line");
const utils_1 = require("../../../utils");
function SearchError() {
    const { devMode, error, setError } = (0, utils_1.useSearchContext)();
    const handleRemoveError = () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
    };
    const errorMessage = (0, react_1.useMemo)(() => {
        if (!error)
            return null;
        const errorKey = typeof error === 'string' ? error : error.error;
        let msg = devMode ? utils_1.DEV_ERRORS[errorKey] : utils_1.NORMAL_ERRORS[errorKey];
        if (typeof error === 'object') {
            for (const key in error.props) {
                msg = msg.replace(`{{${key}}}`, error.props[key]);
            }
        }
        return msg;
    }, [devMode, error]);
    if (!error)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-error' }, { children: [(0, jsx_runtime_1.jsx)("p", { children: errorMessage }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleRemoveError }, { children: (0, jsx_runtime_1.jsx)(line_1.TimesIcon, { size: 15, color: 'red' }) }))] })));
}
exports.SearchError = SearchError;
