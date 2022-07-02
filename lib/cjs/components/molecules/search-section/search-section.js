"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const search_result_1 = require("../search-result");
require("./styles.css");
function SearchSection({ category }) {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-section' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-section-title' }, { children: [(0, jsx_runtime_1.jsx)("p", { children: category.label }), !!category.action && (
                    // eslint-disable-next-line react/jsx-handler-names
                    (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => category.action.action() }, { children: category.action.label })))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-search-section-results' }, { children: category.results.map((result) => ((0, jsx_runtime_1.jsx)(search_result_1.SearchResult, { result: result }, result.id))) }))] })));
}
exports.SearchSection = SearchSection;
