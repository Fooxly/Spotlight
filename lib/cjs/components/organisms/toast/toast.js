"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_1 = require("../../../utils");
const line_1 = require("../../../icons/line");
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
    if (!message)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-toast' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `spotlight-toast-pill spotlight-pill-${show ? 'enabled' : 'disabled'}` }, { children: [Icon, (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'spotlight-toast-text' }, { children: message.message }))] })) })));
}
exports.Toast = Toast;
