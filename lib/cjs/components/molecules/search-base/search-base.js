"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBase = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hotkeys_hook_1 = require("react-hotkeys-hook");
const search_input_1 = require("../search-input");
const search_section_1 = require("../search-section");
const search_error_1 = require("../search-error");
const search_tips_1 = require("../search-tips");
const search_1 = require("../../../utils/search");
const atoms_1 = require("../../../components/atoms");
const utils_1 = require("../../../utils");
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
function SearchBase() {
    const { type, visible, parentId, loading, selectedItem, setVisible, setLoading, setParentId, setSelectedItem, } = (0, utils_1.useSearchContext)();
    const searchRef = (0, react_1.createRef)();
    const resultsRef = (0, react_1.createRef)();
    const [search, setSearch] = (0, react_1.useState)('');
    const [forceUpdate, setForceUpdate] = (0, react_1.useState)(Date.now());
    const forceUpdateEvent = (0, react_1.useCallback)(() => {
        setForceUpdate(Date.now());
    }, []);
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.CATALOG_UPDATE_EVENT, forceUpdateEvent);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.CATALOG_UPDATE_EVENT, forceUpdateEvent);
        };
    }, [forceUpdateEvent]);
    const results = (0, react_1.useMemo)(() => {
        return (0, search_1.getResultsByParentId)(parentId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, utils_1.catalog.items, parentId, forceUpdate]);
    const categories = (0, react_1.useMemo)(() => {
        var _a, _b, _c;
        const newResults = [...((_a = results.map((item) => (Object.assign({}, item)))) !== null && _a !== void 0 ? _a : [])];
        const filteredResults = (0, utils_1.fuzzySearch)(search, newResults, type === 'search');
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
                if (result.category === 'Pages') {
                    categoriesObject.Pages.action = {
                        label: 'All pages',
                        action: () => {
                            setSearch('/');
                        },
                    };
                }
                if (result.category === 'Commands') {
                    categoriesObject.Commands.action = {
                        label: 'All commands',
                        action: () => {
                            setSearch('>');
                        },
                    };
                }
                if (result.category === 'Recently used') {
                    categoriesObject['Recently used'].action = {
                        label: 'Clear',
                        action: () => {
                            (0, utils_1.clearHistory)();
                            setForceUpdate(Date.now());
                        },
                    };
                }
            }
            else {
                categoriesObject[result.category].results.push(result);
            }
        }
        const history = (0, utils_1.getHistory)();
        const categoriesArr = Object.values(categoriesObject);
        if ((_c = (_b = categoriesObject['Recently used']) === null || _b === void 0 ? void 0 : _b.results) === null || _c === void 0 ? void 0 : _c.length) {
            // Order the recently used results by most recent
            categoriesObject['Recently used'].results.sort((a, b) => {
                return history.indexOf(a.id) - history.indexOf(b.id);
            });
            // Add the recently used results to the top of the list
            const historyIndex = categoriesArr.findIndex((category) => category.label === 'Recently used');
            categoriesArr.splice(historyIndex, 1);
            categoriesArr.splice(0, 0, categoriesObject['Recently used']);
        }
        // Return an array of categories
        return categoriesArr;
    }, [setForceUpdate, search, results, type]);
    const showIcons = (0, react_1.useMemo)(() => {
        return results.some((result) => result.icon);
    }, [results]);
    const scrollResultIntoView = (0, react_1.useCallback)((id) => {
        const selectedId = id !== null && id !== void 0 ? id : selectedItem;
        if (!selectedId || !resultsRef)
            return;
        if (!(categories === null || categories === void 0 ? void 0 : categories.length))
            return;
        const firstItem = categories[0].results[0].id;
        const lastItem = categories[categories.length - 1]
            .results[categories[categories.length - 1].results.length - 1].id;
        const el = document.querySelector(`#option-${selectedId}`);
        if (!el)
            return;
        el.scrollIntoView({
            behavior: 'smooth',
            block: selectedId === firstItem ? 'end' : selectedId === lastItem ? 'start' : 'nearest',
        });
    }, [selectedItem, categories, resultsRef]);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d, _e, _f;
        if (!selectedItem) {
            setSelectedItem((_c = (_b = (_a = categories === null || categories === void 0 ? void 0 : categories[0]) === null || _a === void 0 ? void 0 : _a.results) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.id);
            return;
        }
        let exists = false;
        for (const cat of categories) {
            for (const result of cat.results) {
                if (result.id === selectedItem) {
                    exists = true;
                    break;
                }
            }
        }
        if (!exists) {
            setSelectedItem((_f = (_e = (_d = categories === null || categories === void 0 ? void 0 : categories[0]) === null || _d === void 0 ? void 0 : _d.results) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.id);
        }
    }, [categories, search, selectedItem, setSelectedItem]);
    const parentIdExists = (0, react_1.useCallback)((catalog, id) => {
        var _a;
        for (const item of catalog) {
            if (item.id === id) {
                return true;
            }
            if ((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) {
                return parentIdExists(item.children, id);
            }
        }
        return false;
    }, []);
    (0, react_1.useEffect)(() => {
        if (!parentId)
            return;
        if (!parentIdExists(utils_1.catalog.items, parentId)) {
            // eslint-disable-next-line unicorn/no-useless-undefined
            setParentId(undefined);
        }
    }, [categories, parentId, setParentId, parentIdExists]);
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
        enabled: visible && !!parentId && !loading,
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
        enabled: visible && !loading,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [search, selectedItem, type]);
    (0, react_hotkeys_hook_1.useHotkeys)('up', (e) => {
        preventDefault(e);
        if (loading)
            return;
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
                const newId = newCategory.results[newCategory.results.length - 1].id;
                setSelectedItem(newId);
                scrollResultIntoView(newId);
                return;
            }
            const newId = category.results[indexInCategory - 1].id;
            setSelectedItem(newId);
            scrollResultIntoView(newId);
        }
    }, {
        enabled: visible && !!(categories === null || categories === void 0 ? void 0 : categories.length),
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem, loading, scrollResultIntoView]);
    (0, react_hotkeys_hook_1.useHotkeys)('down', (e) => {
        preventDefault(e);
        if (loading)
            return;
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
                const newId = newCategory.results[0].id;
                setSelectedItem(newId);
                scrollResultIntoView(newId);
                return;
            }
            const newId = category.results[indexInCategory + 1].id;
            setSelectedItem(newId);
            scrollResultIntoView(newId);
        }
    }, {
        enabled: visible && !!(categories === null || categories === void 0 ? void 0 : categories.length),
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem, loading]);
    return ((0, jsx_runtime_1.jsx)(atoms_1.Overlay, Object.assign({ visible: visible, setVisible: setVisible }, { children: (0, jsx_runtime_1.jsxs)(atoms_1.Container, Object.assign({ className: `spotlight-search-box ${!showIcons ? ' spotlight-search-box-no-icons' : ''}`.trim() }, { children: [(0, jsx_runtime_1.jsx)(search_input_1.SearchInput, { type: type, forwardRef: searchRef, value: search, onValueChange: (v) => setSearch(v) }), (0, jsx_runtime_1.jsx)(search_error_1.SearchError, {}), categories.length > 0 && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-results', ref: resultsRef }, { children: [(0, jsx_runtime_1.jsx)(search_tips_1.SearchTips, { visible: search.length === 0 }), categories.map((category) => ((0, jsx_runtime_1.jsx)(search_section_1.SearchSection, { category: category }, category.id)))] })))] })) })));
}
exports.SearchBase = SearchBase;
