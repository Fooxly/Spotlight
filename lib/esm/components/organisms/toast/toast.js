import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { TOAST_EVENT_KEY } from '../../../utils';
import { InfoIcon, WarningCircleIcon } from '../../../icons/line';
let timeout = null;
export function Toast() {
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const handleNewToastMessage = (ev) => {
        if (timeout)
            clearTimeout(timeout);
        setShow(true);
        setMessage(ev.detail);
        timeout = setTimeout(() => {
            setShow(false);
        }, 3000);
    };
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(TOAST_EVENT_KEY, handleNewToastMessage, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(TOAST_EVENT_KEY, handleNewToastMessage, false);
    }, []);
    const Icon = useMemo(() => {
        if (!message)
            return null;
        if (message.type === 'info')
            return _jsx(InfoIcon, { size: 28, color: 'blue' });
        if (message.type === 'warning')
            return _jsx(WarningCircleIcon, { size: 28, color: 'orange' });
        if (message.type === 'error')
            return _jsx(WarningCircleIcon, { size: 28, color: 'red' });
        return null;
    }, [message]);
    if (!message)
        return null;
    return (_jsx("div", Object.assign({ className: 'spotlight-toast' }, { children: _jsxs("div", Object.assign({ className: `spotlight-toast-pill spotlight-pill-${show ? 'enabled' : 'disabled'}` }, { children: [Icon, _jsx("p", Object.assign({ className: 'spotlight-toast-text' }, { children: message.message }))] })) })));
}
