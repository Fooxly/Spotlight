"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const loading_1 = require("./loading");
const line_1 = require("@/icons/line");
// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}
function SearchInput({ hasResults, placeholder, value, loading, fref, onChange }) {
    const handleChange = (e) => {
        // Only update the text when the value is not the same anymore -> important for the hotkeys
        if (e.target.value.length !== value.length) {
            onChange(e.target.value);
        }
    };
    const handleClear = () => onChange('');
    return ((0, jsx_runtime_1.jsxs)(SearchBar, { "$hasResults": hasResults, children: [(0, jsx_runtime_1.jsx)(Input, { autoFocus: true, ref: fref, placeholder: placeholder ?? 'Search or jump to...', value: value, onChange: handleChange }), (0, jsx_runtime_1.jsx)(SearchIconWrapper, { children: loading ? ((0, jsx_runtime_1.jsx)(loading_1.Loading, { size: 22, color: 'blue', thickness: 3 })) : ((0, jsx_runtime_1.jsx)(line_1.SearchIcon, { size: 24, color: 'gray4' })) }), value?.length > 0 && ((0, jsx_runtime_1.jsx)(CloseButton, { onClick: handleClear, children: (0, jsx_runtime_1.jsx)(line_1.TimesIcon, { size: 8, color: 'gray10' }) }))] }));
}
exports.SearchInput = SearchInput;
const SearchBar = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ align: 'center' })}
    position: relative;
    background-color: ${(p) => p.theme.color.gray10};

    ${(p) => p.$hasResults && `
        border-bottom: 1px solid ${p.theme.color.gray8};
    `}
`;
const Input = styled_components_1.default.input `
    ${(p) => p.theme.text.System.regular(18, 'gray1')}
    background-color: ${(p) => p.theme.color.gray10};
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
