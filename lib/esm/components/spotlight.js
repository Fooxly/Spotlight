import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRef, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys } from 'react-hotkeys-hook';
import { filterResults, executeItem, updateHistory, clearHistory } from '../utils';
import { Section } from './section';
import { SearchInput } from './search-input';
// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}
const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
export function SpotlightComponent() {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [reloadVersion, setReloadVersion] = useState(-1);
    const [subMenuItem, setSubMenuItem] = useState();
    const [search, setSearch] = useState('');
    const inputRef = createRef();
    const HOTKEY_OPTIONS = useMemo(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);
    // Get the results which should be indexed and rendered
    const indexedResults = useMemo(() => {
        if (subMenuItem?.options?.options) {
            return filterResults(search, {
                title: subMenuItem.title,
                items: subMenuItem?.options?.options.map((item) => ({
                    title: item,
                    type: 'command',
                    parentCommand: subMenuItem,
                }))
            });
        }
        return filterResults(search);
    }, [visible, search, reloadVersion, subMenuItem]);
    const resultCount = useMemo(() => indexedResults.reduce((count, cat) => cat.results.length + count, 0), [indexedResults]);
    // When the spotlight is closed, reset all the values
    useEffect(() => {
        setSearch('');
        setSelectedIndex(0);
        setSubMenuItem(undefined);
    }, [visible]);
    useEffect(() => {
        if (!search.length)
            return setSelectedIndex(0);
        setSelectedIndex(0);
    }, [search]);
    const toggleVisible = () => setVisible((last) => !last);
    const hideSpotlight = () => setVisible(false);
    const executeCommand = (command, result) => {
        const res = executeItem(command, result);
        if (res instanceof Promise) {
            setLoading(true);
            res.then(() => {
                setLoading(false);
                hideSpotlight();
            }).catch((err) => {
                setLoading(false);
                // TODO: check for error and show below spotlight
                console.warn(err);
            });
        }
        else {
            hideSpotlight();
        }
    };
    const selectResult = (result) => {
        if (result.item.type === 'command') {
            const cmd = result.item;
            if (cmd.parentCommand)
                return executeCommand(cmd.parentCommand, cmd.title);
            if (cmd.options?.options?.length) {
                updateHistory(result.item);
                setSubMenuItem(cmd);
                return;
            }
            updateHistory(result.item);
            executeCommand(cmd);
        }
        else {
            updateHistory(result.item);
            executeItem(result.item);
        }
    };
    const removeHistory = () => {
        clearHistory();
        setReloadVersion(Date.now());
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
            const newIndex = Math.max(-1, last - 1);
            if (newIndex < 0)
                return -1;
            document.getElementById(`command-${newIndex}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex <= 0 ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    useHotkeys('down', (e) => {
        preventDefault(e);
        setSelectedIndex((last) => {
            const newIndex = Math.min(resultCount - 1, last + 1);
            if (newIndex < 0)
                return -1;
            document.getElementById(`command-${newIndex}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex === (resultCount - 1) ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    useHotkeys('enter', (e) => {
        preventDefault(e);
        if (selectedIndex < 0)
            return;
        const cat = indexedResults.find((cat) => cat.results.find((res) => res.index === selectedIndex));
        if (!cat)
            return;
        const result = cat.results.find((res) => res.index === selectedIndex);
        if (!result)
            return;
        selectResult(result);
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    useHotkeys('backspace', (e) => {
        if (search.length !== 0)
            return;
        preventDefault(e);
        setSelectedIndex(-1);
        setSubMenuItem(undefined);
        setSearch('');
    }, {
        ...HOTKEY_OPTIONS,
        enabled: visible && !!subMenuItem,
    }, [search, indexedResults, selectedIndex]);
    const resultsHaveIcons = !!indexedResults.filter((cat) => cat.results.filter((r) => !!r.item.options?.icon).length > 0).length;
    return ReactDOM.createPortal(!visible ? null : (_jsxs(Container, { children: [_jsx(Background, { onClick: hideSpotlight }), _jsxs(Content, { children: [_jsx(SearchInput, { hasResults: !!indexedResults?.length, placeholder: subMenuItem ? 'Choose an option...' : 'Search or jump to...', value: search, loading: loading, fref: inputRef, onChange: setSearch }), !!indexedResults.length && (_jsx(Results, { children: indexedResults.map((category) => (_jsx(Section, { title: category.title, results: category.results, showIcons: resultsHaveIcons, selectedIndex: selectedIndex, onResultSoftSelect: setSelectedIndex, onResultSelect: selectResult, onRemove: category.type === 'history' ? removeHistory : undefined }, category.title))) }))] })] })), wrapper);
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
    animation: ${(p) => p.theme.animation.fadeInWithPulse} 0.25s ease-in-out;
    z-index: 99999;

    @media(max-width: 900px) {
        width: 70%;
    }

    @media(max-width: 700px) {
        width: 85%;
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
