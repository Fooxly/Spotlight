"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotlightComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_hotkeys_hook_1 = require("react-hotkeys-hook");
const search_input_1 = require("./search-input");
const section_1 = require("./section");
const error_1 = require("./error");
const utils_1 = require("@/utils");
const tips_1 = require("@/utils/constants/tips");
// create the spotlight wrapper if this is not already created
let spotlightWrapper = document.querySelector('#spotlight');
if (!spotlightWrapper) {
    spotlightWrapper = document.createElement('div');
    spotlightWrapper.id = 'spotlight';
    document.body.append(spotlightWrapper);
}
const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
const decodeHTML = (html) => {
    const e = document.createElement('div');
    e.innerHTML = html;
    return e.innerHTML;
};
function SpotlightComponent({ showTips }) {
    var _a;
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const [reloadVersion, setReloadVersion] = (0, react_1.useState)(-1);
    const [subMenuItem, setSubMenuItem] = (0, react_1.useState)();
    const [search, setSearch] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const inputRef = (0, react_1.createRef)();
    const resultsRef = (0, react_1.createRef)();
    const [spotlightType, setSpotlightType] = (0, react_1.useState)('search');
    const [placeholder, setPlaceholder] = (0, react_1.useState)(null);
    const [answers, setAnswers] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(utils_1.INPUT_TYPE_EVENT_KEY, changeInputType, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.INPUT_TYPE_EVENT_KEY, changeInputType, false);
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeTip = (0, react_1.useMemo)(() => tips_1.TIPS[Math.floor(Math.random() * tips_1.TIPS.length)], [tips_1.TIPS, visible]);
    const changeInputType = (ev) => {
        var _a;
        setVisible(true);
        setSpotlightType(ev.detail.type);
        setAnswers(ev.detail.answers);
        setPlaceholder(ev.detail.type === 'search' ? null : ((_a = ev.detail.question) !== null && _a !== void 0 ? _a : null));
    };
    const HOTKEY_OPTIONS = (0, react_1.useMemo)(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);
    // Get the results which should be indexed and rendered
    const indexedResults = (0, react_1.useMemo)(() => {
        var _a, _b;
        if (answers) {
            return (0, utils_1.filterResults)(search, {
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
            return (0, utils_1.filterResults)(search, {
                title: subMenuItem.title,
                items: (_b = subMenuItem === null || subMenuItem === void 0 ? void 0 : subMenuItem.options) === null || _b === void 0 ? void 0 : _b.options.map((item) => (Object.assign({ title: typeof item === 'string' ? item : item.title, options: {
                        icon: typeof item === 'string' ? undefined : item.icon,
                        keywords: typeof item === 'string' ? undefined : item.keywords,
                        options: typeof item === 'string' ? null : item.options,
                    }, type: 'command', parentCommand: subMenuItem.detachAsParent ? undefined : subMenuItem }, (typeof item !== 'string' && (item === null || item === void 0 ? void 0 : item.action)
                    ? { action: item === null || item === void 0 ? void 0 : item.action }
                    : {})))),
            });
        }
        return (0, utils_1.filterResults)(search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers, placeholder, visible, reloadVersion, search, subMenuItem]);
    const resultCount = (0, react_1.useMemo)(() => indexedResults.reduce((count, cat) => cat.results.length + count, 0), [indexedResults]);
    // When the spotlight is closed, reset all the values
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        setError('');
        setSelectedIndex(0);
        moveSmoothToIndex(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, subMenuItem]);
    const toggleVisible = () => setVisible((last) => !last);
    const hideSpotlight = () => setVisible(false);
    const executeCommand = (command, result) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res = (0, utils_1.executeItem)(command, result);
        if (res instanceof Promise) {
            setLoading(true);
            res.then(() => {
                setLoading(false);
                hideSpotlight();
            }).catch((error) => {
                let errorMessage = utils_1.ERRORS[error.message] || utils_1.ERRORS.UNKNOWN;
                if (typeof error.port === 'number')
                    errorMessage = errorMessage.replace('{{port}}', String(error.port));
                errorMessage = errorMessage.replace('{{error.message}}', String(error.message));
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
        setSearch('');
        if (spotlightType === 'question') {
            submitTextInputResult(result.item.title);
            return;
        }
        setError('');
        if (result.item.type === 'command') {
            const cmd = result.item;
            if ((_b = (_a = cmd.options) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.length) {
                (_c = inputRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                if (!cmd.parentCommand) {
                    (0, utils_1.updateHistory)(result.item);
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
            (_d = inputRef.current) === null || _d === void 0 ? void 0 : _d.focus();
            executeCommand(cmd);
        }
        else {
            (_e = inputRef.current) === null || _e === void 0 ? void 0 : _e.focus();
            (0, utils_1.executeItem)(result.item);
        }
    };
    const removeHistory = () => {
        setError('');
        (0, utils_1.clearHistory)();
        setReloadVersion(Date.now());
    };
    const moveSmoothToIndex = (0, react_1.useCallback)((index) => {
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
        const ev = new CustomEvent(utils_1.TEXT_INPUT_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: answer.trim(),
            },
        });
        document.dispatchEvent(ev);
    };
    const onSectionAction = (0, react_1.useCallback)((type) => {
        if (type === 'pages') {
            setSubMenuItem({
                title: 'All Pages',
                action: (page) => {
                    const foundPage = utils_1.PAGES.find((p) => p.title === page);
                    if (foundPage) {
                        selectResult({
                            index: 0,
                            item: foundPage,
                        });
                    }
                },
                type: 'command',
                options: {
                    options: utils_1.PAGES.map((page) => {
                        var _a;
                        return ({
                            title: page.title,
                            icon: (_a = page.options) === null || _a === void 0 ? void 0 : _a.icon,
                        });
                    }),
                },
            });
        }
        else if (type === 'commands') {
            setSubMenuItem({
                title: 'All Commands',
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                action: () => { },
                detachAsParent: true,
                type: 'command',
                options: {
                    options: utils_1.COMMANDS.map((command) => {
                        var _a, _b, _c;
                        return ({
                            title: command.title,
                            icon: (_a = command.options) === null || _a === void 0 ? void 0 : _a.icon,
                            keywords: (_b = command.options) === null || _b === void 0 ? void 0 : _b.keywords,
                            options: (_c = command.options) === null || _c === void 0 ? void 0 : _c.options,
                            action: command.action,
                        });
                    }),
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const sectionActionText = (0, react_1.useCallback)((type) => {
        switch (type) {
            case 'pages': return 'All Pages';
            case 'commands': return 'All Commands';
            default: return undefined;
        }
    }, []);
    (0, react_hotkeys_hook_1.useHotkeys)('cmd+shift+k, ctrl+shift+k', (e) => {
        preventDefault(e);
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible]);
    (0, react_hotkeys_hook_1.useHotkeys)('esc', (e) => {
        preventDefault(e);
        hideSpotlight();
    }, HOTKEY_OPTIONS);
    (0, react_hotkeys_hook_1.useHotkeys)('up', (e) => {
        preventDefault(e);
        setSelectedIndex((last) => {
            let newIndex = Math.max(-1, last - 1);
            if (newIndex < 0)
                newIndex = resultCount - 1;
            moveSmoothToIndex(newIndex);
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    (0, react_hotkeys_hook_1.useHotkeys)('down', (e) => {
        preventDefault(e);
        setSelectedIndex((last) => {
            let newIndex = Math.min(resultCount, last + 1);
            if (newIndex > resultCount - 1)
                newIndex = 0;
            moveSmoothToIndex(newIndex);
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    (0, react_hotkeys_hook_1.useHotkeys)('enter', (e) => {
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
    (0, react_hotkeys_hook_1.useHotkeys)('backspace', (e) => {
        if (search.length > 0)
            return;
        preventDefault(e);
        setSelectedIndex(0);
        setSubMenuItem(null);
        setSearch('');
    }, Object.assign(Object.assign({}, HOTKEY_OPTIONS), { enabled: visible && !!subMenuItem }), [search, indexedResults, selectedIndex]);
    const resultsHaveIcons = indexedResults.some((cat) => cat.results.some((r) => { var _a; return !!((_a = r.item.options) === null || _a === void 0 ? void 0 : _a.icon); }));
    const fallbackTitle = (answers !== null && answers !== void 0 ? answers : subMenuItem) ? 'Choose an option...' : 'Search or jump to...';
    return react_dom_1.default.createPortal(!visible ? null : ((0, jsx_runtime_1.jsx)(Container, Object.assign({ id: 'fooxly-spotlight' }, { children: (0, jsx_runtime_1.jsxs)(utils_1.SpotlightContext.Provider, Object.assign({ value: {
                type: spotlightType,
            } }, { children: [(0, jsx_runtime_1.jsx)(Background, { onClick: hideSpotlight }), (0, jsx_runtime_1.jsxs)(Content, { children: [(0, jsx_runtime_1.jsx)(search_input_1.SearchInput, { type: spotlightType, hasResults: !!(indexedResults === null || indexedResults === void 0 ? void 0 : indexedResults.length) || !!error, placeholder: spotlightType === 'input' ? placeholder !== null && placeholder !== void 0 ? placeholder : 'Enter text here...' : fallbackTitle, value: search, loading: loading, fref: inputRef, 
                            // eslint-disable-next-line react/jsx-handler-names
                            onChange: setSearch }), !!error && ((0, jsx_runtime_1.jsx)(error_1.Error, { message: error, onDismiss: () => setError('') })), (spotlightType === 'search' || spotlightType === 'question') &&
                            indexedResults.length > 0 &&
                            indexedResults[0].results.length > 0 && ((0, jsx_runtime_1.jsxs)(Results, Object.assign({ ref: resultsRef }, { children: [!(search === null || search === void 0 ? void 0 : search.length) && !subMenuItem && spotlightType === 'search' && showTips && ((0, jsx_runtime_1.jsx)(Tip, { dangerouslySetInnerHTML: { __html: (_a = decodeHTML(activeTip)) !== null && _a !== void 0 ? _a : '' } })), indexedResults.map((category) => ((0, jsx_runtime_1.jsx)(section_1.Section, { title: category.title, results: category.results, showIcons: resultsHaveIcons, selectedIndex: selectedIndex, 
                                    // eslint-disable-next-line react/jsx-handler-names
                                    onResultSoftSelect: setSelectedIndex, 
                                    // eslint-disable-next-line react/jsx-handler-names
                                    onResultSelect: selectResult, action: () => onSectionAction(category.type), actionText: sectionActionText(category.type), 
                                    // eslint-disable-next-line react/jsx-handler-names
                                    onRemove: category.type === 'history' ? removeHistory : undefined }, category.title)))] })))] })] })) }))), spotlightWrapper);
}
exports.SpotlightComponent = SpotlightComponent;
const Container = styled_components_1.default.div `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99996;
    transform: translate3d(0, 0, 99996px);
`;
const Background = styled_components_1.default.div `
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99997;
    background-color: rgba(0, 0, 0, 0.7);
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
`;
const Content = styled_components_1.default.div `
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
const Results = styled_components_1.default.div `
    ${(p) => p.theme.flex.col()}
    height: auto;
    overflow-y: auto;
    max-height: 400px;
    padding: 8px;

    @media(max-height: 600px) {
        max-height: 100%;
    }
`;
const Tip = styled_components_1.default.p `
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
