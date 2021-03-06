import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys, Options } from 'react-hotkeys-hook';

import { SearchInput } from './search-input';
import { Section } from './section';
import { Error } from './error';

import type {
    Answer,
    Category,
    CategoryType,
    Command,
    CommandOption,
    CommandOptionWithAction,
    ItemOptions,
    Result,
    SpotlightType,
} from '@/types';
import {
    filterResults,
    executeItem,
    updateHistory,
    clearHistory,
    ERRORS,
    INPUT_TYPE_EVENT_KEY,
    TEXT_INPUT_RESULT_EVENT_KEY,
    SpotlightContext,
    PAGES,
    COMMANDS,
    UPDATE_SPOTLIGHT_EVENT_KEY,
} from '@/utils';
import { TIPS } from '@/utils/constants/tips';

// create the spotlight wrapper if this is not already created
let spotlightWrapper: HTMLDivElement | null = null;
if (typeof window !== 'undefined') {
    spotlightWrapper = document.querySelector<HTMLDivElement>('#spotlight');
    if (!spotlightWrapper) {
        spotlightWrapper = document.createElement('div');
        spotlightWrapper.id = 'spotlight';
        document.body.append(spotlightWrapper);
    }
}

const preventDefault = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
};

const decodeHTML = (html: string): string => {
    const e = document.createElement('div');
    e.innerHTML = html;
    return e.innerHTML;
};

interface Props {
    showTips?: boolean;
}

export function SpotlightComponent ({ showTips }: Props): JSX.Element | null {
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
    const [answers, setAnswers] = useState<string[] | Answer[] | CommandOption[] | null>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(INPUT_TYPE_EVENT_KEY, changeInputType as any, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(INPUT_TYPE_EVENT_KEY, changeInputType as any, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(UPDATE_SPOTLIGHT_EVENT_KEY, forceUpdateSpotlight as any, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(UPDATE_SPOTLIGHT_EVENT_KEY, forceUpdateSpotlight as any, false);
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeTip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], [TIPS, visible]);

    const changeInputType = (
        ev: CustomEvent<{
            type: SpotlightType;
            question?: string;
            answers?: string[] | Answer[] | CommandOption[] | null;
        }>,
    ) => {
        setVisible(true);
        setSpotlightType(ev.detail.type);
        setAnswers(ev.detail.answers!);
        setPlaceholder(ev.detail.type === 'search' ? null : (ev.detail.question ?? null));
    };

    const forceUpdateSpotlight = () => {
        setReloadVersion(Date.now());
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
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        title: typeof answer === 'string' ? answer : (answer as CommandOption).title ?? (answer as Answer).label,
                        returnKey:
                            typeof answer === 'string' ? answer : (answer as CommandOption).title ?? (answer as Answer).key,
                        options: {
                            icon:
                                typeof answer === 'string' ? null : (answer as CommandOption).icon,
                            keywords:
                                typeof answer === 'string'
                                    ? null
                                    : (answer as Answer).key ? [(answer as Answer).key]
                                        : (answer as CommandOption).keywords,
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
                                options: typeof item === 'string' ? null : item.options,
                            },
                            type: 'command',
                            parentCommand: subMenuItem.detachAsParent ? undefined : subMenuItem,
                            ...(
                                typeof item !== 'string' && (item as CommandOptionWithAction)?.action
                                    ? { action: (item as CommandOptionWithAction)?.action }
                                    : {}
                            ),
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
        moveSmoothToIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                errorMessage = errorMessage.replace('{{error.message}}', String(error.message));

                setError(errorMessage);
                setLoading(false);
            });
        } else {
            hideSpotlight();
        }
    };

    const selectResult = (result: Result) => {
        setSearch('');
        if (spotlightType === 'question') {
            const answer = result.item as Command;
            submitTextInputResult(answer.returnKey);
            return;
        }
        setError('');
        if (result.item.type === 'command') {
            const cmd = (result.item as Command);
            if (cmd.options?.options?.length) {
                inputRef.current?.focus();
                if (!cmd.parentCommand) {
                    updateHistory(result.item);
                }
                setSubMenuItem(cmd);
                return;
            }
            if (cmd.parentCommand) {
                // Get the most parent command and execute it
                let parent = cmd.parentCommand;
                while (!!parent.parentCommand && !parent.action) {
                    parent = parent.parentCommand;
                }
                // Execute the parent command
                return executeCommand(parent, cmd.title);
            }
            inputRef.current?.focus();
            executeCommand(cmd);
        } else {
            inputRef.current?.focus();
            executeItem(result.item);
            hideSpotlight();
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

    const onSectionAction = useCallback((type: CategoryType) => {
        if (type === 'pages') {
            setSubMenuItem(
                {
                    title: 'All Pages',
                    action: (page) => {
                        const foundPage = PAGES.find((p) => p.title === page);
                        if (foundPage) {
                            selectResult({
                                index: 0,
                                item: foundPage,
                            });
                        }
                    },
                    type: 'command',
                    options: {
                        options: PAGES.map((page) => ({
                            title: page.title,
                            icon: page.options?.icon,
                        })),
                    },
                },
            );
        } else if (type === 'commands') {
            setSubMenuItem(
                {
                    title: 'All Commands',
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    action: () => {},
                    detachAsParent: true,
                    type: 'command',
                    options: {
                        options: COMMANDS.map((command) => ({
                            title: command.title,
                            icon: command.options?.icon,
                            keywords: command.options?.keywords,
                            options: command.options?.options,
                            action: command.action,
                        })),
                    },
                },
            );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sectionActionText = useCallback(
        (type: CategoryType): string | undefined => {
            switch (type) {
                case 'pages': return 'All Pages';
                case 'commands': return 'All Commands';
                default: return undefined;
            }
        }, []);

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

    // If we are unable to find the window element, we can not render
    if (typeof window === 'undefined') return null;

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
                                {!search?.length && !subMenuItem && spotlightType === 'search' && showTips && (
                                    <Tip dangerouslySetInnerHTML={{ __html: decodeHTML(activeTip) ?? '' }} />
                                )}
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
                                        action={() => onSectionAction(category.type)}
                                        actionText={sectionActionText(category.type)}
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
    ), spotlightWrapper!);
}

const Container = styled.div`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99996;
    transform: translate3d(0, 0, 99996px);
`;

const Background = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99997;
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
    z-index: 99998;

    @media(max-width: 900px) {
        width: 70%;
    }

    @media(max-width: 700px) {
        width: 85%;
    }
`;

const Results = styled.div`
    ${(p) => p.theme.flex.col()}
    height: auto;
    overflow-y: auto;
    max-height: 400px;
    padding: 8px;

    @media(max-height: 600px) {
        max-height: 100%;
    }
`;

const Tip = styled.p`
    ${(p) => p.theme.text.System.regular(13, 'gray3')}
    margin: 0 5px;
    margin-bottom: 10px;
    padding: 0;

    > kbd {
        display: inline-block;
        min-width: 21px;
        ${(p) => p.theme.text.System.regular(12, 'gray1')}
        background-color: ${(p) => p.theme.color.gray9};
        padding: 2px 4px;
        text-align: center;
        border: 1px solid ${(p) => p.theme.color.gray7};
        border-radius: 6px;
        box-shadow: none;
    }

    > b {
        font-weight: bold;
    }

    &:before {
        content: 'Tip: ';
        ${(p) => p.theme.text.System.bold(13, 'gray1')}
    }
`;
