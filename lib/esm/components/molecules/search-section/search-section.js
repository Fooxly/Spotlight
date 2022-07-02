import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SearchResult } from '../search-result';
import './styles.css';
export function SearchSection({ category }) {
    return (_jsxs("div", Object.assign({ className: 'spotlight-search-section' }, { children: [_jsxs("div", Object.assign({ className: 'spotlight-search-section-title' }, { children: [_jsx("p", { children: category.label }), !!category.action && (
                    // eslint-disable-next-line react/jsx-handler-names
                    _jsx("button", Object.assign({ onClick: () => category.action.action() }, { children: category.action.label })))] })), _jsx("div", Object.assign({ className: 'spotlight-search-section-results' }, { children: category.results.map((result) => (_jsx(SearchResult, { result: result }, result.id))) }))] })));
}
