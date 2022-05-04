"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const line_1 = require("@/icons/line");
function Error({ message, onDismiss }) {
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)(Message, { children: message }), (0, jsx_runtime_1.jsx)(Button, Object.assign({ onClick: onDismiss }, { children: (0, jsx_runtime_1.jsx)(line_1.TimesIcon, { size: 15, color: 'red' }) }))] }));
}
exports.Error = Error;
const Container = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ justify: 'space-between', align: 'center' })}
    background-color: ${(p) => p.theme.color.red}60;
    padding: 15px;
`;
const Message = styled_components_1.default.p `
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    margin: 0;
    padding: 0;
    flex: 1;
    word-wrap: break-word;
`;
const Button = styled_components_1.default.button `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border: 0;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin-left: 15px;
`;
