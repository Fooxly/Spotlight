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
const line_1 = require("@/icons/line");
const result_1 = require("./result");
const utils_1 = require("@/utils");
const loading_1 = require("./loading");
// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}
function SpotlightComponent({ showRecentlyUsed }) {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(-1);
    const [reloadVersion, setReloadVersion] = (0, react_1.useState)(-1);
    const [subMenuItem, setSubMenuItem] = (0, react_1.useState)();
    const [search, setSearch] = (0, react_1.useState)('');
    const inputRef = (0, react_1.createRef)();
    const HOTKEY_OPTIONS = (0, react_1.useMemo)(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);
    // Receive a list of commands which were used before
    const history = (0, react_1.useMemo)(() => (0, utils_1.getHistory)().slice(0, showRecentlyUsed ?? 0), [visible, subMenuItem, reloadVersion]);
    // Get the results which should be indexed and rendered
    const indexedResults = (0, react_1.useMemo)(() => {
        if (subMenuItem) {
            return (0, utils_1.filterResults)(search, subMenuItem.options?.options?.map((item) => ({
                title: item,
                type: 'command',
                parentCommand: subMenuItem,
            })), !!subMenuItem);
        }
        return (0, utils_1.filterResults)(search, [...utils_1.PAGES, ...utils_1.COMMANDS], !!subMenuItem);
    }, [reloadVersion, visible, search, utils_1.COMMANDS, utils_1.PAGES, subMenuItem]);
    // When a sub menu is opened, reset the search and selected index
    (0, react_1.useEffect)(() => {
        setSearch('');
        setSelectedIndex(-1);
    }, [subMenuItem]);
    // When the spotlight is closed, reset all the values
    (0, react_1.useEffect)(() => {
        if (visible)
            return;
        setSearch('');
        setSelectedIndex(-1);
        setSubMenuItem(undefined);
    }, [visible]);
    const isSearching = (0, react_1.useMemo)(() => search.length > 0, [search]);
    const hasIcons = (0, react_1.useMemo)(() => indexedResults.filter((item) => !!(0, utils_1.getCommandIcon)(item.options?.icon)).length > 0, [indexedResults]);
    const pages = (0, react_1.useMemo)(() => indexedResults.filter((item) => item.type === 'jump-to' && ((!isSearching && !history.includes(item)) || isSearching)), [indexedResults]);
    const commands = (0, react_1.useMemo)(() => indexedResults.filter((item) => item.type === 'command' && ((!isSearching && !history.includes(item)) || isSearching)), [indexedResults]);
    // When changing the index, the input should always receive focus to continue typing
    (0, react_1.useEffect)(() => {
        if (!inputRef.current)
            return;
        else
            inputRef.current.focus();
    }, [selectedIndex, inputRef]);
    const toggleVisible = () => setVisible((last) => !last);
    const hideSpotlight = () => setVisible(false);
    const handleInputChange = (e) => {
        // Only update the text when the value is not the same anymore -> important for the hotkeys
        if (e.target.value.length !== search.length) {
            setSelectedIndex(-1);
            setSearch(e.target.value);
        }
    };
    // Clears the search
    const handleClearSearch = () => setSearch('');
    // Clears the history and rerenders the results
    const handleClearHistory = () => {
        (0, utils_1.clearHistory)();
        setReloadVersion(new Date().getTime());
    };
    // Ability to execute a command with a possible given option
    const executeCommand = (command, result) => {
        const res = (0, utils_1.executeItem)(command, result);
        if (res instanceof Promise) {
            setLoading(true);
            res.finally(() => {
                setLoading(false);
                hideSpotlight();
            });
        }
        else {
            hideSpotlight();
        }
    };
    const handleItemSelect = (item) => {
        if (item.type === 'command') {
            const cmd = item;
            if (cmd.parentCommand)
                return executeCommand(cmd.parentCommand, cmd.title);
            if (cmd.options?.options?.length) {
                (0, utils_1.updateHistory)(item, showRecentlyUsed);
                setSubMenuItem(cmd);
                return;
            }
            (0, utils_1.updateHistory)(item, showRecentlyUsed);
            executeCommand(cmd);
        }
        else {
            (0, utils_1.updateHistory)(item, showRecentlyUsed);
            (0, utils_1.executeItem)(item);
        }
    };
    // All the hotkeys
    (0, react_hotkeys_hook_1.useHotkeys)('cmd+shift+k, ctrl+shift+k', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible]);
    (0, react_hotkeys_hook_1.useHotkeys)('esc', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideSpotlight();
    }, HOTKEY_OPTIONS);
    (0, react_hotkeys_hook_1.useHotkeys)('up', (e) => {
        e.preventDefault();
        e.stopPropagation();
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
    (0, react_hotkeys_hook_1.useHotkeys)('down', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((last) => {
            const newIndex = Math.min(indexedResults.length - 1, last + 1);
            if (newIndex < 0)
                return -1;
            document.getElementById(`command-${newIndex}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex === (indexedResults.length - 1) ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    (0, react_hotkeys_hook_1.useHotkeys)('enter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectedIndex < 0)
            return;
        handleItemSelect(indexedResults[selectedIndex]);
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    (0, react_hotkeys_hook_1.useHotkeys)('backspace', (e) => {
        if (search.length !== 0)
            return;
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex(-1);
        setSubMenuItem(undefined);
        setSearch('');
    }, {
        ...HOTKEY_OPTIONS,
        enabled: visible && !!subMenuItem,
    }, [search, indexedResults, selectedIndex]);
    return react_dom_1.default.createPortal(!visible ? null : ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)(Background, { onClick: hideSpotlight }), (0, jsx_runtime_1.jsxs)(Content, { children: [(0, jsx_runtime_1.jsxs)(SearchBar, { "$hasResults": !!indexedResults?.length, children: [(0, jsx_runtime_1.jsx)(SearchInput, { autoFocus: true, ref: inputRef, placeholder: subMenuItem ? subMenuItem.title : 'Search or jump to...', value: search, onChange: handleInputChange }), (0, jsx_runtime_1.jsx)(SearchIconWrapper, { children: loading ? ((0, jsx_runtime_1.jsx)(loading_1.Loading, { size: 22, color: 'blue', thickness: 3 })) : ((0, jsx_runtime_1.jsx)(line_1.SearchIcon, { size: 24, color: 'gray4' })) }), search?.length > 0 && ((0, jsx_runtime_1.jsx)(CloseButton, { onClick: handleClearSearch, children: (0, jsx_runtime_1.jsx)(line_1.TimesIcon, { size: 8, color: 'gray10' }) }))] }), !!indexedResults.length && ((0, jsx_runtime_1.jsxs)(Results, { children: [!!history.length && !isSearching && !subMenuItem && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(ResultSection, { children: [(0, jsx_runtime_1.jsx)(ResultSectionTitle, { children: "Recently used" }), (0, jsx_runtime_1.jsx)(CloseButton, { onClick: handleClearHistory, children: (0, jsx_runtime_1.jsx)(line_1.TimesIcon, { size: 7, color: 'gray10' }) })] }), history.map((item) => {
                                        const index = indexedResults.findIndex(i => i.title === item.title);
                                        return ((0, jsx_runtime_1.jsx)(result_1.Result, { index: index, item: item, hasIcons: hasIcons, selected: selectedIndex === index, onSoftSelect: setSelectedIndex, onSelect: handleItemSelect }, item.title));
                                    })] })), !!pages.length && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ResultSection, { children: (0, jsx_runtime_1.jsx)(ResultSectionTitle, { children: "Pages" }) }), pages.map((item) => {
                                        const index = indexedResults.findIndex(i => i.title === item.title);
                                        return ((0, jsx_runtime_1.jsx)(result_1.Result, { index: index, item: item, hasIcons: hasIcons, selected: selectedIndex === index, onSoftSelect: setSelectedIndex, onSelect: handleItemSelect }, item.title));
                                    })] })), !!commands.length && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!subMenuItem && ((0, jsx_runtime_1.jsx)(ResultSection, { children: (0, jsx_runtime_1.jsx)(ResultSectionTitle, { children: "Commands" }) })), commands.map((item) => {
                                        const index = indexedResults.findIndex(i => i.title === item.title);
                                        return ((0, jsx_runtime_1.jsx)(result_1.Result, { index: index, item: item, hasIcons: hasIcons, selected: selectedIndex === index, onSoftSelect: setSelectedIndex, onSelect: handleItemSelect }, item.title));
                                    })] }))] }))] })] })), wrapper);
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
const SearchBar = styled_components_1.default.div `
    position: relative;
    ${(p) => p.theme.flex.row({ align: 'center' })}

    ${(p) => p.$hasResults && `
        border-bottom: 1px solid ${p.theme.color.gray8};
    `}
`;
const SearchInput = styled_components_1.default.input `
    ${(p) => p.theme.text.System.regular(18, 'gray1')}
    flex: 1;
    height: 55px;
    padding: 0 50px;

    ::placeholder {
        color: ${(p) => p.theme.color.gray6} !important;
    }
`;
const SearchIconWrapper = styled_components_1.default.div `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: absolute;
    left: 15px;
    margin-bottom: 2px;
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
const CloseButton = styled_components_1.default.button `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border-radius: 100px;
    background-color: ${(p) => p.theme.color.gray2};
    position: absolute;
    right: 15px;
    width: 22px;
    height: 22px;
    cursor: pointer;
`;
const ResultSection = styled_components_1.default.div `
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
const ResultSectionTitle = styled_components_1.default.p `
    ${(p) => p.theme.text.System.semibold(14, 'gray4')}
`;
