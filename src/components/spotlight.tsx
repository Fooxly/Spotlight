import React, { ChangeEvent, createRef, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys, Options } from 'react-hotkeys-hook';
import { SearchIcon, TimesIcon } from '@/icons/line';
import { Result } from './result';
import { Command } from '@/types';
import { BASE_COMMANDS } from '../utils/constants/base-commands';
import { getCommandIcon } from '@/utils/get-command-icon';
import { COMMANDS } from '@/utils';

// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector<HTMLDivElement>('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}

export function SpotlightComponent (): JSX.Element | null {
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [search, setSearch] = useState('');
    const inputRef = createRef<HTMLInputElement>();

    const HOTKEY_OPTIONS: Options = {
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    };

    // TODO: update the search algorithm to be more efficient and sort based on most likely match
    const indexedResults: Command[] = useMemo(() => search.trim().length === 0 ? COMMANDS.slice(0, 8) : COMMANDS.filter((cmd) => {
        const fullSearch = search.trim().toLowerCase();
        const words = fullSearch.split(' ').filter((word) => word.length > 1);
        // check the title for keywords
        const title = cmd.title.toLowerCase();
        if (title.includes(fullSearch)) return true;
        // check the keywords
        const keywords = cmd.options?.keywords?.map((kw) => kw.toLowerCase());
        if (keywords?.filter((kw) => words.filter((word) => kw.includes(word)).length > 0).length) return true;
    }), [search]);

    const hasIcons = useMemo(() => indexedResults.filter((cmd) => !!getCommandIcon(cmd.options?.icon)).length > 0, [indexedResults]);

    useEffect(() => {
        if (!inputRef.current) return;
        else inputRef.current.focus();
    }, [selectedIndex, inputRef]);

    const toggleVisible = () => {
        setSearch('');
        setVisible((last) => !last);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setSelectedIndex(-1);
    }

    useHotkeys('cmd+shift+k, ctrl+shift_k', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    });
    useHotkeys('esc', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setVisible(false);
    }, HOTKEY_OPTIONS);
    useHotkeys('up', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((last) => {
            const newIndex = Math.max(-1, last - 1);
            if (newIndex < 0) return -1;
            document.getElementById(`command-${indexedResults[newIndex].id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex <= 0 ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS);
    useHotkeys('down', (e) => {
        e.preventDefault();
        e.stopPropagation();

        setSelectedIndex((last) => {
            const newIndex = Math.min(indexedResults.length - 1, last + 1);
            document.getElementById(`command-${indexedResults[newIndex].id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex === (indexedResults.length - 1) ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS);
    useHotkeys('enter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectedIndex < 0) return;
        indexedResults[selectedIndex].action();
        toggleVisible();
    }, HOTKEY_OPTIONS);

    const handleClearSearch = () => setSearch('');

    return ReactDOM.createPortal(!visible ? null : (
        <Container>
            <Background onClick={toggleVisible} />
            <Content>
                <SearchBar $hasResults={!!indexedResults?.length}>
                    <SearchInput onFocus={() => setSelectedIndex(-1)} autoFocus ref={inputRef} placeholder='Search or jump to...' value={search} onChange={handleInputChange} />
                    <SearchIcon size={24} color='gray4' />
                    {search?.length > 0 && (
                        <CloseButton onClick={handleClearSearch}>
                            <TimesIcon size={8} color='gray10' />
                        </CloseButton>
                    )}
                </SearchBar>
                {!!indexedResults.length && (
                    <Results>
                        {indexedResults.map((command, index) => (
                            <Result hasIcons={hasIcons} command={command} index={index} selected={selectedIndex === index} key={command.id} onSoftSelect={setSelectedIndex} onComplete={toggleVisible} />
                        ))}
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
    animation: ${(p) => p.theme.animation.fadeInWithPulse} 0.4s ease-in-out;
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

    > svg {
        position: absolute;
        left: 15px;
        margin-bottom: 2px;
    }
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

const Results = styled.div`
    ${(p) => p.theme.flex.col()};
    height: auto;
    overflow-y: auto;
    max-height: 400px;
    padding: 8px;

    @media(max-height: 600px) {
        max-height: 100%;
    }
`

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