import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRef, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys } from 'react-hotkeys-hook';
import { SearchInput } from './search-input';
import { Section } from './section';
import { Error } from './error';
import { filterResults, executeItem, updateHistory, clearHistory, ERRORS } from '../utils';
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
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [reloadVersion, setReloadVersion] = useState(-1);
    const [subMenuItem, setSubMenuItem] = useState();
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
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
                })),
            });
        }
        return filterResults(search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, reloadVersion, search, subMenuItem]);
    const resultCount = useMemo(() => indexedResults.reduce((count, cat) => cat.results.length + count, 0), [indexedResults]);
    // When the spotlight is closed, reset all the values
    useEffect(() => {
        setSearch('');
        setError('');
        setSelectedIndex(0);
        setSubMenuItem(null);
    }, [visible]);
    useEffect(() => {
        setError('');
        setSelectedIndex(0);
    }, [search, subMenuItem]);
    const toggleVisible = () => setVisible((last) => !last);
    const hideSpotlight = () => setVisible(false);
    const executeCommand = (command, result) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res = executeItem(command, result);
        if (res instanceof Promise) {
            setLoading(true);
            res.then(() => {
                setLoading(false);
                hideSpotlight();
            }).catch((error) => {
                setLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                setError(ERRORS[error.message] || ERRORS.UNKNOWN);
            });
        }
        else {
            hideSpotlight();
        }
    };
    const selectResult = (result) => {
        setError('');
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
        setError('');
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
            document.querySelector(`#command-${newIndex}`)?.scrollIntoView({
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
            document.querySelector(`#command-${newIndex}`)?.scrollIntoView({
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
        if (search.length > 0)
            return;
        preventDefault(e);
        setSelectedIndex(0);
        setSubMenuItem(null);
        setSearch('');
    }, {
        ...HOTKEY_OPTIONS,
        enabled: visible && !!subMenuItem,
    }, [search, indexedResults, selectedIndex]);
    const resultsHaveIcons = indexedResults.some((cat) => cat.results.some((r) => !!r.item.options?.icon));
    return ReactDOM.createPortal(!visible ? null : (_jsxs(Container, { id: 'fooxly-spotlight', children: [_jsx(Background, { onClick: hideSpotlight }), _jsxs(Content, { children: [_jsx(SearchInput, { hasResults: !!indexedResults?.length, placeholder: subMenuItem ? 'Choose an option...' : 'Search or jump to...', value: search, loading: loading, fref: inputRef, 
                        // eslint-disable-next-line react/jsx-handler-names
                        onChange: setSearch }), !!error && (_jsx(Error, { message: error, onDismiss: () => setError('') })), indexedResults.length > 0 && indexedResults[0].results.length > 0 && (_jsx(Results, { children: indexedResults.map((category) => (_jsx(Section, { title: category.title, results: category.results, showIcons: resultsHaveIcons, selectedIndex: selectedIndex, 
                            // eslint-disable-next-line react/jsx-handler-names
                            onResultSoftSelect: setSelectedIndex, 
                            // eslint-disable-next-line react/jsx-handler-names
                            onResultSelect: selectResult, 
                            // eslint-disable-next-line react/jsx-handler-names
                            onRemove: category.type === 'history' ? removeHistory : undefined }, category.title))) }))] })] })), wrapper);
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
