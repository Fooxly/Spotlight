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
const line_1 = require("../../icons/line");
let timeout = null;
function Toast() {
    const [message, setMessage] = (0, react_1.useState)(null);
    const [show, setShow] = (0, react_1.useState)(false);
    const handleNewToastMessage = (ev) => {
        if (timeout)
            clearTimeout(timeout);
        setShow(true);
        setMessage(ev.detail);
        timeout = setTimeout(() => {
            setShow(false);
        }, 3000);
    };
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(utils_1.TOAST_EVENT_KEY, handleNewToastMessage, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.TOAST_EVENT_KEY, handleNewToastMessage, false);
    }, []);
    const toastWrapper = (0, react_1.useMemo)(() => {
        let wrapper = null;
        if (typeof window !== 'undefined') {
            wrapper = document.querySelector('#spotlight-toast');
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.id = 'spotlight-toast';
                document.body.append(wrapper);
            }
        }
        return wrapper;
    }, []);
    const Icon = (0, react_1.useMemo)(() => {
        if (!message)
            return null;
        if (message.type === 'info')
            return (0, jsx_runtime_1.jsx)(line_1.InfoIcon, { size: 28, color: 'blue' });
        if (message.type === 'warning')
            return (0, jsx_runtime_1.jsx)(line_1.WarningCircleIcon, { size: 28, color: 'orange' });
        if (message.type === 'error')
            return (0, jsx_runtime_1.jsx)(line_1.WarningCircleIcon, { size: 28, color: 'red' });
        return null;
    }, [message]);
    if (!toastWrapper)
        return null;
    return react_dom_1.default.createPortal(!message ? null : ((0, jsx_runtime_1.jsx)(Container, Object.assign({ className: 'spotlight-toast-message' }, { children: (0, jsx_runtime_1.jsxs)(Pill, Object.assign({ "$enabled": show }, { children: [Icon, (0, jsx_runtime_1.jsx)(Text, { children: message.message })] })) }))), toastWrapper);
}
exports.Toast = Toast;
const Container = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ fullWidth: false, align: 'center', justify: 'center' })}
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
    ${(p) => p.theme.flex.row({ fullWidth: false, align: 'center', justify: 'center' })}
    padding: 10px 30px;
    padding-left: 0;
    max-width: 50%;
    border-radius: 30px;
    box-sizing: border-box;
    background-color: ${(p) => p.theme.color.gray10};
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    opacity: ${(p) => p.$enabled ? 1 : 0};
    border: 2px solid ${(p) => p.theme.color.gray8};
    animation: ${(p) => p.$enabled ? p.theme.animation.slideFromBottom : p.theme.animation.fadeOut} 0.2s ease-in-out;

    > svg {
        margin-right: 8px;
        margin-left: 12px;
        min-width: 28px;
        min-height: 28px;
    }
`;
const Text = styled_components_1.default.p `
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    margin: 0;
    padding: 0;
`;
