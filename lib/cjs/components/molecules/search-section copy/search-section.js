"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./styles.css");
function SearchSection({ label, results }) {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-section' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-search-section-title' }, { children: (0, jsx_runtime_1.jsx)("p", { children: label }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-search-section-results' }, { children: results.map((result) => {
                    var _a;
                    return ((0, jsx_runtime_1.jsx)("p", { children: (_a = result.label) !== null && _a !== void 0 ? _a : result.key }, result.key));
                }) }))] })));
}
exports.SearchSection = SearchSection;
