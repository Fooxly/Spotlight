import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { TOAST_EVENT_KEY } from '../../utils';
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
export function Toast() {
    const [message, setMessage] = useState();
    const [show, setShow] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(TOAST_EVENT_KEY, handleNewToastMessage, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(TOAST_EVENT_KEY, handleNewToastMessage, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
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
    return ReactDOM.createPortal(!message ? null : (_jsx(Container, { children: _jsx(Pill, Object.assign({ "$enabled": show }, { children: _jsx(Text, { children: message }) })) })), toastWrapper);
}
const Container = styled.div `
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
const Pill = styled.div `
    padding: 10px 30px;
    border-radius: 30px;
    background-color: ${(p) => p.theme.color.gray10};
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    opacity: ${(p) => p.$enabled ? 1 : 0};
    border: 2px solid ${(p) => p.theme.color.gray8};
    animation: ${(p) => p.$enabled ? p.theme.animation.slideFromBottom : p.theme.animation.fadeOut} 0.2s ease-in-out;
`;
const Text = styled.p `
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    margin: 0;
    padding: 0;
    text-align: center;
`;
