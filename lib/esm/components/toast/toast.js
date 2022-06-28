import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { TOAST_EVENT_KEY } from '../../utils';
import { InfoIcon, WarningCircleIcon } from '../../icons/line';
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
    const toastWrapper = useMemo(() => {
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
    if (!toastWrapper)
        return null;
    return ReactDOM.createPortal(!message ? null : (_jsx(Container, Object.assign({ className: 'spotlight-toast-message' }, { children: _jsxs(Pill, Object.assign({ "$enabled": show }, { children: [Icon, _jsx(Text, { children: message.message })] })) }))), toastWrapper);
}
const Container = styled.div `
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
const Pill = styled.div `
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
const Text = styled.p `
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    margin: 0;
    padding: 0;
`;
