import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { TOAT_EVENT_KEY } from '@/utils';

let toastWrapper = document.querySelector<HTMLDivElement>('#spotlight-toast');
if (!toastWrapper) {
    toastWrapper = document.createElement('div');
    toastWrapper.id = 'spotlight-toast';
    document.body.append(toastWrapper);
}

let timeout: NodeJS.Timeout | null = null;

export function Toast (): JSX.Element | null {
    const [message, setMessage] = useState<string | null>();
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(TOAT_EVENT_KEY, handleNewToastMessage as any, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(TOAT_EVENT_KEY, handleNewToastMessage as any, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!message) return;
        if (!show) {
            setTimeout(() => {
                setMessage(null);
            }, 300);
        }
    }, [message, show]);

    const handleNewToastMessage = (ev: CustomEvent<{ value: string }>) => {
        if (timeout) clearTimeout(timeout);
        setShow(true);
        setMessage(ev.detail.value);
        timeout = setTimeout(() => {
            setShow(false);
        }, 3000);
    };

    return ReactDOM.createPortal(!message ? null : (
        <Container>
            <Pill $enabled={show}>
                <Text>{message}</Text>
            </Pill>
        </Container>
    ), toastWrapper!);
}

const Container = styled.div`
    ${(p) => p.theme.flex.row({ align: 'center', justify: 'center' })}
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 99999;
    transform: translate3d(0, 0, 99999px);
    pointer-events: none;
`;

const Pill = styled.div<{ $enabled: boolean }>`
    padding: 10px 30px;
    border-radius: 30px;
    background-color: ${(p) => p.theme.color.gray10};
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    opacity: ${(p) => p.$enabled ? 1 : 0};
    border: 2px solid ${(p) => p.theme.color.gray8};
    animation: ${(p) => p.$enabled ? p.theme.animation.slideFromBottom : p.theme.animation.fadeOut} 0.2s ease-in-out;
`;

const Text = styled.p`
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    margin: 0;
    padding: 0;
    text-align: center;
`;
