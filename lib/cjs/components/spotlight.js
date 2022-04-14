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
const execute_item_1 = require("@/utils/execute-item");
// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}
function SpotlightComponent() {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(-1);
    const [search, setSearch] = (0, react_1.useState)('');
    const inputRef = (0, react_1.createRef)();
    const HOTKEY_OPTIONS = (0, react_1.useMemo)(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);
    const indexedResults = (0, react_1.useMemo)(() => {
        const all = [...utils_1.PAGES, ...utils_1.COMMANDS];
        return (0, utils_1.filterResults)(search, all);
    }, [search, utils_1.COMMANDS, utils_1.PAGES]);
    const hasIcons = (0, react_1.useMemo)(() => indexedResults.filter((item) => !!(0, utils_1.getCommandIcon)(item.options?.icon)).length > 0, [indexedResults]);
    const pages = (0, react_1.useMemo)(() => indexedResults.filter((item) => item.type === 'jump-to'), [indexedResults]);
    const commands = (0, react_1.useMemo)(() => indexedResults.filter((item) => item.type === 'command'), [indexedResults]);
    (0, react_1.useEffect)(() => {
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
        setSelectedIndex(-1);
        setSearch(e.target.value);
    };
    // All the hotkeys
    (0, react_hotkeys_hook_1.useHotkeys)('cmd+shift+k, ctrl+shift_k', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    });
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
            document.getElementById(`command-${indexedResults[newIndex].id}`)?.scrollIntoView({
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
            const newIndex = Math.min(indexedResults.length - 1, selectedIndex + 1);
            if (newIndex < 0)
                return -1;
            document.getElementById(`command-${indexedResults[newIndex].id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: newIndex === (indexedResults.length - 1) ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS, [indexedResults, selectedIndex]);
    (0, react_hotkeys_hook_1.useHotkeys)('enter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('aaa', selectedIndex);
        if (selectedIndex < 0)
            return;
        (0, execute_item_1.executeItem)(indexedResults[selectedIndex]);
        hideSpotlight();
    }, HOTKEY_OPTIONS);
    const handleClearSearch = () => setSearch('');
    // TODO: add section with "Top result" which shows the most likely result
    return react_dom_1.default.createPortal(!visible ? null : ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)(Background, { onClick: hideSpotlight }), (0, jsx_runtime_1.jsxs)(Content, { children: [(0, jsx_runtime_1.jsxs)(SearchBar, { "$hasResults": !!indexedResults?.length, children: [(0, jsx_runtime_1.jsx)(SearchInput, { autoFocus: true, ref: inputRef, placeholder: 'Search or jump to...', value: search, onChange: handleInputChange }), (0, jsx_runtime_1.jsx)(line_1.SearchIcon, { size: 24, color: 'gray4' }), search?.length > 0 && ((0, jsx_runtime_1.jsx)(CloseButton, { onClick: handleClearSearch, children: (0, jsx_runtime_1.jsx)(line_1.TimesIcon, { size: 8, color: 'gray10' }) }))] }), !!indexedResults.length && ((0, jsx_runtime_1.jsxs)(Results, { children: [!!pages.length && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ResultSection, { children: (0, jsx_runtime_1.jsx)(ResultSectionTitle, { children: "Pages" }) }), pages.map((item) => {
                                        const index = indexedResults.findIndex(i => i.id === item.id);
                                        return ((0, jsx_runtime_1.jsx)(result_1.Result, { index: index, item: item, hasIcons: hasIcons, selected: selectedIndex === index, onSoftSelect: setSelectedIndex, onComplete: hideSpotlight }, item.id));
                                    })] })), !!commands.length && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ResultSection, { children: (0, jsx_runtime_1.jsx)(ResultSectionTitle, { children: "Commands" }) }), commands.map((item) => {
                                        const index = indexedResults.findIndex(i => i.id === item.id);
                                        return ((0, jsx_runtime_1.jsx)(result_1.Result, { index: index, item: item, hasIcons: hasIcons, selected: selectedIndex === index, onSoftSelect: setSelectedIndex, onComplete: hideSpotlight }, item.id));
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
    animation: ${(p) => p.theme.animation.fadeInWithPulse} 0.4s ease-in-out;
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

    > svg {
        position: absolute;
        left: 15px;
        margin-bottom: 2px;
    }
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
    padding: 7px 5px;
`;
const ResultSectionTitle = styled_components_1.default.p `
    ${(p) => p.theme.text.System.semibold(14, 'gray4')}
`;
