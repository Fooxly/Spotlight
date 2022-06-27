"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = __importDefault(require("styled-components"));
const utils_1 = require("../../utils");
// create the spotlight toast wrapper if this is not already created
let toastWrapper = null;
if (typeof window !== 'undefined') {
    toastWrapper = document.querySelector('#spotlight-toast');
    if (!toastWrapper) {
        toastWrapper = document.createElement('div');
        toastWrapper.id = 'spotlight-toast';
        document.body.append(toastWrapper);
    }
}
let timeout = null;
function Toast() {
    const [message, setMessage] = (0, react_1.useState)(null);
    const [show, setShow] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(utils_1.TOAST_EVENT_KEY, handleNewToastMessage, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.TOAST_EVENT_KEY, handleNewToastMessage, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, react_1.useEffect)(() => {
        if (!message)
            return;
        if (!show) {
            setTimeout(() => {
                setMessage(null);
            }, 300);
        }
    }, [message, show]);
    const handleNewToastMessage = (ev) => {
        if (timeout)
            clearTimeout(timeout);
        setShow(true);
        setMessage(ev.detail.value);
        timeout = setTimeout(() => {
            setShow(false);
        }, 3000);
    };
    return react_dom_1.default.createPortal(!message ? null : ((0, jsx_runtime_1.jsx)(Container, { children: (0, jsx_runtime_1.jsx)(Pill, Object.assign({ "$enabled": show }, { children: (0, jsx_runtime_1.jsx)(Text, { children: message }) })) })), toastWrapper);
}
exports.Toast = Toast;
const Container = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ align: 'center', justify: 'center' })}
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 99999;
    transform: translate3d(0, 0, 99999px);
    pointer-events: none;
    box-sizing: border-box;
`;
const Pill = styled_components_1.default.div `
    padding: 10px 30px;
    border-radius: 30px;
    background-color: ${(p) => p.theme.color.gray10};
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    opacity: ${(p) => p.$enabled ? 1 : 0};
    border: 2px solid ${(p) => p.theme.color.gray8};
    animation: ${(p) => p.$enabled ? p.theme.animation.slideFromBottom : p.theme.animation.fadeOut} 0.2s ease-in-out;
`;
const Text = styled_components_1.default.p `
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    margin: 0;
    padding: 0;
    text-align: center;
`;
