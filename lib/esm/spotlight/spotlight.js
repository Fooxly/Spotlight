import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys } from 'react-hotkeys-hook';
import { SearchInput } from './search-input';
import { Section } from './section';
import { Error } from './error';
import { filterResults, executeItem, updateHistory, clearHistory, ERRORS, INPUT_TYPE_EVENT_KEY, TEXT_INPUT_RESULT_EVENT_KEY, SpotlightContext, } from '../utils';
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
    const resultsRef = createRef();
    const [spotlightType, setSpotlightType] = useState('search');
    const [placeholder, setPlaceholder] = useState(null);
    const [answers, setAnswers] = useState(null);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(INPUT_TYPE_EVENT_KEY, changeInputType, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(INPUT_TYPE_EVENT_KEY, changeInputType, false);
    }, []);
    const changeInputType = (ev) => {
        var _a;
        setVisible(true);
        setSpotlightType(ev.detail.type);
        setAnswers(ev.detail.answers);
        setPlaceholder(ev.detail.type === 'search' ? null : ((_a = ev.detail.question) !== null && _a !== void 0 ? _a : null));
    };
    const HOTKEY_OPTIONS = useMemo(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);
    // Get the results which should be indexed and rendered
    const indexedResults = useMemo(() => {
        var _a, _b;
        if (answers) {
            return filterResults(search, {
                title: placeholder !== null && placeholder !== void 0 ? placeholder : 'Options',
                items: answers.map((answer) => ({
                    title: typeof answer === 'string' ? answer : answer.title,
                    options: {
                        icon: typeof answer === 'string' ? null : answer.icon,
                        keywords: typeof answer === 'string' ? null : answer.keywords,
                    },
                    type: 'command',
                })),
            });
        }
        if ((_a = subMenuItem === null || subMenuItem === void 0 ? void 0 : subMenuItem.options) === null || _a === void 0 ? void 0 : _a.options) {
            return filterResults(search, {
                title: subMenuItem.title,
                items: (_b = subMenuItem === null || subMenuItem === void 0 ? void 0 : subMenuItem.options) === null || _b === void 0 ? void 0 : _b.options.map((item) => ({
                    title: typeof item === 'string' ? item : item.title,
                    options: {
                        icon: typeof item === 'string' ? undefined : item.icon,
                        keywords: typeof item === 'string' ? undefined : item.keywords,
                        options: typeof item === 'string' ? null : item.options,
                    },
                    type: 'command',
                    parentCommand: subMenuItem,
                })),
            });
        }
        return filterResults(search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers, placeholder, visible, reloadVersion, search, subMenuItem]);
    const resultCount = useMemo(() => indexedResults.reduce((count, cat) => cat.results.length + count, 0), [indexedResults]);
    // When the spotlight is closed, reset all the values
    useEffect(() => {
        if (visible)
            return;
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
    const executeCommand = (command, result) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res = executeItem(command, result);
        if (res instanceof Promise) {
            setLoading(true);
            res.then(() => {
                setLoading(false);
                hideSpotlight();
            }).catch((error) => {
                let errorMessage = ERRORS[error.message] || ERRORS.UNKNOWN;
                if (typeof error.port === 'number')
                    errorMessage = errorMessage.replace('{{port}}', String(error.port));
                setError(errorMessage);
                setLoading(false);
            });
        }
        else {
            hideSpotlight();
        }
    };
    const selectResult = (result) => {
        var _a, _b, _c, _d, _e;
        if (spotlightType === 'question') {
            submitTextInputResult(result.item.title);
            return;
        }
        setError('');
        if (result.item.type === 'command') {
            const cmd = result.item;
            if ((_b = (_a = cmd.options) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.length) {
                (_c = inputRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                updateHistory(result.item);
                setSubMenuItem(cmd);
                return;
            }
            if (cmd.parentCommand) {
                // Get the most parent command and execute it
                let parent = cmd.parentCommand;
                while (parent.parentCommand) {
                    parent = parent.parentCommand;
                }
                // Execute the parent command
                return executeCommand(parent, cmd.title);
            }
            (_d = inputRef.current) === null || _d === void 0 ? void 0 : _d.focus();
            updateHistory(result.item);
            executeCommand(cmd);
        }
        else {
            (_e = inputRef.current) === null || _e === void 0 ? void 0 : _e.focus();
            updateHistory(result.item);
            executeItem(result.item);
        }
    };
    const removeHistory = () => {
        setError('');
        clearHistory();
        setReloadVersion(Date.now());
    };
    const moveSmoothToIndex = useCallback((index) => {
        var _a, _b;
        if (!(resultsRef === null || resultsRef === void 0 ? void 0 : resultsRef.current))
            return;
        (_b = (_a = resultsRef === null || resultsRef === void 0 ? void 0 : resultsRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(`#command-${index}`)) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
            behavior: 'smooth',
            block: index <= 0 ? 'end' : index >= resultCount - 1 ? 'start' : 'nearest',
        });
    }, [resultsRef, resultCount]);
    const submitTextInputResult = (answer) => {
        var _a, _b;
        // Only submit text when there is any text
        if (!((_b = (_a = answer === null || answer === void 0 ? void 0 : answer.trim) === null || _a === void 0 ? void 0 : _a.call(answer)) === null || _b === void 0 ? void 0 : _b.length))
            return;
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
            if (newIndex < 0)
                newIndex = resultCount - 1;
            moveSmoothToIndex(newIndex);
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    useHotkeys('down', (e) => {
        preventDefault(e);
        setSelectedIndex((last) => {
            let newIndex = Math.min(resultCount, last + 1);
            if (newIndex > resultCount - 1)
                newIndex = 0;
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
        if (selectedIndex < 0)
            return;
        const cat = indexedResults.find((cat) => cat.results.find((res) => res.index === selectedIndex));
        if (!cat)
            return;
        const result = cat.results.find((res) => res.index === selectedIndex);
        if (!result)
            return;
        selectResult(result);
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex, search, spotlightType]);
    useHotkeys('backspace', (e) => {
        if (search.length > 0)
            return;
        preventDefault(e);
        setSelectedIndex(0);
        setSubMenuItem(null);
        setSearch('');
    }, Object.assign(Object.assign({}, HOTKEY_OPTIONS), { enabled: visible && !!subMenuItem }), [search, indexedResults, selectedIndex]);
    const resultsHaveIcons = indexedResults.some((cat) => cat.results.some((r) => { var _a; return !!((_a = r.item.options) === null || _a === void 0 ? void 0 : _a.icon); }));
    const fallbackTitle = (answers !== null && answers !== void 0 ? answers : subMenuItem) ? 'Choose an option...' : 'Search or jump to...';
    return ReactDOM.createPortal(!visible ? null : (_jsx(Container, Object.assign({ id: 'fooxly-spotlight' }, { children: _jsxs(SpotlightContext.Provider, Object.assign({ value: {
                type: spotlightType,
            } }, { children: [_jsx(Background, { onClick: hideSpotlight }), _jsxs(Content, { children: [_jsx(SearchInput, { type: spotlightType, hasResults: !!(indexedResults === null || indexedResults === void 0 ? void 0 : indexedResults.length) || !!error, placeholder: spotlightType === 'input' ? placeholder !== null && placeholder !== void 0 ? placeholder : 'Enter text here...' : fallbackTitle, value: search, loading: loading, fref: inputRef, 
                            // eslint-disable-next-line react/jsx-handler-names
                            onChange: setSearch }), !!error && (_jsx(Error, { message: error, onDismiss: () => setError('') })), (spotlightType === 'search' || spotlightType === 'question') &&
                            indexedResults.length > 0 &&
                            indexedResults[0].results.length > 0 && (_jsx(Results, Object.assign({ ref: resultsRef }, { children: indexedResults.map((category) => (_jsx(Section, { title: category.title, results: category.results, showIcons: resultsHaveIcons, selectedIndex: selectedIndex, 
                                // eslint-disable-next-line react/jsx-handler-names
                                onResultSoftSelect: setSelectedIndex, 
                                // eslint-disable-next-line react/jsx-handler-names
                                onResultSelect: selectResult, 
                                // eslint-disable-next-line react/jsx-handler-names
                                onRemove: category.type === 'history' ? removeHistory : undefined }, category.title))) })))] })] })) }))), wrapper);
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
