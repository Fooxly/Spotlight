"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBase = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hotkeys_hook_1 = require("react-hotkeys-hook");
const search_input_1 = require("../search-input");
const search_section_1 = require("../search-section");
const atoms_1 = require("../../../components/atoms");
const utils_1 = require("../../../utils");
require("./styles.css");
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
function SearchBase() {
    const { search, showIcons, results, type, visible, setVisible, selectedItem, setSelectedItem } = (0, utils_1.useSearchContext)();
    const resultsRef = (0, react_1.createRef)();
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
    const doesSelectedItemExist = (0, react_1.useCallback)(() => {
        return categories.some((cat) => cat.results.find((result) => result.id === selectedItem));
    }, [categories, selectedItem]);
    const updateSelectedItemHighlight = (0, react_1.useCallback)(() => {
        var _a;
        if (!(resultsRef === null || resultsRef === void 0 ? void 0 : resultsRef.current) || !selectedItem || !categories)
            return;
        const firstItem = categories[0].results[0].id;
        const lastItem = categories[categories.length - 1]
            .results[categories[categories.length - 1].results.length - 1].id;
        const el = (_a = resultsRef === null || resultsRef === void 0 ? void 0 : resultsRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(`#option-${selectedItem}`);
        if (!el)
            return;
        el.scrollIntoView({
            behavior: 'smooth',
            block: selectedItem === firstItem ? 'end' : selectedItem === lastItem ? 'start' : 'nearest',
        });
    }, [categories, resultsRef, selectedItem]);
    const forceResetToFirst = (0, react_1.useCallback)(() => {
        var _a;
        setSelectedItem((_a = categories[0]) === null || _a === void 0 ? void 0 : _a.results[0].id);
        updateSelectedItemHighlight();
    }, [categories, setSelectedItem, updateSelectedItemHighlight]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (selectedItem && doesSelectedItemExist())
            return;
        // Reset the selected item
        setSelectedItem((_a = categories[0]) === null || _a === void 0 ? void 0 : _a.results[0].id);
    }, [categories, doesSelectedItemExist, results, selectedItem, setSelectedItem]);
    // When search is updated, the first result should always be selected as this will be the top result
    (0, react_1.useEffect)(() => {
        forceResetToFirst();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);
    const checkForReset = (0, react_1.useCallback)(() => {
        if (!selectedItem || !doesSelectedItemExist()) {
            if (categories)
                setSelectedItem(categories[0].results[0].id);
            else
                setSelectedItem(null);
        }
    }, [categories, doesSelectedItemExist, selectedItem, setSelectedItem]);
    (0, react_1.useEffect)(() => {
        updateSelectedItemHighlight();
    }, [categories, resultsRef, updateSelectedItemHighlight]);
    (0, react_hotkeys_hook_1.useHotkeys)('up', (ev) => {
        preventDefault(ev);
        checkForReset();
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
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem]);
    (0, react_hotkeys_hook_1.useHotkeys)('down', (ev) => {
        preventDefault(ev);
        checkForReset();
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
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem]);
    (0, react_hotkeys_hook_1.useHotkeys)('enter', (e) => {
        preventDefault(e);
        let result;
        if (type === 'input') {
            result = search;
        }
        else {
            if (!selectedItem)
                return;
            // get the result from the selected item
            for (const category of categories) {
                const r = category.results.find((result) => result.id === selectedItem);
                if (r) {
                    result = r.id;
                    break;
                }
            }
        }
        const ev = new CustomEvent(utils_1.PICKED_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: result,
            },
        });
        document.dispatchEvent(ev);
    }, {
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [search, selectedItem, type]);
    return ((0, jsx_runtime_1.jsx)(atoms_1.Overlay, Object.assign({ visible: visible, setVisible: setVisible }, { children: (0, jsx_runtime_1.jsxs)(atoms_1.Container, Object.assign({ className: `spotlight-search-box ${!showIcons ? ' spotlight-search-box-no-icons' : ''}`.trim() }, { children: [(0, jsx_runtime_1.jsx)(search_input_1.SearchInput, { type: type }), categories.length > 0 && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-search-results', ref: resultsRef }, { children: categories.map((category) => ((0, jsx_runtime_1.jsx)(search_section_1.SearchSection, { category: category }, category.id))) })))] })) })));
}
exports.SearchBase = SearchBase;
