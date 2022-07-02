import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './styles.css';
export function SearchSection({ label, results }) {
    return (_jsxs("div", Object.assign({ className: 'spotlight-search-section' }, { children: [_jsx("div", Object.assign({ className: 'spotlight-search-section-title' }, { children: _jsx("p", { children: label }) })), _jsx("div", Object.assign({ className: 'spotlight-search-section-results' }, { children: results.map((result) => {
                    var _a;
                    return (_jsx("p", { children: (_a = result.label) !== null && _a !== void 0 ? _a : result.key }, result.key));
                }) }))] })));
}
