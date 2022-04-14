import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
export function Error({ message }) {
    return (_jsx(Container, { children: _jsx(Message, { children: message }) }));
}
const Container = styled.div `
    background-color: ${(p) => p.theme.color.red};
    padding: 15px;
`;
const Message = styled.p `
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
`;
