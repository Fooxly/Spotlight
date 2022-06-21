import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { TimesIcon } from '../../icons/line';
export function Error({ message, onDismiss }) {
    return (_jsxs(Container, { children: [_jsx(Message, { children: message }), _jsx(Button, Object.assign({ onClick: onDismiss }, { children: _jsx(TimesIcon, { size: 15, color: 'red' }) }))] }));
}
const Container = styled.div `
    ${(p) => p.theme.flex.row({ justify: 'space-between', align: 'center', fullWidth: true })}
    background-color: ${(p) => p.theme.color.red}60;
    padding: 15px;
    box-sizing: border-box;
`;
const Message = styled.p `
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    margin: 0;
    padding: 0;
    flex: 1;
    word-wrap: break-word;
`;
const Button = styled.button `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border: 0;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin-left: 15px;
`;
