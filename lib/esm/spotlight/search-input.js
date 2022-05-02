import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { Loading } from './loading';
import { SearchIcon, TimesIcon } from '../icons/line';
// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}
export function SearchInput({ hasResults, placeholder, value, loading, fref, onChange }) {
    const handleChange = (e) => {
        // Only update the text when the value is not the same anymore -> important for the hotkeys
        if (e.target.value.length !== value.length) {
            onChange(e.target.value);
        }
    };
    const handleClear = () => onChange('');
    return (_jsxs(SearchBar, Object.assign({ "$hasResults": hasResults }, { children: [_jsx(Input, { autoFocus: true, ref: fref, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : 'Search or jump to...', value: value, onChange: handleChange }), _jsx(SearchIconWrapper, { children: loading ? (_jsx(Loading, { size: 22, color: 'blue', thickness: 3 })) : (_jsx(SearchIcon, { size: 24, color: 'gray4' })) }), (value === null || value === void 0 ? void 0 : value.length) > 0 && (_jsx(CloseButton, Object.assign({ onClick: handleClear }, { children: _jsx(TimesIcon, { size: 8, color: 'gray10' }) })))] })));
}
const SearchBar = styled.div `
    ${(p) => p.theme.flex.row({ align: 'center' })}
    position: relative;
    background-color: ${(p) => p.theme.color.gray10};

    ${(p) => p.$hasResults && `
        border-bottom: 1px solid ${p.theme.color.gray8};
    `}
`;
const Input = styled.input `
    ${(p) => p.theme.text.System.regular(18, 'gray1')}
    background-color: ${(p) => p.theme.color.gray10};
    flex: 1;
    height: 55px;
    padding: 0 50px;

    ::placeholder {
        color: ${(p) => p.theme.color.gray6} !important;
    }
`;
const SearchIconWrapper = styled.div `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: absolute;
    left: 15px;
    margin-bottom: 2px;
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
