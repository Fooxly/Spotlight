import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys, Options } from 'react-hotkeys-hook';

import { SearchInput } from './search-input';
import { Section } from './section';
import { Error } from './error';

import type { Category, Command, CommandOption, ItemOptions, Result, SpotlightType } from '@/types';
import {
    filterResults,
    executeItem,
    updateHistory,
    clearHistory,
    ERRORS,
    INPUT_TYPE_EVENT_KEY,
    TEXT_INPUT_RESULT_EVENT_KEY,
    SpotlightContext,
} from '@/utils';

// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector<HTMLDivElement>('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}

const preventDefault = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
};

export function SpotlightComponent (): JSX.Element | null {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [reloadVersion, setReloadVersion] = useState(-1);
    const [subMenuItem, setSubMenuItem] = useState<Command | null>();
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const inputRef = createRef<HTMLInputElement>();
    const resultsRef = createRef<HTMLDivElement>();
    const [spotlightType, setSpotlightType] = useState<SpotlightType>('search');
    const [placeholder, setPlaceholder] = useState<string | null>(null);
    const [answers, setAnswers] = useState<string[] | CommandOption[] | null>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(INPUT_TYPE_EVENT_KEY, changeInputType as any, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(INPUT_TYPE_EVENT_KEY, changeInputType as any, false);
        // return () => {
        // };
    }, []);

    const changeInputType = (
        ev: { detail: { type: SpotlightType; question?: string; answers?: string[] | CommandOption[] | null } },
    ) => {
        setVisible(true);
        setSpotlightType(ev.detail.type);
        setAnswers(ev.detail.answers!);
        setPlaceholder(ev.detail.type === 'search' ? null : (ev.detail.question ?? null));
    };

    const HOTKEY_OPTIONS: Options = useMemo(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);

    // Get the results which should be indexed and rendered
    const indexedResults: Category[] = useMemo(() => {
        if (answers) {
            return filterResults(
                search,
                {
                    title: placeholder ?? 'Options',
                    items: answers.map((answer) => ({
                        title: typeof answer === 'string' ? answer : answer.title,
                        options: {
                            icon: typeof answer === 'string' ? null : answer.icon,
                            keywords: typeof answer === 'string' ? null : answer.keywords,
                        } as ItemOptions,
                        type: 'command',
                    })),
                },
            );
        }

        if (subMenuItem?.options?.options) {
            return filterResults(
                search,
                {
                    title: subMenuItem.title,
                    items:
                        subMenuItem?.options?.options.map((item) => ({
                            title: typeof item === 'string' ? item : item.title,
                            options: {
                                icon: typeof item === 'string' ? undefined : item.icon,
                                keywords: typeof item === 'string' ? undefined : item.keywords,
                            },
                            type: 'command',
                            parentCommand: subMenuItem,
                        })),
                },
            );
        }
        return filterResults(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers, placeholder, visible, reloadVersion, search, subMenuItem]);

    const resultCount = useMemo(() => indexedResults.reduce((count, cat) => cat.results.length + count, 0), [indexedResults]);

    // When the spotlight is closed, reset all the values
    useEffect(() => {
        if (visible) return;
        setSearch('');
        setError('');
        setSpotlightType('search');
        setPlaceholder(null);
        setAnswers(null);
        setLoading(false);
        setSelectedIndex(0);
        setSubMenuItem(null);
    }, [visible]);

    useEffect(() => {
        setError('');
        setSelectedIndex(0);
    }, [search, subMenuItem]);

    const toggleVisible = () => setVisible((last) => !last);
    const hideSpotlight = () => setVisible(false);

    const executeCommand = (command: Command, result?: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res = executeItem(command, result);
        if (res instanceof Promise) {
            setLoading(true);
            res.then(() => {
                setLoading(false);
                hideSpotlight();
            }).catch((error: { message: string; port: number; reason?: string | Error }) => {
                let errorMessage = ERRORS[error.message] || ERRORS.UNKNOWN;
                if (typeof error.port === 'number') errorMessage = errorMessage.replace('{{port}}', String(error.port));

                setError(errorMessage);
                setLoading(false);
            });
        } else {
            hideSpotlight();
        }
    };

    const selectResult = (result: Result) => {
        if (spotlightType === 'question') {
            submitTextInputResult(result.item.title);
            return;
        }
        setError('');
        if (result.item.type === 'command') {
            const cmd = (result.item as Command);
            if (cmd.parentCommand) return executeCommand(cmd.parentCommand, cmd.title);
            if (cmd.options?.options?.length) {
                inputRef.current?.focus();
                updateHistory(result.item);
                setSubMenuItem(cmd);
                return;
            }
            inputRef.current?.focus();
            updateHistory(result.item);
            executeCommand(cmd);
        } else {
            inputRef.current?.focus();
            updateHistory(result.item);
            executeItem(result.item);
        }
    };

    const removeHistory = () => {
        setError('');
        clearHistory();
        setReloadVersion(Date.now());
    };

    const moveSmoothToIndex = useCallback((index: number) => {
        if (!resultsRef?.current) return;
        resultsRef?.current?.querySelector(`#command-${index}`)?.scrollIntoView({
            behavior: 'smooth',
            block: index <= 0 ? 'end' : index >= resultCount - 1 ? 'start' : 'nearest',
        });
    }, [resultsRef, resultCount]);

    const submitTextInputResult = (answer?: string) => {
        // Only submit text when there is any text
        if (!answer?.trim?.()?.length) return;
        // Revert the input back to the search input
        hideSpotlight();
        // Submit the result
        const ev = new CustomEvent(TEXT_INPUT_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: answer.trim(),
            },
        });
        document.dispatchEvent(ev);
    };

    useHotkeys('cmd+shift+k, ctrl+shift+k', (e) => {
        preventDefault(e);
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible]);

    useHotkeys('esc', (e) => {
        preventDefault(e);
        hideSpotlight();
    }, HOTKEY_OPTIONS);

    useHotkeys('up', (e) => {
        preventDefault(e);
        setSelectedIndex((last) => {
            let newIndex = Math.max(-1, last - 1);
            if (newIndex < 0) newIndex = resultCount - 1;
            moveSmoothToIndex(newIndex);
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);

    useHotkeys('down', (e: KeyboardEvent) => {
        preventDefault(e);
        setSelectedIndex((last) => {
            let newIndex = Math.min(resultCount, last + 1);
            if (newIndex > resultCount - 1) newIndex = 0;
            moveSmoothToIndex(newIndex);
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);

    useHotkeys('enter', (e) => {
        preventDefault(e);
        if (spotlightType === 'input') {
            submitTextInputResult(search);
            return;
        }
        if (selectedIndex < 0) return;
        const cat = indexedResults.find((cat) => cat.results.find((res) => res.index === selectedIndex));
        if (!cat) return;
        const result = cat.results.find((res) => res.index === selectedIndex);
        if (!result) return;
        selectResult(result);
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex, search, spotlightType]);

    useHotkeys('backspace', (e) => {
        if (search.length > 0) return;
        preventDefault(e);
        setSelectedIndex(0);
        setSubMenuItem(null);
        setSearch('');
    }, {
        ...HOTKEY_OPTIONS,
        enabled: visible && !!subMenuItem,
    }, [search, indexedResults, selectedIndex]);

    const resultsHaveIcons = indexedResults.some((cat) => cat.results.some((r) => !!r.item.options?.icon));

    const fallbackTitle = (answers ?? subMenuItem) ? 'Choose an option...' : 'Search or jump to...';

    return ReactDOM.createPortal(!visible ? null : (
        <Container id='fooxly-spotlight'>
            <SpotlightContext.Provider
                value={{
                    type: spotlightType,
                }}
            >
                {/* eslint-disable-next-line react/jsx-handler-names */}
                <Background onClick={hideSpotlight} />
                <Content>
                    <SearchInput
                        type={spotlightType}
                        hasResults={!!indexedResults?.length || !!error}
                        placeholder={spotlightType === 'input' ? placeholder ?? 'Enter text here...' : fallbackTitle}
                        value={search}
                        loading={loading}
                        fref={inputRef}
                        // eslint-disable-next-line react/jsx-handler-names
                        onChange={setSearch}
                    />
                    {!!error && (
                        <Error message={error} onDismiss={() => setError('')} />
                    )}
                    {
                        (spotlightType === 'search' || spotlightType === 'question') &&
                        indexedResults.length > 0 &&
                        indexedResults[0].results.length > 0 && (
                            <Results ref={resultsRef}>
                                {indexedResults.map((category) => (
                                    <Section
                                        key={category.title}
                                        title={category.title}
                                        results={category.results}
                                        showIcons={resultsHaveIcons}
                                        selectedIndex={selectedIndex}
                                        // eslint-disable-next-line react/jsx-handler-names
                                        onResultSoftSelect={setSelectedIndex}
                                        // eslint-disable-next-line react/jsx-handler-names
                                        onResultSelect={selectResult}
                                        // eslint-disable-next-line react/jsx-handler-names
                                        onRemove={category.type === 'history' ? removeHistory : undefined}
                                    />
                                ))}
                            </Results>
                        )
                    }
                </Content>
            </SpotlightContext.Provider>
        </Container>
    ), wrapper!);
}

const Container = styled.div`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99997;
    transform: translate3d(0, 0, 99999px);
`;

const Background = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99998;
    background-color: rgba(0, 0, 0, 0.7);
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
`;

const Content = styled.div`
    width: 60%;
    max-width: 650px;
    background-color: ${(p) => p.theme.color.gray10};
    border-radius: 10px;
    border: 2px solid ${(p) => p.theme.light ? p.theme.color.gray4 : p.theme.color.gray8};
    overflow: hidden;
    animation: ${(p) => p.theme.animation.fadeInWithPulse} 0.25s ease-in-out;
    z-index: 99999;

    @media(max-width: 900px) {
        width: 70%;
    }

    @media(max-width: 700px) {
        width: 85%;
    }
`;

const Results = styled.div`
    ${(p) => p.theme.flex.col()};
    height: auto;
    overflow-y: auto;
    max-height: 400px;
    padding: 8px;

    @media(max-height: 600px) {
        max-height: 100%;
    }
`;
