import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { SearchInput } from '../search-input';
import { SearchSection } from '../search-section';
import { SearchError } from '../search-error';
import { SearchTips } from '../search-tips';

import { getResultById, getResultsByParentId } from '@/utils/search';
import { Container, Overlay } from '@/components/atoms';
import {
    getUUID,
    useSearchContext,
    fuzzySearch,
    SEARCH_CLOSED_EVENT_KEY,
    catalog,
    clearHistory,
    getHistory,
    CATALOG_UPDATE_EVENT,
} from '@/utils';
import { Category, Result, SearchCloseEvent } from '@/types';

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
        loading,
        selectedItem,
        setVisible,
        setLoading,
        setParentId,
        setSelectedItem,
    } = useSearchContext();
    const searchRef = createRef<HTMLInputElement>();
    const resultsRef = createRef<HTMLDivElement>();
    const [search, setSearch] = useState('');
    const [forceUpdate, setForceUpdate] = useState(Date.now());

    const forceUpdateEvent = useCallback(() => {
        setForceUpdate(Date.now());
    }, []);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(CATALOG_UPDATE_EVENT, forceUpdateEvent as any);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(CATALOG_UPDATE_EVENT, forceUpdateEvent as any);
        };
    }, [forceUpdateEvent]);

    const results = useMemo(() => {
        return getResultsByParentId(parentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, catalog.items, parentId, forceUpdate]);

    const categories: Category[] = useMemo(() => {
        const newResults = [...(results.map((item) => ({ ...item })) ?? [])];
        const filteredResults = fuzzySearch(search, newResults, type === 'search');

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
                            clearHistory();
                            setForceUpdate(Date.now());
                        },
                    };
                }
            } else {
                categoriesObject[result.category].results.push(result);
            }
        }
        const history = getHistory();
        const categoriesArr = Object.values(categoriesObject);
        if (categoriesObject['Recently used']?.results?.length) {
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

    const showIcons = useMemo(() => {
        return results.some((result) => result.icon);
    }, [results]);

    const scrollResultIntoView = useCallback((id?: string) => {
        const selectedId = id ?? selectedItem;
        if (!selectedId || !resultsRef) return;
        if (!categories?.length) return;
        const firstItem = categories[0].results[0].id;
        const lastItem =
            categories[categories.length - 1]
                .results[categories[categories.length - 1].results.length - 1].id;
        const el = document.querySelector(`#option-${selectedId}`);
        if (!el) return;
        el.scrollIntoView({
            behavior: 'smooth',
            block: selectedId === firstItem ? 'end' : selectedId === lastItem ? 'start' : 'nearest',
        });
    }, [selectedItem, categories, resultsRef]);

    useEffect(() => {
        if (!selectedItem) {
            setSelectedItem(categories?.[0]?.results?.[0]?.id);
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
            setSelectedItem(categories?.[0]?.results?.[0]?.id);
        }
    }, [categories, search, selectedItem, setSelectedItem]);

    const parentIdExists = useCallback((catalog: Result[], id: string): boolean => {
        for (const item of catalog) {
            if (item.id === id) {
                return true;
            }
            if (item.children?.length) {
                return parentIdExists(item.children, id);
            }
        }
        return false;
    }, []);

    useEffect(() => {
        if (!parentId) return;
        if (!parentIdExists(catalog.items, parentId)) {
            // eslint-disable-next-line unicorn/no-useless-undefined
            setParentId(undefined);
        }
    }, [categories, parentId, setParentId, parentIdExists]);

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
        enabled: visible && !!parentId && !loading,
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
        enabled: visible && !loading,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [search, selectedItem, type]);

    useHotkeys('up', (e) => {
        preventDefault(e);
        if (loading) return;
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
        enabled: visible && !!categories?.length,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem, loading, scrollResultIntoView]);

    useHotkeys('down', (e) => {
        preventDefault(e);
        if (loading) return;
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
        enabled: visible && !!categories?.length,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [categories, selectedItem, setSelectedItem, loading]);

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
