import React, { createRef, useCallback, useEffect, useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { SearchInput } from '../search-input';
import { SearchSection } from '../search-section';

import { Container, Overlay } from '@/components/atoms';
import { getUUID, useSearchContext, fuzzySearch, PICKED_RESULT_EVENT_KEY } from '@/utils';
import { Category, ResultPickedEvent } from '@/types';

import './styles.css';

const preventDefault = (ev: KeyboardEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
};

export function SearchBase (): JSX.Element {
    const { search, showIcons, results, type, visible, setVisible, selectedItem, setSelectedItem } = useSearchContext();
    const resultsRef = createRef<HTMLDivElement>();

    const categories: Category[] = useMemo(() => {
        const filteredResults = fuzzySearch(search, results);

        // Categorise all the results
        const categoriesObject: Record<string, Category> = {};

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
            } else {
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
        if (!resultsRef?.current || !selectedItem || !categories) return;
        const firstItem = categories[0].results[0].id;
        const lastItem =
            categories[categories.length - 1]
                .results[categories[categories.length - 1].results.length - 1].id;
        const el = resultsRef?.current?.querySelector(`#option-${selectedItem}`);
        if (!el) return;
        el.scrollIntoView({
            behavior: 'smooth',
            block: selectedItem === firstItem ? 'end' : selectedItem === lastItem ? 'start' : 'nearest',
        });
    }, [categories, resultsRef, selectedItem]);

    const forceResetToFirst = useCallback(() => {
        setSelectedItem(categories[0]?.results[0].id);
        updateSelectedItemHighlight();
    }, [categories, setSelectedItem, updateSelectedItemHighlight]);

    useEffect(() => {
        if (selectedItem && doesSelectedItemExist()) return;
        // Reset the selected item
        setSelectedItem(categories[0]?.results[0].id);
    }, [categories, doesSelectedItemExist, results, selectedItem, setSelectedItem]);

    // When search is updated, the first result should always be selected as this will be the top result
    useEffect(() => {
        forceResetToFirst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const checkForReset = useCallback(() => {
        if (!selectedItem || !doesSelectedItemExist()) {
            if (categories) setSelectedItem(categories[0].results[0].id);
            else setSelectedItem(null);
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
            if (indexInCategory === -1) continue;
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
            if (indexInCategory === -1) continue;
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
        let result: string | undefined;
        if (type === 'input') {
            result = search;
        } else {
            if (!selectedItem) return;
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
            } as ResultPickedEvent,
        });
        document.dispatchEvent(ev);
    }, {
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [search, selectedItem, type]);

    return (
        <Overlay visible={visible} setVisible={setVisible}>
            <Container className={`spotlight-search-box ${!showIcons ? ' spotlight-search-box-no-icons' : ''}`.trim()}>
                <SearchInput type={type} />
                {categories.length > 0 && (
                    <div className='spotlight-search-results' ref={resultsRef}>
                        {categories.map((category: Category) => (
                            <SearchSection category={category} key={category.id} />
                        ))}
                    </div>
                )}
            </Container>
        </Overlay>
    );
}
