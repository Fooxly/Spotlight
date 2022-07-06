"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBase = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hotkeys_hook_1 = require("react-hotkeys-hook");
const search_input_1 = require("../search-input");
const search_section_1 = require("../search-section");
const search_error_1 = require("../search-error");
const search_1 = require("../../../utils/search");
const atoms_1 = require("../../../components/atoms");
const utils_1 = require("../../../utils");
require("./styles.css");
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
function SearchBase() {
    const { type, visible, parentId, selectedItem, setVisible, setLoading, setParentId, setSelectedItem, } = (0, utils_1.useSearchContext)();
    const searchRef = (0, react_1.createRef)();
    const resultsRef = (0, react_1.createRef)();
    const [search, setSearch] = (0, react_1.useState)('');
    const results = (0, react_1.useMemo)(() => {
        return (0, search_1.getResultsByParentId)(parentId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [utils_1.catalog.items, parentId]);
    const categories = (0, react_1.useMemo)(() => {
        const filteredResults = (0, utils_1.fuzzySearch)(search, results);
        // Categorise all the results
        const categoriesObject = {};
        const hasRecommendation = search.length > 0 && filteredResults.length > 0;
        if (hasRecommendation) {
            categoriesObject['Top Result'] = {
                id: (0, utils_1.getUUID)(),
                label: 'Top Result',
                results: [filteredResults[0]],
            };
        }
        for (const result of filteredResults.slice(hasRecommendation ? 1 : 0)) {
            if (!categoriesObject[result.category]) {
                categoriesObject[result.category] = {
                    id: (0, utils_1.getUUID)(),
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
    const showIcons = (0, react_1.useMemo)(() => {
        return results.some((result) => result.icon);
    }, [results]);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c;
        setSelectedItem((_c = (_b = (_a = categories === null || categories === void 0 ? void 0 : categories[0]) === null || _a === void 0 ? void 0 : _a.results) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.id);
    }, [categories, search, setSelectedItem]);
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setSelectedItem(undefined);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setParentId(undefined);
        setSearch('');
        setLoading(false);
    }, [setLoading, setSearch, setParentId, setSelectedItem, type]);
    (0, react_1.useEffect)(() => {
        setSearch('');
        setLoading(false);
    }, [setLoading, setSearch, parentId]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        (_b = (_a = searchRef.current) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
    }, [searchRef]);
    (0, react_hotkeys_hook_1.useHotkeys)('backspace', (ev) => {
        if (search.length > 0 || !parentId)
            return;
        preventDefault(ev);
        const parent = (0, search_1.getResultById)(parentId);
        setParentId(parent === null || parent === void 0 ? void 0 : parent.parent);
    }, {
        enabled: visible && !!parentId,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [search, utils_1.catalog, parentId]);
    (0, react_hotkeys_hook_1.useHotkeys)('enter', (e) => {
        var _a;
        preventDefault(e);
        if (type === 'input') {
            const ev = new CustomEvent(utils_1.SEARCH_CLOSED_EVENT_KEY, {
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
            const item = (0, search_1.getResultById)(selectedItem);
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
    (0, react_hotkeys_hook_1.useHotkeys)('up', (e) => {
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
    (0, react_hotkeys_hook_1.useHotkeys)('down', (e) => {
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
    return ((0, jsx_runtime_1.jsx)(atoms_1.Overlay, Object.assign({ visible: visible, setVisible: setVisible }, { children: (0, jsx_runtime_1.jsxs)(atoms_1.Container, Object.assign({ className: `spotlight-search-box ${!showIcons ? ' spotlight-search-box-no-icons' : ''}`.trim() }, { children: [(0, jsx_runtime_1.jsx)(search_input_1.SearchInput, { type: type, forwardRef: searchRef, value: search, onValueChange: (v) => setSearch(v) }), (0, jsx_runtime_1.jsx)(search_error_1.SearchError, {}), categories.length > 0 && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-search-results', ref: resultsRef }, { children: categories.map((category) => ((0, jsx_runtime_1.jsx)(search_section_1.SearchSection, { category: category }, category.id))) })))] })) })));
}
exports.SearchBase = SearchBase;
