import React, { ChangeEvent, createRef, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys, Options } from 'react-hotkeys-hook';
import { SearchIcon, TimesIcon } from '@/icons/line';
import { Result } from './result';
import { Command, Item } from '@/types';

import { COMMANDS, PAGES, getCommandIcon, filterResults, executeItem, getHistory, updateHistory, clearHistory } from '@/utils';
import { Loading } from './loading';

// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector<HTMLDivElement>('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}

interface Props {
    showRecentlyUsed: number;
}

export function SpotlightComponent ({ showRecentlyUsed }: Props): JSX.Element | null {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [reloadVersion, setReloadVersion] = useState(-1);
    const [subMenuItem, setSubMenuItem] = useState<Command>();
    const [search, setSearch] = useState('');
    const inputRef = createRef<HTMLInputElement>();

    const HOTKEY_OPTIONS: Options = useMemo(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);

    // Receive a list of commands which were used before
    const history = useMemo(() => getHistory().slice(0, showRecentlyUsed ?? 0), [visible, subMenuItem, reloadVersion]);
    // Get the results which should be indexed and rendered
    const indexedResults: Item[] = useMemo(() => {
        if (subMenuItem) {
            return filterResults(search,
                        subMenuItem.options?.options?.map((item) => ({
                            title: item,
                            type: 'command',
                            parentCommand: subMenuItem,
                        })) as Command[],
                        !!subMenuItem
                    );
        }
        return filterResults(search, [...PAGES, ...COMMANDS], !!subMenuItem);
    }, [reloadVersion, visible, search, COMMANDS, PAGES, subMenuItem]);

    // When a sub menu is opened, reset the search and selected index
    useEffect(() => {
        setSearch('');
        setSelectedIndex(-1);
    }, [subMenuItem]);

    // When the spotlight is closed, reset all the values
    useEffect(() => {
        if (visible) return;
        setSearch('');
        setSelectedIndex(-1);
        setSubMenuItem(undefined);
    }, [visible]);

    const isSearching = useMemo(() => search.length > 0, [search]);
    const hasIcons = useMemo(() => indexedResults.filter((item) => !!getCommandIcon(item.options?.icon)).length > 0, [indexedResults]);
    const pages = useMemo(() => indexedResults.filter((item) => item.type === 'jump-to' && ((!isSearching && !history.includes(item))|| isSearching)), [indexedResults]);
    const commands = useMemo(() => indexedResults.filter((item) => item.type === 'command' && ((!isSearching && !history.includes(item))|| isSearching)), [indexedResults]);

    // When changing the index, the input should always receive focus to continue typing
    useEffect(() => {
        if (!inputRef.current) return;
        else inputRef.current.focus();
    }, [selectedIndex, inputRef]);

    const toggleVisible = () => setVisible((last) => !last);
    const hideSpotlight = () => setVisible(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Only update the text when the value is not the same anymore -> important for the hotkeys
        if (e.target.value.length !== search.length) {
            setSelectedIndex(-1);
            setSearch(e.target.value);
        }
    }
    // Clears the search
    const handleClearSearch = () => setSearch('');
    // Clears the history and rerenders the results
    const handleClearHistory = () => {
        clearHistory();
        setReloadVersion(new Date().getTime());
    }
    // Ability to execute a command with a possible given option
    const executeCommand = (command: Command, result?: string) => {
        const res = executeItem(command, result);
        if (res instanceof Promise) {
            setLoading(true);
            res.finally(() => {
                setLoading(false);
                hideSpotlight();
            });
        } else {
            hideSpotlight();
        }
    }
    const handleItemSelect = (item: Item) => {
        if (item.type === 'command') {
            const cmd = (item as Command);
            if (cmd.parentCommand) return executeCommand(cmd.parentCommand, cmd.title);
            if (cmd.options?.options?.length) {
                updateHistory(item, showRecentlyUsed);
                setSubMenuItem(cmd);
                return;
            }
            updateHistory(item, showRecentlyUsed);
            executeCommand(cmd);
        } else {
            updateHistory(item, showRecentlyUsed);
            executeItem(item);
        }
    }

    // All the hotkeys
    useHotkeys('cmd+shift+k, ctrl+shift+k', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible]);
    useHotkeys('esc', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideSpotlight();
    }, HOTKEY_OPTIONS);
    useHotkeys('up', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((last) => {
            const newIndex = Math.max(-1, last - 1);
            if (newIndex < 0) return -1;
            document.getElementById(`command-${newIndex}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex <= 0 ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    useHotkeys('down', (e: KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((last) => {
            const newIndex = Math.min(indexedResults.length - 1, last + 1);
            if (newIndex < 0) return -1;
            document.getElementById(`command-${newIndex}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex === (indexedResults.length - 1) ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    useHotkeys('enter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectedIndex < 0) return;
        handleItemSelect(indexedResults[selectedIndex]);
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    useHotkeys('backspace', (e) => {
        if (search.length !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex(-1);
        setSubMenuItem(undefined);
        setSearch('');
    }, {
        ...HOTKEY_OPTIONS,
        enabled: visible && !!subMenuItem,
    }, [search, indexedResults, selectedIndex]);

    return ReactDOM.createPortal(!visible ? null : (
        <Container>
            <Background onClick={hideSpotlight} />
            <Content>
                <SearchBar $hasResults={!!indexedResults?.length}>
                    <SearchInput autoFocus ref={inputRef} placeholder={subMenuItem ? subMenuItem.title : 'Search or jump to...'} value={search} onChange={handleInputChange} />
                    <SearchIconWrapper>
                        {loading ? (
                            <Loading size={22} color='blue' thickness={3} />
                        ) : (
                            <SearchIcon size={24} color='gray4' />
                        )}
                        </SearchIconWrapper>
                    {search?.length > 0 && (
                        <CloseButton onClick={handleClearSearch}>
                            <TimesIcon size={8} color='gray10' />
                        </CloseButton>
                    )}
                </SearchBar>
                {!!indexedResults.length && (
                    <Results>
                        {!!history.length && !isSearching && !subMenuItem && (
                            <>
                                <ResultSection>
                                    <ResultSectionTitle>Recently used</ResultSectionTitle>
                                    <CloseButton onClick={handleClearHistory}>
                                        <TimesIcon size={7} color='gray10' />
                                    </CloseButton>
                                </ResultSection>
                                {history.map((item) => {
                                    const index = indexedResults.findIndex(i => i.title === item.title);
                                    return (
                                        <Result
                                            key={item.title}
                                            index={index}
                                            item={item}
                                            hasIcons={hasIcons}
                                            selected={selectedIndex === index}
                                            onSoftSelect={setSelectedIndex}
                                            onSelect={handleItemSelect}
                                        />
                                    )
                                })}
                            </>
                        )}
                        {!!pages.length && (
                            <>
                                <ResultSection>
                                    <ResultSectionTitle>Pages</ResultSectionTitle>
                                </ResultSection>
                                {pages.map((item) => {
                                    const index = indexedResults.findIndex(i => i.title === item.title);
                                    return (
                                        <Result
                                            key={item.title}
                                            index={index}
                                            item={item}
                                            hasIcons={hasIcons}
                                            selected={selectedIndex === index}
                                            onSoftSelect={setSelectedIndex}
                                            onSelect={handleItemSelect}
                                        />
                                    )
                                })}
                            </>
                        )}
                        {!!commands.length && (
                            <>
                                {!subMenuItem && (
                                    <ResultSection>
                                        <ResultSectionTitle>Commands</ResultSectionTitle>
                                    </ResultSection>
                                )}
                                {commands.map((item) => {
                                    const index = indexedResults.findIndex(i => i.title === item.title);
                                    return (
                                        <Result
                                            key={item.title}
                                            index={index}
                                            item={item}
                                            hasIcons={hasIcons}
                                            selected={selectedIndex === index}
                                            onSoftSelect={setSelectedIndex}
                                            onSelect={handleItemSelect}
                                        />
                                    )
                                })}
                            </>
                        )}
                    </Results>
                )}
            </Content>
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

const SearchBar = styled.div<{ $hasResults: boolean }>`
    position: relative;
    ${(p) => p.theme.flex.row({ align: 'center' })}

    ${(p) => p.$hasResults && `
        border-bottom: 1px solid ${p.theme.color.gray8};
    `}
`;

const SearchInput = styled.input`
    ${(p) => p.theme.text.System.regular(18, 'gray1')}
    flex: 1;
    height: 55px;
    padding: 0 50px;

    ::placeholder {
        color: ${(p) => p.theme.color.gray6} !important;
    }
`;

const SearchIconWrapper = styled.div`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: absolute;
    left: 15px;
    margin-bottom: 2px;
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

const CloseButton = styled.button`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border-radius: 100px;
    background-color: ${(p) => p.theme.color.gray2};
    position: absolute;
    right: 15px;
    width: 22px;
    height: 22px;
    cursor: pointer;
`;

const ResultSection = styled.div`
    ${(p) => p.theme.flex.row({ justify: 'space-between', align: 'center' })}
    padding: 7px 5px;
    position: relative;

    > ${CloseButton} {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease-in-out;
        will-change: opacity, pointer-events;
        width: 18px;
        height: 18px;
    }

    :hover {
        > ${CloseButton} {
            pointer-events: auto;
            opacity: 1;
        }
    }
`;

const ResultSectionTitle = styled.p`
    ${(p) => p.theme.text.System.semibold(14, 'gray4')}
`;
