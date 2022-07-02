import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRef, useCallback, useEffect, useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { SearchInput } from '../search-input';
import { SearchSection } from '../search-section';
import { Container, Overlay } from '../../../components/atoms';
import { getUUID, useSearchContext, fuzzySearch, PICKED_RESULT_EVENT_KEY } from '../../../utils';
import './styles.css';
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
export function SearchBase() {
    const { search, showIcons, results, type, visible, setVisible, selectedItem, setSelectedItem } = useSearchContext();
    const resultsRef = createRef();
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
    const doesSelectedItemExist = useCallback(() => {
        return categories.some((cat) => cat.results.find((result) => result.id === selectedItem));
    }, [categories, selectedItem]);
    const updateSelectedItemHighlight = useCallback(() => {
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
    const forceResetToFirst = useCallback(() => {
        var _a;
        setSelectedItem((_a = categories[0]) === null || _a === void 0 ? void 0 : _a.results[0].id);
        updateSelectedItemHighlight();
    }, [categories, setSelectedItem, updateSelectedItemHighlight]);
    useEffect(() => {
        var _a;
        if (selectedItem && doesSelectedItemExist())
            return;
        // Reset the selected item
        setSelectedItem((_a = categories[0]) === null || _a === void 0 ? void 0 : _a.results[0].id);
    }, [categories, doesSelectedItemExist, results, selectedItem, setSelectedItem]);
    // When search is updated, the first result should always be selected as this will be the top result
    useEffect(() => {
        forceResetToFirst();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);
    const checkForReset = useCallback(() => {
        if (!selectedItem || !doesSelectedItemExist()) {
            if (categories)
                setSelectedItem(categories[0].results[0].id);
            else
                setSelectedItem(null);
        }
    }, [categories, doesSelectedItemExist, selectedItem, setSelectedItem]);
    useEffect(() => {
        updateSelectedItemHighlight();
    }, [categories, resultsRef, updateSelectedItemHighlight]);
    useHotkeys('up', (ev) => {
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
    useHotkeys('down', (ev) => {
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
    useHotkeys('enter', (e) => {
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
        const ev = new CustomEvent(PICKED_RESULT_EVENT_KEY, {
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
    return (_jsx(Overlay, Object.assign({ visible: visible, setVisible: setVisible }, { children: _jsxs(Container, Object.assign({ className: `spotlight-search-box ${!showIcons ? ' spotlight-search-box-no-icons' : ''}`.trim() }, { children: [_jsx(SearchInput, { type: type }), categories.length > 0 && (_jsx("div", Object.assign({ className: 'spotlight-search-results', ref: resultsRef }, { children: categories.map((category) => (_jsx(SearchSection, { category: category }, category.id))) })))] })) })));
}
