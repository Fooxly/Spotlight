"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const search_result_1 = require("../search-result");
const utils_1 = require("../../../utils");
function SearchSection({ category }) {
    const { loading } = (0, utils_1.useSearchContext)();
    const handleSectionButton = () => {
        if (loading)
            return;
        category.action.action();
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-section' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-section-title' }, { children: [(0, jsx_runtime_1.jsx)("p", { children: category.label }), !!category.action && (
                    // eslint-disable-next-line react/jsx-handler-names
                    (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleSectionButton, disabled: loading }, { children: category.action.label })))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-search-section-results' }, { children: category.results.map((result) => ((0, jsx_runtime_1.jsx)(search_result_1.SearchResult, { result: result }, result.id))) }))] })));
}
exports.SearchSection = SearchSection;
