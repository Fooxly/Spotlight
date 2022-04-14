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
function SpotlightComponent() {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const [reloadVersion, setReloadVersion] = (0, react_1.useState)(-1);
    const [subMenuItem, setSubMenuItem] = (0, react_1.useState)();
    const [search, setSearch] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const inputRef = (0, react_1.createRef)();
    const HOTKEY_OPTIONS = (0, react_1.useMemo)(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);
    // Get the results which should be indexed and rendered
    const indexedResults = (0, react_1.useMemo)(() => {
        if (subMenuItem?.options?.options) {
            return (0, utils_1.filterResults)(search, {
                title: subMenuItem.title,
                items: subMenuItem?.options?.options.map((item) => ({
                    title: item,
                    type: 'command',
                    parentCommand: subMenuItem,
                })),
            });
        }
        return (0, utils_1.filterResults)(search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, reloadVersion, search, subMenuItem]);
    const resultCount = (0, react_1.useMemo)(() => indexedResults.reduce((count, cat) => cat.results.length + count, 0), [indexedResults]);
    // When the spotlight is closed, reset all the values
    (0, react_1.useEffect)(() => {
        setSearch('');
        setError('');
        setSelectedIndex(0);
        setSubMenuItem(null);
    }, [visible]);
    (0, react_1.useEffect)(() => setSelectedIndex(0), [search, subMenuItem]);
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
                setLoading(false);
                console.log(error);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                setError(utils_1.ERRORS[error.message] || utils_1.ERRORS.UNKNOWN);
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
                (0, utils_1.updateHistory)(result.item);
                setSubMenuItem(cmd);
                return;
            }
            (0, utils_1.updateHistory)(result.item);
            executeCommand(cmd);
        }
        else {
            (0, utils_1.updateHistory)(result.item);
            (0, utils_1.executeItem)(result.item);
        }
    };
    const removeHistory = () => {
        (0, utils_1.clearHistory)();
        setReloadVersion(Date.now());
    };
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
    (0, react_hotkeys_hook_1.useHotkeys)('down', (e) => {
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
    (0, react_hotkeys_hook_1.useHotkeys)('enter', (e) => {
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
    (0, react_hotkeys_hook_1.useHotkeys)('backspace', (e) => {
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
    return react_dom_1.default.createPortal(!visible ? null : ((0, jsx_runtime_1.jsxs)(Container, { id: 'fooxly-spotlight', children: [(0, jsx_runtime_1.jsx)(Background, { onClick: hideSpotlight }), (0, jsx_runtime_1.jsxs)(Content, { children: [(0, jsx_runtime_1.jsx)(search_input_1.SearchInput, { hasResults: !!indexedResults?.length, placeholder: subMenuItem ? 'Choose an option...' : 'Search or jump to...', value: search, loading: loading, fref: inputRef, 
                        // eslint-disable-next-line react/jsx-handler-names
                        onChange: setSearch }), !!error && ((0, jsx_runtime_1.jsx)(error_1.Error, { message: error, onDismiss: () => setError('') })), indexedResults.length > 0 && indexedResults[0].results.length > 0 && ((0, jsx_runtime_1.jsx)(Results, { children: indexedResults.map((category) => ((0, jsx_runtime_1.jsx)(section_1.Section, { title: category.title, results: category.results, showIcons: resultsHaveIcons, selectedIndex: selectedIndex, 
                            // eslint-disable-next-line react/jsx-handler-names
                            onResultSoftSelect: setSelectedIndex, 
                            // eslint-disable-next-line react/jsx-handler-names
                            onResultSelect: selectResult, 
                            // eslint-disable-next-line react/jsx-handler-names
                            onRemove: category.type === 'history' ? removeHistory : undefined }, category.title))) }))] })] })), wrapper);
}
exports.SpotlightComponent = SpotlightComponent;
const Container = styled_components_1.default.div `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99997;
    transform: translate3d(0, 0, 99999px);
`;
const Background = styled_components_1.default.div `
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99998;
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
    z-index: 99999;

    @media(max-width: 900px) {
        width: 70%;
    }

    @media(max-width: 700px) {
        width: 85%;
    }
`;
const Results = styled_components_1.default.div `
    ${(p) => p.theme.flex.col()};
    height: auto;
    overflow-y: auto;
    max-height: 400px;
    padding: 8px;

    @media(max-height: 600px) {
        max-height: 100%;
    }
`;
