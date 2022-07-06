import React, { createRef, useEffect, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { SearchInput } from '../search-input';
import { SearchSection } from '../search-section';
import { SearchError } from '../search-error';
import { SearchTips } from '../search-tips';

import { getResultById, getResultsByParentId } from '@/utils/search';
import { Container, Overlay } from '@/components/atoms';
import { getUUID, useSearchContext, fuzzySearch, SEARCH_CLOSED_EVENT_KEY, catalog } from '@/utils';
import { Category, SearchCloseEvent } from '@/types';

import './styles.css';

const preventDefault = (ev: KeyboardEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
};

export function SearchBase (): JSX.Element {
    const {
        type,
        visible,
        parentId,
        selectedItem,
        setVisible,
        setLoading,
        setParentId,
        setSelectedItem,
    } = useSearchContext();
    const searchRef = createRef<HTMLInputElement>();
    const resultsRef = createRef<HTMLDivElement>();
    const [search, setSearch] = useState('');

    const results = useMemo(() => {
        return getResultsByParentId(parentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catalog.items, parentId]);

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

    const showIcons = useMemo(() => {
        return results.some((result) => result.icon);
    }, [results]);

    useEffect(() => {
        setSelectedItem(categories?.[0]?.results?.[0]?.id);
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
        searchRef.current?.focus?.();
    }, [searchRef]);

    useHotkeys('backspace', (ev) => {
        if (search.length > 0 || !parentId) return;
        preventDefault(ev);
        const parent = getResultById(parentId);
        setParentId(parent?.parent);
    }, {
        enabled: visible && !!parentId,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [search, catalog, parentId]);

    useHotkeys('enter', (e) => {
        preventDefault(e);
        if (type === 'input') {
            const ev = new CustomEvent(SEARCH_CLOSED_EVENT_KEY, {
                bubbles: false,
                detail: {
                    value: search,
                } as SearchCloseEvent,
            });
            document.dispatchEvent(ev);
        } else {
            if (!selectedItem) return;
            const item = getResultById(selectedItem);
            if (!item) return;
            if (!item.children?.length) {
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
        enabled: visible && !!categories?.length,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem]);

    useHotkeys('down', (e) => {
        preventDefault(e);
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
        enabled: visible && !!categories?.length,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem]);

    return (
        <Overlay visible={visible} setVisible={setVisible}>
            <Container className={`spotlight-search-box ${!showIcons ? ' spotlight-search-box-no-icons' : ''}`.trim()}>
                <SearchInput type={type} forwardRef={searchRef} value={search} onValueChange={(v) => setSearch(v)} />
                <SearchError />
                {categories.length > 0 && (
                    <div className='spotlight-search-results' ref={resultsRef}>
                        <SearchTips visible={search.length === 0} />
                        {categories.map((category: Category) => (
                            <SearchSection category={category} key={category.id} />
                        ))}
                    </div>
                )}
            </Container>
        </Overlay>
    );
}
