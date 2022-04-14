import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createRef, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys } from 'react-hotkeys-hook';
import { SearchIcon, TimesIcon } from '../icons/line';
import { Result } from './result';
import { COMMANDS, PAGES, getCommandIcon, filterResults } from '../utils';
import { executeItem } from '../utils/execute-item';
// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}
export function SpotlightComponent() {
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [search, setSearch] = useState('');
    const inputRef = createRef();
    const HOTKEY_OPTIONS = useMemo(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);
    const indexedResults = useMemo(() => {
        const all = [...PAGES, ...COMMANDS];
        return filterResults(search, all);
    }, [search, COMMANDS, PAGES]);
    const hasIcons = useMemo(() => indexedResults.filter((item) => !!getCommandIcon(item.options?.icon)).length > 0, [indexedResults]);
    const pages = useMemo(() => indexedResults.filter((item) => item.type === 'jump-to'), [indexedResults]);
    const commands = useMemo(() => indexedResults.filter((item) => item.type === 'command'), [indexedResults]);
    useEffect(() => {
        if (!inputRef.current)
            return;
        else
            inputRef.current.focus();
    }, [selectedIndex, inputRef]);
    const toggleVisible = () => {
        setSearch('');
        setVisible((last) => !last);
    };
    const hideSpotlight = () => setVisible(false);
    const handleInputChange = (e) => {
        if (e.target.value.length !== search.length) {
            setSelectedIndex(-1);
            setSearch(e.target.value);
        }
    };
    // All the hotkeys
    useHotkeys('cmd+shift+k, ctrl+shift_k', (e) => {
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
            if (newIndex < 0)
                return -1;
            document.getElementById(`command-${indexedResults[newIndex].id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex <= 0 ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    useHotkeys('down', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((last) => {
            const newIndex = Math.min(indexedResults.length - 1, last + 1);
            if (newIndex < 0)
                return -1;
            document.getElementById(`command-${indexedResults[newIndex].id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex === (indexedResults.length - 1) ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    useHotkeys('enter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectedIndex < 0)
            return;
        executeItem(indexedResults[selectedIndex]);
        hideSpotlight();
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    const handleClearSearch = () => setSearch('');
    // TODO: add section with "Top result" which shows the most likely result
    return ReactDOM.createPortal(!visible ? null : (_jsxs(Container, { children: [_jsx(Background, { onClick: hideSpotlight }), _jsxs(Content, { children: [_jsxs(SearchBar, { "$hasResults": !!indexedResults?.length, children: [_jsx(SearchInput, { autoFocus: true, ref: inputRef, placeholder: 'Search or jump to...', value: search, onChange: handleInputChange }), _jsx(SearchIcon, { size: 24, color: 'gray4' }), search?.length > 0 && (_jsx(CloseButton, { onClick: handleClearSearch, children: _jsx(TimesIcon, { size: 8, color: 'gray10' }) }))] }), !!indexedResults.length && (_jsxs(Results, { children: [!!pages.length && (_jsxs(_Fragment, { children: [_jsx(ResultSection, { children: _jsx(ResultSectionTitle, { children: "Pages" }) }), pages.map((item) => {
                                        const index = indexedResults.findIndex(i => i.id === item.id);
                                        return (_jsx(Result, { index: index, item: item, hasIcons: hasIcons, selected: selectedIndex === index, onSoftSelect: setSelectedIndex, onComplete: hideSpotlight }, item.id));
                                    })] })), !!commands.length && (_jsxs(_Fragment, { children: [_jsx(ResultSection, { children: _jsx(ResultSectionTitle, { children: "Commands" }) }), commands.map((item) => {
                                        const index = indexedResults.findIndex(i => i.id === item.id);
                                        return (_jsx(Result, { index: index, item: item, hasIcons: hasIcons, selected: selectedIndex === index, onSoftSelect: setSelectedIndex, onComplete: hideSpotlight }, item.id));
                                    })] }))] }))] })] })), wrapper);
}
const Container = styled.div `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99997;
    transform: translate3d(0, 0, 99999px);
`;
const Background = styled.div `
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99998;
    background-color: rgba(0, 0, 0, 0.7);
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
`;
const Content = styled.div `
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
const SearchBar = styled.div `
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
const SearchInput = styled.input `
    ${(p) => p.theme.text.System.regular(18, 'gray1')}
    flex: 1;
    height: 55px;
    padding: 0 50px;

    ::placeholder {
        color: ${(p) => p.theme.color.gray6} !important;
    }
`;
const Results = styled.div `
    ${(p) => p.theme.flex.col()};
    height: auto;
    overflow-y: auto;
    max-height: 400px;
    padding: 8px;

    @media(max-height: 600px) {
        max-height: 100%;
    }
`;
const CloseButton = styled.button `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border-radius: 100px;
    background-color: ${(p) => p.theme.color.gray2};
    position: absolute;
    right: 15px;
    width: 22px;
    height: 22px;
    cursor: pointer;
`;
const ResultSection = styled.div `
    padding: 7px 5px;
`;
const ResultSectionTitle = styled.p `
    ${(p) => p.theme.text.System.semibold(14, 'gray4')}
`;
