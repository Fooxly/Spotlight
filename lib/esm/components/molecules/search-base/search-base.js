import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRef, useEffect, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { SearchInput } from '../search-input';
import { SearchSection } from '../search-section';
import { getResultById, getResultsByParentId } from '../../../utils/search';
import { Container, Overlay } from '../../../components/atoms';
import { getUUID, useSearchContext, fuzzySearch, SEARCH_CLOSED_EVENT_KEY, catalog } from '../../../utils';
import './styles.css';
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
export function SearchBase() {
    const { type, visible, parentId, selectedItem, setVisible, setLoading, setParentId, setSelectedItem, } = useSearchContext();
    const searchRef = createRef();
    const resultsRef = createRef();
    const [search, setSearch] = useState('');
    const results = useMemo(() => {
        return getResultsByParentId(catalog.items, parentId);
    }, [catalog.items, parentId]);
    const categories = useMemo(() => {
        const filteredResults = fuzzySearch(search, results);
        // Categorise all the results
        const categoriesObject = {};
        const hasRecommendation = search.length > 0 && filteredResults.length > 0;
        if (hasRecommendation) {
            categoriesObject['Top Result'] = {
                id: getUUID(),
                label: 'Top Result',
                results: [filteredResults[0]],
            };
        }
        for (const result of filteredResults.slice(hasRecommendation ? 1 : 0)) {
            if (!categoriesObject[result.category]) {
                categoriesObject[result.category] = {
                    id: getUUID(),
                    label: result.category,
                    results: [result],
                };
            }
            else {
                categoriesObject[result.category].results.push(result);
            }
        }
        // Return an array of categories
        return Object.values(categoriesObject);
    }, [search, results]);
    const showIcons = useMemo(() => {
        return results.some((result) => result.icon);
    }, [results]);
    useEffect(() => {
        var _a, _b, _c;
        setSelectedItem((_c = (_b = (_a = categories === null || categories === void 0 ? void 0 : categories[0]) === null || _a === void 0 ? void 0 : _a.results) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.id);
    }, [categories, search, setSelectedItem]);
    useEffect(() => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setSelectedItem(undefined);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setParentId(undefined);
        setSearch('');
        setLoading(false);
    }, [setLoading, setSearch, setParentId, setSelectedItem, type]);
    useEffect(() => {
        setSearch('');
        setLoading(false);
    }, [setLoading, setSearch, parentId]);
    useEffect(() => {
        var _a, _b;
        (_b = (_a = searchRef.current) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
    }, [searchRef]);
    useHotkeys('backspace', (ev) => {
        if (search.length > 0 || !parentId)
            return;
        preventDefault(ev);
        const parent = getResultById(catalog.items, parentId);
        setParentId(parent === null || parent === void 0 ? void 0 : parent.parent);
    }, {
        enabled: visible && !!parentId,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [search, catalog, parentId]);
    useHotkeys('enter', (e) => {
        var _a;
        preventDefault(e);
        if (type === 'input') {
            const ev = new CustomEvent(SEARCH_CLOSED_EVENT_KEY, {
                bubbles: false,
                detail: {
                    value: search,
                },
            });
            document.dispatchEvent(ev);
        }
        else {
            if (!selectedItem)
                return;
            const item = getResultById(catalog.items, selectedItem);
            if (!item)
                return;
            if (!((_a = item.children) === null || _a === void 0 ? void 0 : _a.length)) {
                item.action(item);
                return;
            }
            setParentId(item.id);
        }
    }, {
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [search, selectedItem, type]);
    useHotkeys('up', (e) => {
        preventDefault(e);
        for (const category of categories) {
            const indexInCategory = category.results.findIndex((result) => result.id === selectedItem);
            if (indexInCategory === -1)
                continue;
            if (indexInCategory === 0) {
                const categoryIndex = categories.findIndex((cat) => cat.id === category.id);
                let newCategoryIndex = categoryIndex - 1;
                if (categoryIndex === 0) {
                    newCategoryIndex = categories.length - 1;
                }
                const newCategory = categories[newCategoryIndex];
                setSelectedItem(newCategory.results[newCategory.results.length - 1].id);
                return;
            }
            setSelectedItem(category.results[indexInCategory - 1].id);
        }
    }, {
        enabled: visible && !!(categories === null || categories === void 0 ? void 0 : categories.length),
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem]);
    useHotkeys('down', (e) => {
        preventDefault(e);
        for (const category of categories) {
            const indexInCategory = category.results.findIndex((result) => result.id === selectedItem);
            if (indexInCategory === -1)
                continue;
            if (indexInCategory === category.results.length - 1) {
                const categoryIndex = categories.findIndex((cat) => cat.id === category.id);
                let newCategoryIndex = categoryIndex + 1;
                if (categoryIndex === categories.length - 1) {
                    newCategoryIndex = 0;
                }
                const newCategory = categories[newCategoryIndex];
                setSelectedItem(newCategory.results[0].id);
                return;
            }
            setSelectedItem(category.results[indexInCategory + 1].id);
        }
    }, {
        enabled: visible && !!(categories === null || categories === void 0 ? void 0 : categories.length),
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem]);
    return (_jsx(Overlay, Object.assign({ visible: visible, setVisible: setVisible }, { children: _jsxs(Container, Object.assign({ className: `spotlight-search-box ${!showIcons ? ' spotlight-search-box-no-icons' : ''}`.trim() }, { children: [_jsx(SearchInput, { type: type, forwardRef: searchRef, value: search, onValueChange: (v) => setSearch(v) }), categories.length > 0 && (_jsx("div", Object.assign({ className: 'spotlight-search-results', ref: resultsRef }, { children: categories.map((category) => (_jsx(SearchSection, { category: category }, category.id))) })))] })) })));
}
